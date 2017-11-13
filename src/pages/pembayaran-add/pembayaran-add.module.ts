import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PembayaranAddPage } from './pembayaran-add';

@NgModule({
  declarations: [
    PembayaranAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PembayaranAddPage),
  ],
  exports: [
    PembayaranAddPage
  ]
})
export class PembayaranAddPageModule {}
