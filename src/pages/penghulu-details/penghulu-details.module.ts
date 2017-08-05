import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenghuluDetailsPage } from './penghulu-details';

@NgModule({
  declarations: [
    PenghuluDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PenghuluDetailsPage),
  ],
  exports: [
    PenghuluDetailsPage
  ]
})
export class PenghuluDetailsPageModule {}
