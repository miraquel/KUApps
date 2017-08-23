import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CurrencyPipe } from "@angular/common";

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
  invoice = {
    noSlip: '',
    bank: '',
    tanggal: '',
    nominal: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private currencyPipe: CurrencyPipe) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceAddPage');
  }

  convertNominal(val) {
    console.log(val);
    this.invoice.nominal = this.currencyPipe.transform(this.invoice.nominal, 'IDR', true);
  }

}
