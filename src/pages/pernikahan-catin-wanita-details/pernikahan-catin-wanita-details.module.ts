import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PernikahanCatinWanitaDetailsPage } from './pernikahan-catin-wanita-details';

@NgModule({
  declarations: [
    PernikahanCatinWanitaDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PernikahanCatinWanitaDetailsPage),
  ],
  exports: [
    PernikahanCatinWanitaDetailsPage
  ]
})
export class PernikahanCatinWanitaDetailsPageModule {}
