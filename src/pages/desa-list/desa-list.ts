import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";

/**
 * Generated class for the DesaListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-desa-list',
  templateUrl: 'desa-list.html',
})
export class DesaListPage {
  id;
  desas: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lokasiService: LokasiServiceProvider) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DesaListPage');

    this.lokasiService.ShowDesaByID(this.id).subscribe(
      data => {
        this.desas = data;
        console.log(data);
        console.log(this.desas)
      },
      err => {
        console.log(err);
      }
    );

  }

}
