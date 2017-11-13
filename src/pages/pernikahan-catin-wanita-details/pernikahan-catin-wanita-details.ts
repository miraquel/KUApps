import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PernikahanCatinWanitaDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pernikahan-catin-wanita-details',
  templateUrl: 'pernikahan-catin-wanita-details.html',
})
export class PernikahanCatinWanitaDetailsPage {
  catinwanita: Array<any>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.catinwanita = navParams.get("catinwanita");
    console.log(this.catinwanita);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PernikahanCatinWanitaDetailsPage');
  }

}
