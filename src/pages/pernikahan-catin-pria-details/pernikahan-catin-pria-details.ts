import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PernikahanCatinPriaDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pernikahan-catin-pria-details',
  templateUrl: 'pernikahan-catin-pria-details.html',
})
export class PernikahanCatinPriaDetailsPage {
  catinpria: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.catinpria = navParams.get("catinpria");
    console.log(this.catinpria);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PernikahanCatinPriaDetailsPage');
  }

}
