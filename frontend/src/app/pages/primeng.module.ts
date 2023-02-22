import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    CascadeSelectModule,
    DialogModule,
    InputNumberModule,
    CarouselModule,
    ProgressSpinnerModule,
    TableModule,
  ],
  exports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    CascadeSelectModule,
    DialogModule,
    InputNumberModule,
    CarouselModule,
    ProgressSpinnerModule,
    TableModule,
  ],
})
export class PrimengModule {}
