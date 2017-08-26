import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, Loading, LoadingController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

/**
 * Generated class for the PernikahanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pernikahan',
  templateUrl: 'pernikahan.html',
})
export class PernikahanPage {
  loading: Loading;
  checkCallbackParams;
  nikahs: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private pernikahanService: PernikahanServiceProvider) {
  }

  PrintModal() {
    let modal = this.modalCtrl.create('PrintModalPage');
    modal.present();
  }

  LoadNikah() {
    this.pernikahanService.ShowNikah().subscribe(
      data => {
        this.nikahs = data;
        console.log(this.nikahs);
      },
      err => {
        console.log(err);
      }
    );
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.LoadNikah();
      resolve();
    });
  }

  ShowPendaftaran(){
    this.navCtrl.push("PendaftaranPage", {
      callback: this.myCallbackFunction
    });
  }

  LoadNikahDetails(id) {
    this.navCtrl.push('PernikahanDetailsPage', {
      id
    });
  }

  hapusNikah(id) {
    var catinPriaId;
    var catinWanitaId;
    this.pernikahanService.ShowNikahById(id).subscribe(
      data => {
        catinPriaId = data.catinpriaId;
        catinWanitaId = data.catinwanitaId;
        console.log(catinPriaId);
        console.log(catinWanitaId);
      },
      err => {
        console.log(err);
      }
    );

    this.pernikahanService.hapusNikah(id).subscribe(
      data => {
        console.log(data);
        this.pernikahanService.hapusCatinPria(catinPriaId).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );

        this.pernikahanService.hapusCatinWanita(catinWanitaId).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
        this.loading.dismiss();
        this.showToast("Data Berhasil Dihapus");
        this.LoadNikah();
      },
      err => {
        console.log(err);
        this.loading.dismiss();
        this.showToast("Data Gagal Dihapus, Cek Jaringan / Hubungi Admin");
      }
    );
  }

  hapusNikahAlert(id) {
    let alert = this.alertCtrl.create({
      title: 'Hapus Data Pernikahan',
      message: 'Anda yakin ingin menghapus data pernikahan?',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            this.showLoading();
            this.hapusNikah(id);
          }
        },
        {
          text: 'Tidak',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Menghapus Data...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PernikahanPage');

    this.LoadNikah();
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
