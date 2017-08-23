import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import * as moment from "moment";

/**
 * Generated class for the AdminDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin-details',
  templateUrl: 'admin-details.html',
})
export class AdminDetailsPage {
  loading: Loading;
  userParams = {
    userId: '',
    token: ''
  }

  userDetails = {
    nip:'',
    nama:'',
    dob:'',
    alamat:'',
    pendidikan:'',
    golongan:'',
    username:'',
    email:'',
    jabatan:''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.userParams.userId = navParams.get('id');
    moment.locale('id');
  }

  ionViewDidLoad() {
    this.showLoading();
    this.storage.ready().then(
      ready => {
        this.storage.get('token').then(
          token => {
            this.userParams.token = token;
            this.authService.getUserInfo(this.userParams).subscribe(
              data => {
                this.userDetails.nip = data.nip;
                this.userDetails.nama = data.nama;
                this.userDetails.dob = moment(data.dob).format('DD MMMM YYYY');
                this.userDetails.alamat = data.alamat;
                this.userDetails.pendidikan = data.pendidikan;
                this.userDetails.golongan = data.golongan;
                this.userDetails.username = data.username;
                this.userDetails.email = data.email;
                this.userDetails.jabatan = data.roles[0].name;
                this.loading.dismiss();
              },
              error => {
                this.showError("Koneksi Error");
                this.loading.dismiss();
                this.navCtrl.popToRoot();
              }
            )
          }
        )
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
