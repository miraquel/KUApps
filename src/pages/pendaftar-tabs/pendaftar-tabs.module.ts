import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendaftarTabsPage } from './pendaftar-tabs';
import { PendaftarBerandaPage } from '../pendaftar-beranda/pendaftar-beranda';

@NgModule({
  declarations: [
    PendaftarTabsPage
  ],
  imports: [
    IonicPageModule.forChild(PendaftarTabsPage),
  ]
})
export class PendaftarTabsPageModule {}
