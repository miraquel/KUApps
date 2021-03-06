import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the ProfileChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-change-password',
  templateUrl: 'profile-change-password.html',
})
export class ProfileChangePasswordPage {
  loading: Loading;
  password = {
    oldPassword: '',
    newPassword: ''
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileChangePasswordPage');
  }

  changePassword() {
    if (this.password.newPassword === "" || this.passwordDummy === "" || this.password.oldPassword === "") {
      this.showToast("password Kosong, pastikan semua field password terisi")
    }
    else if (this.password.newPassword !== this.passwordDummy) {
      this.showToast("Konfirmasi password tidak sama dengan password baru, harap samakan keduanya")
    }
    else {
      this.storage.get('user').then(
        user => {
          if (user.principalType === "Admin") {
            this.showLoading();
            this.authService.adminChangePassword(this.password).subscribe(
              success => {
                this.showToast("Password berhasil dirubah");
                this.dismiss();
              },
              error => {
                this.showToast("koneksi error, password gagal dirubah");
                this.loading.dismiss();
              }
            );
          }
          else if (user.principalType === "Pendaftar") {
            this.showLoading();
            this.authService.pendaftarChangePassword(this.password).subscribe(
              success => {
                this.showToast("Password berhasil dirubah");
                this.dismiss();
              },
              error => {
                this.showToast("koneksi error, password gagal dirubah");
                this.loading.dismiss();
              }
            );
          }
        }
      )
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
