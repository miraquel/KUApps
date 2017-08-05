import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LokasiServiceProvider } from '../../providers/lokasi-service/lokasi-service';

/**
 * Generated class for the KabupatenListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kabupaten-list',
  templateUrl: 'kabupaten-list.html',
  providers: [LokasiServiceProvider]
})
export class KabupatenListPage {
  id;
  kabupatens: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lokasiService: LokasiServiceProvider) {
    this.id = navParams.get('id');
  }

  ShowKecamatan(id){
    this.navCtrl.push('KecamatanListPage', {
      id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KabupatenListPage');
    console.log(this.id);

    this.lokasiService.ShowKabupaten(this.id).subscribe(
      data => {
        this.kabupatens = data;
        console.log(data);
        console.log(this.kabupatens);
      },
      err => {
        console.log(err);
      }
    );
  }

}
