import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PernikahanStatusEditPage } from './pernikahan-status-edit';

@NgModule({
  declarations: [
    PernikahanStatusEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PernikahanStatusEditPage),
  ],
  exports: [
    PernikahanStatusEditPage
  ]
})
export class PernikahanStatusEditPageModule {}
