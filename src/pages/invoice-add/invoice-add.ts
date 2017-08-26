import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, Loading, LoadingController } from 'ionic-angular';
import { CurrencyPipe } from "@angular/common";
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

/**
 * Generated class for the InvoiceAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-invoice-add',
  templateUrl: 'invoice-add.html',
})
export class InvoiceAddPage {
  loading: Loading;
  nikahId;
  invoice = {
    noSlip: '',
    bank: '',
    tanggal: '',
    nominal: '',
    status: 'Sukses'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private currencyPipe: CurrencyPipe,
    private pernikahanService: PernikahanServiceProvider,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    this.nikahId = navParams.get("nikahId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceAddPage');
  }

  simpan() {
    this.showLoading();
    this.pernikahanService.SimpanInvoice(this.invoice).subscribe(
      data => {
        this.pernikahanService.updateNikahInvoice(data.id, this.nikahId).subscribe(
          data => {
            this.showToast("Data Berhasil Disimpan");
            this.dismiss();
          },
          error => {
            this.showToast("koneksi Error");
          }
        );
      },
      error => {
        this.showToast("Koneksi Error");
      }
    );
  }

  dismiss(){
    let data = {
      'message': 'Modal Dismissed'
    }
    this.viewCtrl.dismiss();
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

}
