import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PernikahanDetailsPage } from './pernikahan-details';

@NgModule({
  declarations: [
    PernikahanDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PernikahanDetailsPage),
  ],
  exports: [
    PernikahanDetailsPage
  ]
})
export class PernikahanDetailsPageModule {}
