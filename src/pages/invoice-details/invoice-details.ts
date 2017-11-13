import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InvoiceDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-invoice-details',
  templateUrl: 'invoice-details.html',
})
export class InvoiceDetailsPage {
  invoice;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.invoice = navParams.get("invoice");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceDetailsPage');
  }

  tambahPembayran(invoiceId) {
    this.navCtrl.push("PembayaranAddPage", {
      invoiceId
    })
  }

}
