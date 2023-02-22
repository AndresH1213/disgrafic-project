import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  isAuth: boolean = false;
  constructor(private auth: AuthService) {
    this.isAuth = Boolean(this.auth.token);
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Productos', icon: 'pi pi-th-large', routerLink: '/products' },
      { label: 'Imprenta', icon: 'pi pi-wallet', routerLink: '/imprent' },
      { label: 'Nosotros', icon: 'pi pi-star', routerLink: '/about' },
      this.isAuth
        ? { label: 'Admin', icon: 'pi pi-user-edit', routerLink: '/admin' }
        : {},
    ];
  }

  logOut() {
    this.auth.logOut();
  }
}
