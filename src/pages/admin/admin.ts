import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the AdminPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  loading: Loading;
  token: string;
  admins: Array<any>;
  userSelected = {
    id: '',
    token: ''
  }


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private authService: AuthServiceProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    this.loadAdmin();
  }

  adminDetails(id) {
    this.navCtrl.push("AdminDetailsPage", {
      id
    });
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

  adminAddModal() {
    let modal = this.modalCtrl.create('AdminAddPage');
    modal.present();
    modal.onDidDismiss(data => {
      console.log('Modal Dismiss Value :'+data);
      this.loadAdmin();
    });
  }

  edit(admin: Array<any>) {
    console.log(admin);
    let modal = this.modalCtrl.create('AdminEditPage', { admin });
    modal.present();
    modal.onDidDismiss(data => {
      console.log('Modal Dismiss Value :'+data);
      this.loadAdmin();
    });
  }

  delete(id) {
    this.showLoading();
    this.storage.ready().then(
      ready => {
        this.storage.get('token').then(
          token => {
            this.token = token;
            this.authService.deleteUser(id, this.token).subscribe(
              data => {
                this.loading.dismiss();
                console.log(data);
                this.loadAdmin();
              },
              error => {
                this.showError("Koneksi Error");
                this.navCtrl.popToRoot();
              }
            );
          }
        );
      }
    );
  }

  loadAdmin() {
    this.showLoading();
    this.storage.ready().then(
      ready => {
        this.storage.get('token').then(
          token => {
            this.token = token;
            this.authService.getAdmins(this.token).subscribe(
              data => {
                this.admins = data;
                this.loading.dismiss();
                console.log(data);
              },
              error => {
                this.showError("Koneksi Error");
                this.navCtrl.popToRoot();
              }
            );
          }
        );
      }
    );
  }

}
