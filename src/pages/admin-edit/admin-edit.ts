import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the AdminEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-edit',
  templateUrl: 'admin-edit.html',
})
export class AdminEditPage {
  token;
  loading: Loading;
  roles: Array<any>;
  admin = {
    nip: '',
    nama: '',
    dob: '',
    alamat: '',
    pendidikan: '',
    golongan: '',
    username: '',
    email: '',
    password: '',
    roles : {
      id : '',
      name : ''
    }
  }
  passwordDummy;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private storage: Storage,
    private authService: AuthServiceProvider
  ) {
    this.storage.get("token").then(
      token => {
        this.token = token;
      }
    );
    this.admin = navParams.get("admin");
    this.loadRoles();
    this.admin.password = ""
;  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEditPage');
  }

  edit() {
    if (this.admin.password == "" || this.passwordDummy == "") {
      this.showToast('Password Kosong, Harap Isi Keduanya');
    }
    else if (this.admin.password !== this.passwordDummy) {
      this.showToast('Password verifikasi tidak sesuai, harap samakan password dengan password verifikasi');
    }
    else {
      this.showLoading();
      this.authService.editUser(this.admin, this.token).subscribe(
        success => {
          if (success) {
            this.authService.updateUserRole(success.id, this.admin.roles[0].id, this.token).subscribe(
              success => {
                this.showToast('data berhasil di rubah');
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
          this.loading.dismiss();
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

}
