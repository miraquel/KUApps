import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatinPriaEditPage } from './catin-pria-edit';

@NgModule({
  declarations: [
    CatinPriaEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CatinPriaEditPage),
  ],
  exports: [
    CatinPriaEditPage
  ]
})
export class CatinPriaEditPageModule {}
