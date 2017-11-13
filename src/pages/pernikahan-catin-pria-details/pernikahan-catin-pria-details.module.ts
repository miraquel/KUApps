import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PernikahanCatinPriaDetailsPage } from './pernikahan-catin-pria-details';

@NgModule({
  declarations: [
    PernikahanCatinPriaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PernikahanCatinPriaDetailsPage),
  ],
  exports: [
    PernikahanCatinPriaDetailsPage
  ]
})
export class PernikahanCatinPriaDetailsPageModule {}
