import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatinWanitaEditPage } from './catin-wanita-edit';

@NgModule({
  declarations: [
    CatinWanitaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CatinWanitaEditPage),
  ],
  exports: [
    CatinWanitaEditPage
  ]
})
export class CatinWanitaEditPageModule {}
