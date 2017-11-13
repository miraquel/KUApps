import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Loading, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AuthServiceProvider }  from "../../providers/auth-service/auth-service";
import * as moment from 'moment';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading: Loading;
  user;

  // today: string = this.date.year +"-"+ this.date.month +"-"+ this.date.day;
  today = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private authService: AuthServiceProvider
  ) {
    this.user = this.authService.user
    console.log(this.user)
  }

  ionViewDidLoad() {
    //
  }

  changePassword() {
    this.navCtrl.push("ProfileChangePasswordPage");
  }

  logout() {
    this.showLoading();
    this.storage.ready().then(
      success => {
        this.storage.get('user').then(
          user => {
            this.authService.adminLogout(user.id).subscribe(
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
