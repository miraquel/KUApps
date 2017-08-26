import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenghuluEditPage } from './penghulu-edit';

@NgModule({
  declarations: [
    PenghuluEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PenghuluEditPage),
  ],
  exports: [
    PenghuluEditPage
  ]
})
export class PenghuluEditPageModule {}
