import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenghuluPage } from './penghulu';

@NgModule({
  declarations: [
    PenghuluPage,
  ],
  imports: [
    IonicPageModule.forChild(PenghuluPage),
  ],
  exports: [
    PenghuluPage
  ]
})
export class PenghuluPageModule {}
