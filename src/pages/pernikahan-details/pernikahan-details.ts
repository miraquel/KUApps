import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";
import * as moment from "moment";

/**
 * Generated class for the PernikahanDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pernikahan-details',
  templateUrl: 'pernikahan-details.html',
})
export class PernikahanDetailsPage {
  loading: Loading;
  checkCallbackParams;
  nikah: {
    id: '',
    catinpria: '',
    catinwanita: '',
    invoice: {
      tanggal
    },
    no_akta: '',
    no_porporasi: '',
    penghulu: '',
    status: '',
    tanggal,
    invoiceId,
    village: ''
  };
  penghulu: Array<any>;

  idInvoice;
  noSlip;
  statusInvoice;
  penlengkapExist: Boolean = false;
  penghuluExist: Boolean = false;

  invoiceView: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pernikahanService: PernikahanServiceProvider,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    this.nikah = navParams.get('nikah');
    moment.locale('id');
    // this.nikah.tanggal = moment(this.nikah.tanggal).format("DD MMMM YYYY");
    console.log(this.nikah);
    if (this.nikah.invoice !== null) {
      this.invoiceView = true;
      console.log(this.invoiceView);
    }
    if (this.nikah.no_akta === null || this.nikah.no_porporasi === null) {
      this.penlengkapExist = false;
    }
    else {
      this.penlengkapExist = true;
    }

    if (this.nikah.penghulu === undefined) {
      this.penghuluExist = false;
    }
    else {
      this.penghuluExist = true;
    }
    console.log(this.penghuluExist);
    console.log(this.nikah.penghulu);
  }

  loadPenghuluDetails(penghulu: Array<any>) {
    console.log(penghulu)
    this.navCtrl.push('PenghuluDetailsPage', {
      penghulu
    });
  }

  myCallbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      this.nikah.invoice = _params;
      resolve();
    });
  }

  loadInvoiceAdd(nikahId) {
    this.navCtrl.push("InvoiceAddPage", {
      callback: this.myCallbackFunction, nikahId
    });
  }

  loadInvoiceEdit(invoice, nikahId) {
    console.log(invoice);
    this.navCtrl.push('InvoiceEditPage', {
      invoice, nikahId
    })
  }

  loadCatinPriaDetails(catinpria: Array<any>) {
    this.navCtrl.push('PernikahanCatinPriaDetailsPage', {
      catinpria
    });
  }

  loadCatinWanitaDetails(catinwanita: Array<any>) {
    this.navCtrl.push('PernikahanCatinWanitaDetailsPage', {
      catinwanita
    });
  }

  AddPelengkapModal(nikahId) {
    let modal = this.modalCtrl.create('PernikahanStatusEditPage', {
      nikahId
    });
    modal.present();
    modal.onDidDismiss(data => {
      console.log('Modal Dismiss Value :'+data);
      this.nikah.no_akta = data.pelengkap.no_akta;
      this.nikah.no_porporasi = data.pelengkap.no_porporasi;
    });
  }

  selesai() {
    this.showLoading();
    let status = {
      status: 'sukses'
    }
    this.pernikahanService.updateNikahStatus(status, this.nikah.id).subscribe(
      success => {
        this.loading.dismiss();
        this.showToast("data berhasil disimpan");
      },
      error => {
        this.loading.dismiss();
        this.showToast("koneksi error");
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PernikahanDetailsPage');
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
      duration: 5000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed Toast');
    });

    toast.present();
  }

}
