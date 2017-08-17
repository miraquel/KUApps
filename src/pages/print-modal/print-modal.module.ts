import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrintModalPage } from './print-modal';

@NgModule({
  declarations: [
    PrintModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PrintModalPage),
  ],
  exports: [
    PrintModalPage
  ]
})
export class PrintModalPageModule {}
