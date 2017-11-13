import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  credentials = {
    nama: '',
    nomor_handphone: '',
    username: '',
    email: '',
    password: '',
  }
  loading: Loading;
  createSuccess;
  passwordDummy;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }

  public register() {
    if (this.credentials.password !== this.passwordDummy) {
      this.showToast("Password tidak sama, samakan kedua password");
    }
    else {
      this.showLoading();
      this.authService.pendaftarRegister(this.credentials).subscribe(
        success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("Sukses", "Akun Pendaftar Sukses Dibuat");
            this.loading.dismiss();
          }
          else {
            this.showPopup("Error", "Ada Masalah Saat Membuat Akun Pendaftar, Silahkan Hubungi Admin");
            this.loading.dismiss();
          }
        },
        error => {
          let errorParsed = JSON.parse(error._body);
          this.loading.dismiss();
          this.showPopup("Error", errorParsed.error.message);
          console.log(errorParsed.error.message);
        }
      );
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Membuat Akun...',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
