import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";
import { Storage } from "@ionic/storage";

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
  token;
  loading: Loading;
  penghulus: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private pernikahanService: PernikahanServiceProvider
  ) {
    this.storage.get("token").then(
      token => {
        this.token = token;
      }
    )
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

  ShowDetails(penghulu: Array<any>){
    this.navCtrl.push('PenghuluDetailsPage', {
      penghulu
    });
    console.log(penghulu);
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

  hapusPenghulu(id) {
    this.showLoading();
    this.pernikahanService.hapusPenghulu(id, this.token).subscribe(
      success => {
        this.loading.dismiss();
        this.showToast("data berhasil dihapus");
        this.LoadPenghulu();
      },
      error => {
        this.loading.dismiss();
        this.showToast("koneksi error, data gagal dihapus");
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenghuluPage');

    this.LoadPenghulu();
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

  editPenghulu(penghulu: Array<any>) {
    let modal = this.modalCtrl.create('PenghuluEditPage', { penghulu });
    modal.present();
    modal.onDidDismiss(data => {
      console.log('Modal Dismiss Value :'+data);
      this.LoadPenghulu();
    });
  }

  hapusPenghuluKonfirmasi(id){
    let alert = this.alertCtrl.create({
      title: 'Hapus Data',
      message: 'Anda yakin ingin Menghapus Data Penghulu?',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            this.hapusPenghulu(id);
          }
        },
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            this.showToast("data tidak dihapus");
          }
        }
      ]
    });
    alert.present();
  }

}
