import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  id;
  namaCatinPria;
  namaCatinWanita;
  namaPenghulu;
  idPenghulu;
  desa;
  tanggalNikah;

  idInvoice;
  noSlip;
  statusInvoice;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pernikahanService: PernikahanServiceProvider, public viewCtrl: ViewController) {
    this.id = navParams.get('id');
    moment.locale('id');
  }

  loadPenghuluDetails(id) {
    this.navCtrl.push('PenghuluDetailsPage', {
      id
    });
  }

  loadInvoiceAdd() {
    this.navCtrl.push('InvoiceAddPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PernikahanDetailsPage');

    this.pernikahanService.ShowNikahById(this.id).subscribe(
      data => {
        this.namaCatinPria = data.catinpria.nama;
        this.namaCatinWanita = data.catinwanita.nama;
        this.desa = data.village.name;
        this.tanggalNikah = moment(data.tanggal).format("DD MMMM YYYY");
        this.namaPenghulu = data.penghulu.nama;
        this.idPenghulu = data.penghulu.id;

        if (data.invoiceId !== null) {
          this.idInvoice = data.invoiceId;
          this.noSlip = data.invoice.no_slip;
          this.statusInvoice = this.noSlip;
        }
        else {
          this.statusInvoice = "Invoice Belum Diinput";
        }

        console.log(this.namaCatinPria);
        console.log(this.namaCatinWanita);
        console.log(this.idInvoice);
      },
      err => {
        console.log(err);
      }
    );
  }

}
