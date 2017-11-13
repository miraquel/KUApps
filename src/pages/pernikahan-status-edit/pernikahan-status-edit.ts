import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

/**
 * Generated class for the PernikahanStatusEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pernikahan-status-edit',
  templateUrl: 'pernikahan-status-edit.html',
})
export class PernikahanStatusEditPage {
  loading: Loading;
  nikahId;
  pelengkap : {
    no_akta: '',
    no_porporasi: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private pernikahanService: PernikahanServiceProvider
  ) {
    this.nikahId = navParams.get("nikahId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PernikahanStatusEditPage');
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Menyimpan Data...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed Toast');
    });

    toast.present();
  }

  showError(text){
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  dismiss(pelengkap){
    let data = {
      pelengkap
    }
    this.viewCtrl.dismiss(data);
  }

  simpan(pelengkap) {
    this.showLoading();
    this.pernikahanService.updateNikahStatus(pelengkap, this.nikahId).subscribe(
      success => {
        this.loading.dismiss();
        this.showToast("simpan data berhasil");
        this.dismiss(this.pelengkap);
      },
      error => {
        this.loading.dismiss();
        this.showToast("simpan data gagal")
      }
    )
  }

}
