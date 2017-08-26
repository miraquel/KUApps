import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";

/**
 * Generated class for the PendaftaranPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pendaftaran',
  templateUrl: 'pendaftaran.html',
})
export class PendaftaranPage {
  callback;
  loading: Loading;
  bool: boolean = false;
  pageReview: boolean = true;
  hideFabButton: boolean = true;

  // Variable Model Calon Pengantin Pria
  provinsiSelectCatinPria;
  kabupatenSelectCatinPria;
  kecamatanSelectCatinPria;
  namaCatinPria;
  tanggalLahirCatinPria;
  agamaCatinPria;
  pekerjaanCatinPria;
  pekerjaanCbCatinPria;
  pekerjaanTbCatinPria;
  alamatCatinPria;
  wali_nikahCatinPria;
  statusCatinPria;

  KabupatenDisableSelectorCatinPria: boolean = true;
  KecamatanDisableSelectorCatinPria: boolean = true;

  hidePekerjaanCatinPria: boolean = false;

  //Variable Model Calon Pengantin Wanita
  provinsiSelectCatinWanita;
  kabupatenSelectCatinWanita;
  kecamatanSelectCatinWanita;
  namaCatinWanita;
  tanggalLahirCatinWanita;
  agamaCatinWanita;
  pekerjaanCatinWanita;
  pekerjaanCbCatinWanita;
  pekerjaanTbCatinWanita;
  alamatCatinWanita;
  wali_nikahCatinWanita;
  statusCatinWanita;
  KabupatenDisableSelectorCatinWanita: boolean = true;
  KecamatanDisableSelectorCatinWanita: boolean = true;

  hidePekerjaanCatinWanita: boolean = false;

  //variable Model Nikah
  catinPriaId;
  CatinWanitaId;
  adminId = 1;
  desaSelectNikah;
  penghuluId;
  tanggalNikah;

  penghulus: Array<any>;

  provinsis: Array<any>;
  desas: Array<any>;

  kabupatensPria: Array<any>;
  kabupatensWanita: Array<any>;

  kecamatansPria: Array<any>;
  kecamatansWanita: Array<any>;

  @ViewChild('signupSlider') signupSlider: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private lokasiService: LokasiServiceProvider,
    private pernikahanService: PernikahanServiceProvider
  ){
    this.callback = this.navParams.get("callback");
  }

  next(){
    this.signupSlider.lockSwipes(false);
    this.signupSlider.slideNext();
    this.signupSlider.lockSwipes(true);
  }

  prev(){
    if (this.pageReview === false) {
        this.pageReview = true;
    }
    this.signupSlider.lockSwipes(false);
    this.signupSlider.slidePrev();
    this.signupSlider.lockSwipes(true);
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

  LoadPenghulu() {
    this.pernikahanService.ShowPenghulu().subscribe(
      data => {
        this.penghulus = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKabupaten(Catin: string){
    let provinsiValue;
    if (Catin == "catinPria"){
      this.KabupatenDisableSelectorCatinPria = false;
      provinsiValue = this.provinsiSelectCatinPria;
    }
    else if (Catin == "catinWanita"){
      this.KabupatenDisableSelectorCatinWanita = false;
      provinsiValue = this.provinsiSelectCatinWanita;
    }
    this.lokasiService.ShowKabupaten(provinsiValue).subscribe(
      data => {
        if (Catin == "catinPria") {
            this.kabupatensPria = data;
        }
        else if (Catin == "catinWanita") {
            this.kabupatensWanita = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKecamatan(Catin: string){
    let kabupatenValue;
    if (Catin == "catinPria"){
      this.KecamatanDisableSelectorCatinPria = false;
      kabupatenValue = this.kabupatenSelectCatinPria;
    }
    else if (Catin == "catinWanita"){
      this.KecamatanDisableSelectorCatinWanita = false;
      kabupatenValue = this.kabupatenSelectCatinWanita;
    }
    this.lokasiService.ShowKecamatan(kabupatenValue).subscribe(
      data => {
        if (Catin == "catinPria") {
            this.kecamatansPria = data;
        }
        else if (Catin == "catinWanita") {
            this.kecamatansWanita = data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadDesas(){
    this.lokasiService.ShowDesaByID(3603160).subscribe(
      data => {
        this.desas = data;
        console.log(this.desas);
      },
      err => {
        console.log(err);
      }
    );
  }

  cancelConfirm(){
    let alert = this.alertCtrl.create({
      title: 'Keluar Pendaftaran',
      message: 'Anda yakin ingin mengakhiri pendaftaran?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            this.bool = false;
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.cancelConfirmMore();
          }
        }
      ]
    });
    alert.present();
  }


  cancelConfirmMore(){
    let alert = this.alertCtrl.create({
      title: 'Peringatan!',
      message: 'Data yang sudah anda isi akan hilang, Anda Yakin?',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            this.bool = true;
            this.dismiss();
          }
        },
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            this.bool = false
          }
        }
      ]
    });
    alert.present();
  }

  pekerjaanCatinPriaLainnyaOnChange(){
    if (this.pekerjaanCbCatinPria !== "Lainnya"){
      this.hidePekerjaanCatinPria = false;
    }
    else {
      this.hidePekerjaanCatinPria = true;
    }
  }

  pekerjaanCatinWanitaLainnyaOnChange(){

    if (this.pekerjaanCbCatinWanita !== "Lainnya"){
      this.hidePekerjaanCatinWanita = false;
    }
    else {
      this.hidePekerjaanCatinWanita = true;
    }
  }

  showToastTop(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed Toast');
    });

    toast.present();
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

  simpan(){
    // this.validasiForm();
    // let statusValidasi = this.validasiForm();
    // console.log(statusValidasi);
    if (this.hidePekerjaanCatinPria == false) {
      this.pekerjaanCatinPria = this.pekerjaanCbCatinPria;
    }
    else {
      this.pekerjaanCatinPria = this.pekerjaanTbCatinPria;
    }

    if (this.hidePekerjaanCatinWanita == false) {
      this.pekerjaanCatinWanita = this.pekerjaanCbCatinWanita;
    }
    else {
      this.pekerjaanCatinWanita = this.pekerjaanTbCatinWanita;
    }
    // console.log("Pria");
    // console.log("District: "+this.kecamatanSelectCatinPria);
    // console.log("Nama: "+this.namaCatinPria);
    // console.log("Tanggal Lahir "+this.tanggalLahirCatinPria);
    // console.log("Agama: "+this.agamaCatinPria);
    // console.log("Pekerjaan: "+this.pekerjaanCatinPria);
    // console.log("Alamat: "+this.alamatCatinPria);
    // console.log("Wali Nikah"+this.wali_nikahCatinPria);
    // console.log("Status: "+this.statusCatinPria);
    //
    // console.log("Wanita");
    // console.log("District: "+this.kecamatanSelectCatinWanita);
    // console.log("Nama: "+this.namaCatinWanita);
    // console.log("Tanggal Lahir: "+this.tanggalLahirCatinWanita);
    // console.log("Agama: "+this.agamaCatinWanita);
    // console.log("Pekerjaan: "+this.pekerjaanCatinWanita);
    // console.log("Alamat: "+this.alamatCatinWanita);
    // console.log("Wali Nikah: "+this.wali_nikahCatinWanita);
    // console.log("Status: "+this.statusCatinWanita);
    console.log(this.pageReview);

    if (this.validasiForm()){
      // Mulai Proses Penyimpanan
      // Check Input Untuk Field Pekerjaan Yang Digunakan

      if (this.pageReview === true) {
        this.pageReview = false;
        this.signupSlider.lockSwipes(false);
        this.signupSlider.slideTo(2);
        this.signupSlider.lockSwipes(true);
      }
      else {
        this.showLoading();
        this.pernikahanService.SimpanCatinPria(
          this.kecamatanSelectCatinPria,
          this.namaCatinPria,
          this.tanggalLahirCatinPria,
          this.agamaCatinPria,
          this.pekerjaanCatinPria,
          this.alamatCatinPria,
          this.wali_nikahCatinPria,
          this.statusCatinPria
        ).then(
          success => {
            if (success) {
                this.showToastTop('Data Calon Pengantin Pria Berhasil Ditambahkan');
                console.log("Pria :"+success);
                this.catinPriaId = success.id;
                console.log(this.catinPriaId);
            }
            else {
              this.loading.dismiss();
              this.showToast('Simpan Data Gagal, Hubungi Admin Untuk Info Lebih Lanjut')
            }
          },
          error => {
            this.loading.dismiss();
            this.showToast('Simpan Data Gagal, Cek Jaringan Koneksi')
          }
        );

        this.pernikahanService.SimpanCatinWanita(
          this.kecamatanSelectCatinWanita,
          this.namaCatinWanita,
          this.tanggalLahirCatinWanita,
          this.agamaCatinWanita,
          this.pekerjaanCatinWanita,
          this.alamatCatinWanita,
          this.wali_nikahCatinWanita,
          this.statusCatinWanita
        ).then(
          success => {
            if (success) {
                this.showToast('Data Calon Pengantin Wanita Berhasil Ditambahkan');
                console.log("Wanita :"+success)
                this.CatinWanitaId = success.id;
                console.log(this.CatinWanitaId);
                this.hideFabButton = false;
                this.loading.dismiss();
                this.next();
            }
            else {
              this.loading.dismiss();
              this.showToast('Simpan Data Gagal, Hubungi Admin Untuk Info Lebih Lanjut')
            }
          },
          error => {
            this.loading.dismiss();
            this.showToast('Simpan Data Gagal, Cek Jaringan Koneksi')
          }
        );
      }
    }
    else {
      this.showToast("Data kurang lengkap, lengkapi semua isian yang tersedia");
    }
  }

  validasiForm(): boolean{
    if (
      this.kecamatanSelectCatinPria == "" || this.kecamatanSelectCatinPria == null ||
      this.namaCatinPria == "" || this.namaCatinPria == null ||
      this.tanggalLahirCatinPria == null ||
      this.agamaCatinPria == "" || this.agamaCatinPria == null ||
      this.pekerjaanCatinPria == "" || this.pekerjaanCatinPria == null ||
      this.alamatCatinPria == "" || this.alamatCatinPria == null ||
      this.wali_nikahCatinPria == "" || this.wali_nikahCatinPria == null ||
      this.statusCatinPria == "" || this.statusCatinPria == null ||

      this.kecamatanSelectCatinWanita == "" || this.kecamatanSelectCatinWanita == null ||
      this.namaCatinWanita == "" || this.namaCatinWanita == null ||
      this.tanggalLahirCatinWanita == null ||
      this.agamaCatinWanita == "" || this.agamaCatinWanita == null ||
      this.pekerjaanCatinWanita == "" || this.pekerjaanCatinWanita == null ||
      this.alamatCatinWanita == "" || this.alamatCatinWanita == null ||
      this.wali_nikahCatinWanita == "" || this.wali_nikahCatinWanita == null ||
      this.statusCatinWanita == "" || this.statusCatinWanita == null
    ){
      return false;
    }
    else {
      return true;
    }
  }

  simpanNikah() {
    this.pernikahanService.SimpanNikah(
      this.catinPriaId,
      this.CatinWanitaId,
      this.adminId,
      this.desaSelectNikah,
      this.penghuluId,
      this.tanggalNikah
    ).then(
      success => {
        if (success) {
          this.showToast("Data Nikah Berhasil Disimpan");
          this.bool = true;
          this.dismiss();
        }
        else {
          this.showToast('Simpan Data Gagal, Hubungi Admin Untuk Info Lebih Lanjut');
        }
      },
      error => {
        this.loading.dismiss();
        this.showToast('Simpan Data Gagal, Cek Jaringan Koneksi');
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Menyimpan Data...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismiss() {
    this.callback(true).then(()=>{
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendaftaranPage');

    this.LoadProvinsi();

    this.LoadDesas();

    this.LoadPenghulu();

    this.signupSlider.lockSwipes(true);
  }

  ionViewCanLeave(): boolean {
    if (!this.bool) {
      this.cancelConfirm()
    }
    else {
      return true;
    }
    return false;
  }

}
