import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

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
        this.namaCatinPria = data.catinPria.nama;
        this.namaCatinWanita = data.catinWanita.nama;
        this.desa = data.villages.name;
        this.tanggalNikah = data.tanggal;
        this.namaPenghulu = data.penghulu.nama;
        this.idPenghulu = data.penghulu.id;

        if (!data.invoice.id) {
            this.idInvoice = data.invoice.id;
            this.noSlip = data.invoice.no_slip;
        }

        console.log(this.namaCatinPria);
        console.log(this.namaCatinWanita);
      },
      err => {
        console.log(err);
      }
    );
    if (this.idInvoice == 0) {
      this.statusInvoice = "Invoice Belum Diinput";
    }
    else {
      this.statusInvoice = this.noSlip;
    }
  }

}
