import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PendaftarTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-pendaftar-tabs',
  templateUrl: 'pendaftar-tabs.html'
})
@IonicPage()
export class PendaftarTabsPage {

  pendaftarBerandaRoot = 'PendaftarBerandaPage'
  pendaftarProfileRoot = 'PendaftarProfilePage'


  constructor(public navCtrl: NavController) {}

}
