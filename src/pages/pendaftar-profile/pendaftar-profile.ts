import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, Loading, LoadingController, AlertController, App } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the PendaftarProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pendaftar-profile',
  templateUrl: 'pendaftar-profile.html',
})
export class PendaftarProfilePage {
  loading: Loading;
  user;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthServiceProvider,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private app: App
  ) {
    this.user = authService.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendaftarProfilePage');
  }

  logout() {
    this.showLoading();
    this.storage.ready().then(
      success => {
        this.storage.get('user').then(
          user => {
            this.authService.pendaftarLogout().subscribe(
              success => {
                this.storage.clear();
                this.loading.dismiss();
                this.app.getRootNav().setRoot("LoginPage");
              },
              error => {
                this.showError("Koneksi Error");
              }
            );
          }
        );
      }
    );
  }

  changePassword() {
    this.navCtrl.push("ProfileChangePasswordPage");
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Mohon Tunggu...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
