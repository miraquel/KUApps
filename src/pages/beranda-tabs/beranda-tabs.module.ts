import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerandaTabsPage } from './beranda-tabs';

@NgModule({
  declarations: [
    BerandaTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(BerandaTabsPage),
  ]
})
export class BerandaTabsPageModule {}
