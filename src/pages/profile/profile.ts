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
  currentLogedInUser = {
    userId: '',
    token:''
  }
  user = {
    nip: '',
    nama: '',
    dob: '',
    alamat: '',
    pendidikan: '',
    golongan: '',
    email: '',
    jabatan: ''
  }

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
    moment.locale('id');
    this.showLoading();
    this.storage.get('userId').then(
      val => {
        this.currentLogedInUser.userId = val;
        this.storage.get('token').then(
          val => {
            this.currentLogedInUser.token = val;
            this.getUser();
          }
        );
      }
    );
  }

  ionViewDidLoad() {

  }

  getUser() {
    this.authService.getUserInfo(this.currentLogedInUser)
      .subscribe(
        data => {
          this.user.nip = data.nip;
          this.user.nama = data.nama;
          this.user.dob = moment(data.dob).format("DD MMMM YYYY");
          this.user.alamat = data.alamat;
          this.user.pendidikan = data.pendidikan;
          this.user.golongan = data.golongan;
          this.user.email = data.email;
          this.user.jabatan = data.roles[0].name;
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.showError("Koneksi Error");
          console.log(error);
        }
      );
  }

  logout() {
    this.showLoading();
    this.storage.ready().then(
      success => {
        this.storage.get('token').then(
          token => {
            this.authService.logout(token).subscribe(
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
