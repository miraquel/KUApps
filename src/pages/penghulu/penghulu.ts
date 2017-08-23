import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

/**
 * Generated class for the PenghuluPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-penghulu',
  templateUrl: 'penghulu.html',
  providers: [PernikahanServiceProvider]
})
export class PenghuluPage {
  penghulus: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private pernikahanService: PernikahanServiceProvider) {
  }

  LoadPenghulu(){
    this.pernikahanService.ShowPenghulu().subscribe(
      data => {
        this.penghulus = data;
        console.log(data);
        console.log(this.penghulus);
      },
      err => {
        console.log(err);
      }
    );
  }

  ShowDetails(id){
    this.navCtrl.push('PenghuluDetailsPage', {
      id
    });
    console.log(id);
  }

  doRefresh(refresher){
    this.LoadPenghulu();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  AddPenghuluModal() {
    let modal = this.modalCtrl.create('AddPenghuluPage');
    modal.present();
    modal.onDidDismiss(data => {
      console.log('Modal Dismiss Value :'+data);
      this.LoadPenghulu();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenghuluPage');

    this.LoadPenghulu();
  }

}
