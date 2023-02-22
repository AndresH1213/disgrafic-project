import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductOptions } from '../../interfaces/Product';
import { Client } from '../../interfaces/Client';
import { ClientsService } from '../../services/clients.service';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { PhotoService } from '../../services/photo.service';
import { concatMap, filter, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @ViewChild('clientForm') clientForm!: NgForm;
  @ViewChild('productForm') productForm!: NgForm;

  public displayModalProduct = false;
  public displayModalClient = false;

  public displayOptionsContainer = true;
  public displayProductsContainer = false;
  public displayClientsContainer = false;

  public showError = false;
  public showSpinnerProduct = false;
  public showSpinnerClient = false;
  public isEdit = false;
  public image?: any;

  public clients: Client[] = [];
  public products: Product[] = [];

  public selectedProduct?: Product;
  public selectedClient?: Client;

  productFormObj: Product;
  clientFormObj: Client;

  public labelOptions = [
    { label: 'Mercancia', value: 'mercancia' },
    { label: 'Material', value: 'material' },
  ];
  public productOptions = [
    { name: 'Productos', value: ProductOptions.Merch },
    { name: 'Materiales', value: ProductOptions.Material },
  ];

  public productOptionSelected = ProductOptions.Merch;

  constructor(
    private productService: ProductsService,
    private clientsService: ClientsService,
    private photoService: PhotoService
  ) {
    this.productFormObj = this.getProductInitForm();
    this.clientFormObj = this.getClientInitForm();
  }

  ngOnInit(): void {}

  getProductInitForm(): Product {
    return {
      name: '',
      label: 'material',
      price: 0,
      product_type: '',
      subtype: '',
      image_url: '',
    };
  }

  getClientInitForm(): Client {
    return {
      name: '',
      phone: '',
      email: '',
      address: '',
    };
  }

  showOptions() {
    this.displayClientsContainer = false;
    this.displayProductsContainer = false;
    this.displayOptionsContainer = true;
  }

  showProducts() {
    this.displayClientsContainer = false;
    this.displayOptionsContainer = false;
    this.displayProductsContainer = true;

    if (this.products.length === 0) {
      this.showSpinnerProduct = true;
      this.loadProducts(ProductOptions.Merch);
    }
  }

  showClients() {
    this.displayProductsContainer = false;
    this.displayOptionsContainer = false;
    this.displayClientsContainer = true;

    if (this.clients.length === 0) {
      this.showSpinnerClient = true;
      this.loadClients();
    }
  }

  getById<T>(id: string, entity: 'Product' | 'Client'): T {
    let item: any;
    if (entity === 'Product') {
      item = this.products.filter((product) => product.product_id === id)[0];
    } else {
      item = this.clients.filter((client) => client.client_id === id)[0];
    }
    return item;
  }

  editProduct(id: string) {
    this.selectedProduct = this.getById<Product>(id, 'Product');
    this.openProductModal(true);
    this.productFormObj = { ...this.selectedProduct };
  }

  editClient(id: string) {
    this.selectedClient = this.clients.filter(
      (client) => client.client_id === id
    )[0];
    this.openClientModal(true);
    this.clientFormObj = { ...this.selectedClient };
  }

  openProductModal(isEdit?: boolean) {
    this.isEdit = isEdit || false;
    this.displayModalProduct = true;
  }

  closeProductModal() {
    this.displayModalProduct = false;
    this.image = undefined;
    this.selectedProduct = undefined;
    this.isEdit = false;
    this.productFormObj = this.getProductInitForm();
  }

  openClientModal(isEdit?: boolean) {
    this.isEdit = isEdit || false;
    this.displayModalClient = true;
  }

  closeClientModal() {
    this.displayModalClient = false;
    this.selectedClient = undefined;
    this.isEdit = false;
    this.clientFormObj = this.getClientInitForm();
  }

  imageUpload() {
    if (!this.image) return;

    const uploadFileSource = this.photoService
      .getPresignedUrls(this.image)
      .pipe(
        filter((resp: any) => resp.status === 'ok'),
        concatMap((resp: any) => {
          const fileUploadUrl = resp.response;

          return this.photoService.uploadfileAWSS3(
            fileUploadUrl,
            this.image.type,
            this.image
          );
        })
      );
    return uploadFileSource;
  }

  createProduct() {
    if (!this.productForm.valid) {
      this.showError = true;
      setTimeout(() => (this.showError = false), 2500);
      return;
    }
    const messageSuccess = 'Has creado un nuevo producto: ';
    const form = this.productForm.value;
    try {
      const image_source = this.imageUpload();
      if (image_source) {
        image_source
          .pipe(
            filter((resp: any) => resp.status === 200),
            concatMap((resp: any) => {
              console.log({ resp });
              const image_url = resp.url.split('?')[0];
              const body = {
                ...form,
                image_url,
              };
              console.log({ body });
              return this.productService.createProduct(body);
            }),
            catchError((err) => {
              console.log('No se pudo crear el producto');
              return of('Producto no creado');
            })
          )
          .subscribe((resp: any) => {
            Swal.fire('', messageSuccess + resp.name, 'success');
            this.closeProductModal();
            this.loadProducts();
          });
      } else {
        this.productService.createProduct(form).subscribe((resp: any) => {
          Swal.fire('', messageSuccess + resp.name, 'success');
          this.closeProductModal();
          this.loadProducts();
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Ocurrio un problema', 'Problema al subir la imagen', 'error');
    }
  }

  updateProduct() {
    const id = this.selectedProduct?.product_id;
    const prevImage = this.selectedProduct?.image_url;
    if (!id) return;
    const attrs = this.productForm.value;
    attrs.price = Number(attrs.price);
    const messageSuccess = 'Se ha actualizado el producto';
    try {
      const image_source = this.imageUpload();
      if (image_source) {
        image_source
          .pipe(
            filter((resp: any) => resp.status === 200),
            concatMap((resp: any) => {
              const image_url = resp.url.split('?')[0];
              const body = {
                ...attrs,
                image_url,
              };
              return this.productService.updateProduct(id, body);
            }),
            tap((resp: any) => {
              const imageName = prevImage
                ? prevImage.split('/products/')[1]
                : '';
              if (imageName) {
                this.photoService.deleteFileAWSS3(imageName).subscribe();
              }
            })
          )
          .subscribe((resp: any) => {
            Swal.fire('', messageSuccess + resp.name, 'success');
            this.closeProductModal();
            this.loadProducts();
          });
      } else {
        this.productService.updateProduct(id, attrs).subscribe((resp: any) => {
          this.closeProductModal();
          this.productForm.reset();
          Swal.fire('', messageSuccess + resp.name, 'success');
          this.loadProducts();
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        'Ocurrio un problema',
        'Problema al actualizar el producto',
        'error'
      );
    }
  }

  deleteProduct(id: string) {
    if (confirm('En serio quieres eliminar este producto?')) {
      this.productService
        .deleteProduct(id)
        .pipe(
          concatMap(() => {
            const product = this.getById<Product>(id, 'Product');
            const imageName = product.image_url
              ? product.image_url.split('/products/')[1]
              : '';
            return this.photoService.deleteFileAWSS3(imageName);
          })
        )
        .subscribe((res: any) => {
          Swal.fire('', 'Producto eliminado!', 'success');
          this.loadProducts();
        });
    }
  }

  changeImage(target: any) {
    if (!target.files) return;
    const file = (target.files as FileList)[0];
    this.image = file;
  }

  createClient() {
    if (!this.clientForm.valid) {
      this.showError = true;
      setTimeout(() => (this.showError = false), 2500);
      return;
    }

    this.clientsService
      .createClient(this.clientForm.value)
      .subscribe((resp) => {
        this.loadClients();
        this.closeClientModal();
        Swal.fire('', 'Has creado un nuevo cliente', 'success');
      });
  }

  updateClient() {
    const id = this.selectedClient?.client_id!;
    const attrs = this.clientForm.value;
    this.clientsService.updateClient(id, attrs).subscribe((resp) => {
      this.closeClientModal();
      this.clientForm.reset();
      this.loadClients();
    });
  }

  setProductOption(event: any) {
    const selectedOption = event.value.value;
    this.loadProducts(selectedOption);
    this.productOptionSelected = selectedOption;
  }

  deleteClient(id: string) {
    if (confirm('En serio quieres eliminar este cliente?')) {
      this.clientsService.deleteClient(id).subscribe((res: any) => {
        Swal.fire('', 'Client eliminado!', 'success');
        this.loadClients();
      });
    }
  }

  loadProducts(queryParam: ProductOptions = this.productOptionSelected) {
    this.productService.getProducts(queryParam).subscribe((resp: any) => {
      this.products = resp.products;
      this.showSpinnerProduct = false;
      this.productOptionSelected = queryParam;
    });
  }

  loadClients() {
    this.clientsService.getClients().subscribe((resp: any) => {
      this.clients = resp.clients;
      this.showSpinnerClient = false;
    });
  }

  getProduct(id: string) {
    this.productService.getProduct(id).subscribe((product: any) => {
      this.selectedProduct = product;
    });
  }

  getClient(id: string) {
    this.clientsService.getClient(id).subscribe((client: any) => {
      this.selectedClient = client;
    });
  }
}
