import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the AdminAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-add',
  templateUrl: 'admin-add.html',
})
export class AdminAddPage {
  loading: Loading;
  passwordDummy;
  token;
  roles: Array<any>;
  user = {
    nip: '',
    nama: '',
    username: '',
    email: '',
    password: '',
    dob: '',
    alamat: '',
    pendidikan: '',
    golongan: '',
    jabatan: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private authService: AuthServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAddPage');
    this.storage.get('token').then(
      success => {
        this.token = success;
        console.log(success);
        this.loadRoles();
      }
    );
  }

  loadRoles() {
    this.showLoading();
    this.authService.getRoles(this.token).subscribe(
      data => {
        this.roles = data;
        console.log(this.roles);
        this.loading.dismiss();
      },
      error => {
        this.showToast('Koneksi Error');
        this.loading.dismiss();
      }
    )
  }

  simpan() {
    if (this.user.password !== this.passwordDummy) {
      this.showToast('Password verifikasi tidak sesuai, harap samakan password dengan password verifikasi')
    }
    else {
      this.showLoading();
      this.authService.register(this.user, this.token).subscribe(
        success => {
          if (success) {
            this.authService.mapRoleToUser(success.id, this.user.jabatan, this.token).subscribe(
              success => {
                this.showToast('Data Berhasil Ditambahkan');
                this.loading.dismiss();
                this.dismiss();
              },
              error => {
                this.showToast('Simpan Data Gagal, Cek Jaringan');
                this.loading.dismiss();
              }
            );
          }
          else {
            this.showToast('Simpan Data Gagal, Cek Jaringan');
            this.loading.dismiss();
          }
        },
        error => {
          this.showToast(error);
        }
      );
    }
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
