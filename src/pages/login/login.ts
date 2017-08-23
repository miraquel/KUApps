import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  currentLogedInUser = {
    userId: '',
    token:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private storage: Storage) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  ionViewDidLoad() {
    this.initCredentials();
  }

  initCredentials() {
    this.storage.ready().then(
      success => {
        this.storage.get('userId').then(
          val => {
            if (val !== null) {
              console.log(val);
              this.currentLogedInUser.userId = val;
              this.storage.get('token').then(
                val => {
                  this.currentLogedInUser.token = val;
                  this.auth.checkStoredCredentials(this.currentLogedInUser)
                  .subscribe(
                    success => {
                      this.navCtrl.setRoot('BerandaTabsPage');
                    },
                    error => {
                      this.showError("Sesi anda telah berakhir, silahkan login kembali");
                      this.storage.clear();
                    }
                  );
                }
              );
            }
          }
        );
      });
    }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(
      success => {
        this.navCtrl.setRoot('BerandaTabsPage');
        this.storage.set('userId', success.userId);
        this.storage.set('token', success.id);
        console.log(success);
      },
      error => {
        if (error.statusText === "Unauthorized") {
          this.showError("Akses ditolak, email / password salah");
          console.log(error);
        }
        else {
          this.showError("Koneksi Error");
          console.log(error);
        }
        this.loading.dismiss();
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Mohon Tunggu...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
