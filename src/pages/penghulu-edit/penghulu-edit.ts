import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { PernikahanServiceProvider }  from "../../providers/pernikahan-service/pernikahan-service";
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the PenghuluEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-penghulu-edit',
  templateUrl: 'penghulu-edit.html',
})
export class PenghuluEditPage {
  token;
  penghulu: {
    nama: '',
    tanggal_lahir: '',
    no_ktp: '',
    alamat: '',
    agama: '',
    pendidikan: '',
    nomor_handphone: '',
    id: '',
    districts: {
      id: '',
      regencies: {
        id: '',
        provinces: {
          id: ''
        }
      }
    }
  };

  provinsiSelect;
  kabupatenSelect;
  kecamatanSelect;

  provinsis: Array<any>;
  kabupatens: Array<any>;
  kecamatans: Array<any>;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private lokasiService: LokasiServiceProvider,
    private pernikahanService: PernikahanServiceProvider
  ) {
    this.penghulu = navParams.get("penghulu");
    this.kecamatanSelect = this.penghulu.districts.id;
    this.kabupatenSelect = this.penghulu.districts.regencies.id;
    this.provinsiSelect = this.penghulu.districts.regencies.provinces.id;
    this.LoadProvinsi();
    this.LoadKabupaten();
    this.LoadKecamatan();
    this.storage.get("token").then(
      token => {
        this.token = token;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenghuluEditPage');
    console.log(this.penghulu);
    console.log(this.kecamatanSelect);
    console.log(this.kabupatenSelect);
    console.log(this.provinsiSelect);
  }

  updatePenghulu() {
    this.showLoading();
    this.penghulu.districts.id = this.kecamatanSelect;
    this.pernikahanService.editPenghulu(this.penghulu, this.token).subscribe(
      success => {
        this.loading.dismiss();
        this.showToast("Penghulu sukses di edit");
        this.dismiss();
      },
      error => {
        this.loading.dismiss();
        this.showToast("koneksi error")
      }
    )
  }

  LoadProvinsi(){
    this.lokasiService.ShowProvinsi().subscribe(
      data => {
        this.provinsis = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKabupaten(){
    this.lokasiService.ShowKabupaten(this.provinsiSelect).subscribe(
      data => {
        this.kabupatens = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKecamatan(){
    this.lokasiService.ShowKecamatan(this.kabupatenSelect).subscribe(
      data => {
        this.kecamatans = data;
      },
      err => {
        console.log(err);
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
