import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";
import * as moment from "moment";

/**
 * Generated class for the PenghuluDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-penghulu-details',
  templateUrl: 'penghulu-details.html',
})
export class PenghuluDetailsPage {
  _tanggal_lahir;
  penghulu: {
    nama: '',
    tanggal_lahir: '',
    no_ktp: '',
    alamat: '',
    agama: '',
    pendidikan: '',
    nomor_handphone: '',
    id: '',
    districts: {
      id: '',
      regencies: {
        id: '',
        provinces: {
          id: ''
        }
      }
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private pernikahanService: PernikahanServiceProvider, private lokasiService: LokasiServiceProvider) {
    this.penghulu = navParams.get('penghulu');
    this._tanggal_lahir = moment(this.penghulu.tanggal_lahir).format("DD MMMM YYYY");
    this.penghulu.tanggal_lahir = this._tanggal_lahir;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenghuluDetailsPage');
  }

}
