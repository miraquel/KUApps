import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LokasiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lokasi',
  templateUrl: 'lokasi.html',
})
export class LokasiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LokasiPage');
  }

  ShowProvinsiList(){
    this.navCtrl.push('ProvinsiListPage');
  }

  ShowKabupatenList(){
    this.navCtrl.push('KabupatenListPage');
  }

  ShowKecamatanList(){
    this.navCtrl.push('KecamatanListPage');
  }

  ShowDesaList(){
    this.navCtrl.push('DesaListPage');
  }

}
