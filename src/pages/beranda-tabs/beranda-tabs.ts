import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the BerandaTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-beranda-tabs',
  templateUrl: 'beranda-tabs.html'
})
@IonicPage()
export class BerandaTabsPage {

  pernikahanRoot = 'PernikahanPage'
  FileMasterRoot = 'FileMasterPage'
  ProfileRoot = 'ProfilePage'


  constructor(public navCtrl: NavController) {}

}
