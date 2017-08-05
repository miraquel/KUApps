import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FileMasterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-file-master',
  templateUrl: 'file-master.html',
})
export class FileMasterPage {
  year: string = new Date().getFullYear().toString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FileMasterPage');
  }

  ShowLokasi(){
    this.navCtrl.push('ProvinsiListPage');
  }

  ShowPenghulu(){
    this.navCtrl.push('PenghuluPage');
  }

  ShowAdmin(){
    this.navCtrl.push('AdminPage');
  }

}
