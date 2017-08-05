import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";

/**
 * Generated class for the KecamatanListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kecamatan-list',
  templateUrl: 'kecamatan-list.html',
  providers: [LokasiServiceProvider]
})
export class KecamatanListPage {
  id;
  kecamatans: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lokasiService: LokasiServiceProvider) {
    this.id = navParams.get('id');
    console.log(this.id);
  }

  ShowDesa(id){
    this.navCtrl.push('DesaListPage', {
      id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KecamatanListPage');

    this.lokasiService.ShowKecamatan(this.id).subscribe(
      data => {
        this.kecamatans = data;
        console.log(data);
        console.log(this.kecamatans);
      },
      err => {
        console.log(err);
      }
    );

  }

}
