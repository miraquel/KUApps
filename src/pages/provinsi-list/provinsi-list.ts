import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LokasiServiceProvider } from '../../providers/lokasi-service/lokasi-service';

/**
 * Generated class for the ProvinsiListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-provinsi-list',
  templateUrl: 'provinsi-list.html',
  providers: [LokasiServiceProvider]
})
export class ProvinsiListPage {
  provinsis: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lokasiService: LokasiServiceProvider) {
  }

  ShowKabupaten(id){
    console.log(id);
    this.navCtrl.push('KabupatenListPage', {
      id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvinsiListPage');

    this.lokasiService.ShowProvinsi().subscribe(
      data => {
        this.provinsis = data;
        console.log(data);
        console.log(this.provinsis);
      },
      err => {
        console.log(err);
      }
    );
  }

}
