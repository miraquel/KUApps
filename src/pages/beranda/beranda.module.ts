import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerandaPage } from './beranda';

@NgModule({
  declarations: [
    BerandaPage,
  ],
  imports: [
    IonicPageModule.forChild(BerandaPage),
  ],
  exports: [
    BerandaPage
  ]
})
export class BerandaPageModule {}
