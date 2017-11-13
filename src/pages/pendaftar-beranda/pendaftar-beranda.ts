import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Storage } from "@ionic/storage";
import { BaseUrl } from "../../providers/base-url";

/**
 * Generated class for the PendaftarBerandaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pendaftar-beranda',
  templateUrl: 'pendaftar-beranda.html',
})
export class PendaftarBerandaPage {
  urlMaster: string = BaseUrl.BASE_API_URL;
  loading: Loading;
  refreshComplete;
  display: boolean;
  checkCallbackParams;
  nikah;
  _imgKtpCatinPria;
  _imgKtpCatinWanita;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private pernikahanService: PernikahanServiceProvider,
    private authService: AuthServiceProvider,
    private storage: Storage
  ) {
    this.storage.ready().then(
      success => {
        this.storage.get('user').then(
          user => {
            console.log(user);
            this.authService.accessToken = user;
            this.authService.pendaftarFindById(user)
            .subscribe(
              success => {
                this.loadNikah();
                this.authService.user = success;
              }
            );
          }
        );
      }
    );
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.loadNikah();
    if (this.refreshComplete = true) {
        refresher.complete();
    }
  }

  loadNikah() {
    this.showLoading();
    this.pernikahanService.ShowNikahByPendaftar().subscribe(
      data => {
        this.loading.dismiss();
        this.nikah = data;
        this._imgKtpCatinPria = this.urlMaster+'/'+this.nikah.catinpria.url_ktp;
        this._imgKtpCatinWanita = this.urlMaster+'/'+this.nikah.catinwanita.url_ktp;
        console.log(this.nikah);
        console.log(this.nikah.catinpria.nama);
        this.display = true;
        this.refreshComplete = true;
      },
      error => {
        this.loading.dismiss();
        this.display = false;
        this.refreshComplete = true;
      }
    )
  }

  myCallbackFunction = (_params) => {
    this.loadNikah();
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  // editCatinPria(catinPria) {
  //   this.navCtrl.push("CatinPriaEditPage", {
  //     callback: this.myCallbackFunction,
  //     catinPria
  //   });
  // }
  //
  // editCatinWanita(catinWanita) {
  //   this.navCtrl.push("CatinPriaEditPage", {
  //     callback: this.myCallbackFunction,
  //     catinWanita
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendaftarBerandaPage');
  }

  ShowPendaftaran(){
    this.navCtrl.push("PendaftaranPage", {
      callback: this.myCallbackFunction
    });
  }

  ShowInvoiceDetails(invoice) {
    this.navCtrl.push("InvoiceDetailsPage", {
      invoice
    });
  }

  dismiss(){
    let data = {
      'message': 'Modal Dismissed'
    }
    this.viewCtrl.dismiss();
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Mohon Tunggu...',
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

}
