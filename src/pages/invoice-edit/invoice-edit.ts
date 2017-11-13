import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

/**
 * Generated class for the InvoiceEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-invoice-edit',
  templateUrl: 'invoice-edit.html',
})
export class InvoiceEditPage {
  loading: Loading;
  invoice: {
    no_slip,
    bank,
    tanggal,
    nominal,
    status,
    id
  }
  nikahId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private pernikahanService: PernikahanServiceProvider
  ) {
    this.invoice = navParams.get("invoice");
    this.nikahId = navParams.get("nikahId");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceEditPage');
  }

  editInvoice() {
    this.showLoading();
    this.pernikahanService.UpdateInvoice(this.invoice, this.invoice.id).subscribe(
      data => {
        this.showToast("data berhasil dirubah");
        this.dismiss();
      },
      error => {
        this.loading.dismiss();
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
