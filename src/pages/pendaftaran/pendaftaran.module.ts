import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendaftaranPage } from './pendaftaran';

@NgModule({
  declarations: [
    PendaftaranPage,
  ],
  imports: [
    IonicPageModule.forChild(PendaftaranPage),
  ],
  exports: [
    PendaftaranPage
  ]
})
export class PendaftaranPageModule {}
