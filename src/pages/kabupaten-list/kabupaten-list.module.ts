import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KabupatenListPage } from './kabupaten-list';

@NgModule({
  declarations: [
    KabupatenListPage,
  ],
  imports: [
    IonicPageModule.forChild(KabupatenListPage),
  ],
  exports: [
    KabupatenListPage
  ]
})
export class KabupatenListPageModule {}
