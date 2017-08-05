import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KecamatanListPage } from './kecamatan-list';

@NgModule({
  declarations: [
    KecamatanListPage,
  ],
  imports: [
    IonicPageModule.forChild(KecamatanListPage),
  ],
  exports: [
    KecamatanListPage
  ]
})
export class KecamatanListPageModule {}
