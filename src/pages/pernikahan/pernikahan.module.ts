import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PernikahanPage } from './pernikahan';

@NgModule({
  declarations: [
    PernikahanPage,
  ],
  imports: [
    IonicPageModule.forChild(PernikahanPage),
  ],
  exports: [
    PernikahanPage
  ]
})
export class PernikahanPageModule {}
