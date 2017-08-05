import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProvinsiListPage } from './provinsi-list';

@NgModule({
  declarations: [
    ProvinsiListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProvinsiListPage),
  ],
  exports: [
    ProvinsiListPage
  ]
})
export class ProvinsiListPageModule {}
