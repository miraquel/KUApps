import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

/**
 * Generated class for the AddPenghuluPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-penghulu',
  templateUrl: 'add-penghulu.html',
})
export class AddPenghuluPage {
  provinsiSelect;
  kabupatenSelect;
  kecamatanSelect;
  nama;
  tanggalLahir;
  noKTP;
  alamat;
  agama;
  pendidikan;
  nomorHP;

  KabupatenDisableSelector: boolean = true;
  KecamatanDisableSelector: boolean = true;

  provinsis: Array<any>;
  kabupatens: Array<any>;
  kecamatans: Array<any>;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private lokasiService: LokasiServiceProvider,
    private pernikahanService: PernikahanServiceProvider) {
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

  showError(text){
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  Simpan(){
    this.showLoading();
    this.pernikahanService.SimpanPenghulu(
      this.kecamatanSelect,
      this.nama,
      this.tanggalLahir,
      this.noKTP,
      this.alamat,
      this.agama,
      this.pendidikan,
      this.nomorHP
    ).then(
      success => {
        if (success) {
          this.showToast('Data Berhasil Ditambahkan');
          this.loading.dismiss();
          this.dismiss();
          console.log(success);
        }
        else {
          this.showToast('Simpan Data Gagal, Cek Jaringan / Isian Data');
          this.loading.dismiss();
        }
      },
      error => {
        this.showToast(error);
      }
    );
  }

  dismiss(){
    let data = {
      'message': 'Modal Dismissed'
    }
    this.viewCtrl.dismiss();
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
    this.KabupatenDisableSelector = false;
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
    this.KecamatanDisableSelector = false;
    this.lokasiService.ShowKecamatan(this.kabupatenSelect).subscribe(
      data => {
        this.kecamatans = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPenghuluPage');

    this.LoadProvinsi();
  }

}
