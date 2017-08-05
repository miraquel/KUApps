import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileMasterPage } from './file-master';

@NgModule({
  declarations: [
    FileMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(FileMasterPage),
  ],
  exports: [
    FileMasterPage
  ]
})
export class FileMasterPageModule {}
