import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesaListPage } from './desa-list';

@NgModule({
  declarations: [
    DesaListPage,
  ],
  imports: [
    IonicPageModule.forChild(DesaListPage),
  ],
  exports: [
    DesaListPage
  ]
})
export class DesaListPageModule {}
