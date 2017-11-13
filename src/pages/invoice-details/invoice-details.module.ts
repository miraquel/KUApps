import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceDetailsPage } from './invoice-details';

@NgModule({
  declarations: [
    InvoiceDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoiceDetailsPage),
  ],
  exports: [
    InvoiceDetailsPage
  ]
})
export class InvoiceDetailsPageModule {}
