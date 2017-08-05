import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceAddPage } from './invoice-add';

@NgModule({
  declarations: [
    InvoiceAddPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceAddPage),
  ],
  exports: [
    InvoiceAddPage
  ]
})
export class InvoiceAddPageModule {}
