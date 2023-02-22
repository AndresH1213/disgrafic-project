import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CalculatorComponent } from './calculator/calculator.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { PagesComponent } from './pages.component';
import { ModalCalculadorIntroComponent } from './components/modal-calculador-intro/modal-calculador-intro.component';

import { FormWorkLaborComponent } from './components/form-work-labor/form-work-labor.component';

import { PrimengModule } from './primeng.module';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    PagesComponent,
    CalculatorComponent,
    HomeComponent,
    AuthComponent,
    AdminComponent,
    AboutComponent,
    ProductsComponent,
    ModalCalculadorIntroComponent,
    FormWorkLaborComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
  ],
})
export class PagesModule {}
