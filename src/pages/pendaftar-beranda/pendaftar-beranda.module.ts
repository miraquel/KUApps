import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendaftarBerandaPage } from './pendaftar-beranda';

@NgModule({
  declarations: [
    PendaftarBerandaPage,
  ],
  imports: [
    IonicPageModule.forChild(PendaftarBerandaPage),
  ],
  exports: [
    PendaftarBerandaPage
  ]
})
export class PendaftarBerandaPageModule {}
