import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPenghuluPage } from './add-penghulu';

@NgModule({
  declarations: [
    AddPenghuluPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPenghuluPage),
  ],
  exports: [
    AddPenghuluPage
  ]
})
export class AddPenghuluPageModule {}
