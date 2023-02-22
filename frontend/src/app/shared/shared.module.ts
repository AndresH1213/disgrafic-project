import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Prime NG
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, MenuModule, ButtonModule],
  exports: [NavbarComponent, FooterComponent],
})
export class SharedModule {}
