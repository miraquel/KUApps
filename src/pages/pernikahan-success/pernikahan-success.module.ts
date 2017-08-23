import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PernikahanSuccessPage } from './pernikahan-success';

@NgModule({
  declarations: [
    PernikahanSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(PernikahanSuccessPage),
  ],
  exports: [
    PernikahanSuccessPage
  ]
})
export class PernikahanSuccessPageModule {}
