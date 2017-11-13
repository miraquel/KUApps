import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendaftarProfilePage } from './pendaftar-profile';

@NgModule({
  declarations: [
    PendaftarProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PendaftarProfilePage),
  ],
  exports: [
    PendaftarProfilePage
  ]
})
export class PendaftarProfilePageModule {}
