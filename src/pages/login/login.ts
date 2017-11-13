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
  userType = 'pendaftar';
  credentials = {
    email: '',
    password: ''
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
        this.storage.get('user').then(
          user => {
            if (user !== null && user.principalType === 'Admin') {
              console.log(user);
              this.auth.accessToken = user;
              this.auth.adminFindById(user)
              .subscribe(
                success => {
                  this.navCtrl.setRoot('BerandaTabsPage');
                  this.auth.user = success;
                },
                error => {
                  this.showError("Sesi anda telah berakhir, silahkan login kembali");
                  this.storage.clear();
                }
              );
            }

            else if (user !== null && user.principalType === 'Pendaftar') {
              console.log(user);
              this.auth.accessToken = user;
              this.auth.pendaftarFindById(user)
              .subscribe(
                success => {
                  this.navCtrl.setRoot('PendaftarTabsPage');
                  this.auth.user = success;
                  console.log(success);
                },
                error => {
                  this.showError("Sesi anda telah berakhir, silahkan login kembali");
                  this.storage.clear();
                }
              );
            }

          }
        );
      }
    );
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading();

    this.auth.adminLogin(this.credentials).subscribe(
      success => {
        this.navCtrl.setRoot('BerandaTabsPage');
        this.storage.set('user', success);
        this.auth.accessToken = success;
        this.auth.adminFindById(success).subscribe(
          success => {
            console.log(success)
            this.auth.user = success;
          }
        );
        console.log(success);
      },
      error => {
        if (error.statusText === "Unauthorized") {
          this.auth.pendaftarLogin(this.credentials).subscribe(
            success => {
              this.navCtrl.setRoot('PendaftarTabsPage');
              this.storage.set('user', success);
              this.auth.accessToken = success;
              this.auth.pendaftarFindById(success).subscribe(
                success => {
                  console.log(success)
                  this.auth.user = success;
                }
              );
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
            }
          );
        }
        else {
          this.showError("Koneksi Error");
          console.log(error);
        }
        this.loading.dismiss();
      }
    );
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
