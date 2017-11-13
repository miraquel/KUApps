import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BaseUrl } from "../../providers/base-url";

/**
 * Generated class for the CatinPriaEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-catin-pria-edit',
  templateUrl: 'catin-pria-edit.html',
})
export class CatinPriaEditPage {
  callback;
  catinPria;
  imgKtp;
  _imgKtp;

  provinsiSelect;
  kabupatenSelect;
  kecamatanSelect;
  provinsis;
  kabupatens;
  kecamatans;

  kabupatenDisableSelector;
  kecamatanDisableSelector;

  pekerjaanCb;
  pekerjaanTb;
  hideTbPekerjaan;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lokasiService: LokasiServiceProvider,
    private pernikahanService: PernikahanServiceProvider,
    private transfer: FileTransfer,
    private file: File,
    private camera: Camera
  ) {
    this.callback = navParams.get("callback");
    this.catinPria = navParams.get("catinPria");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatinPriaEditPage');
  }

  dismiss() {
    this.callback(true).then(()=>{
      this.navCtrl.pop();
    });
  }

  LoadProvinsi(){
    this.lokasiService.ShowProvinsi().subscribe(
      data => {
        this.provinsis = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKabupaten(){
    this.lokasiService.ShowKabupaten(this.provinsiSelect.id).subscribe(
      data => {
        this.kabupatenDisableSelector = false;
        this.kabupatens = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKecamatan(){
    this.lokasiService.ShowKecamatan(this.kabupatenSelect.id).subscribe(
      data => {
        this.kecamatanDisableSelector = false;
        this.kecamatans = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  pekerjaanLainnyaOnChange(){
    if (this.pekerjaanCb !== "Lainnya"){
      this.hideTbPekerjaan = false;
    }
    else {
      this.hideTbPekerjaan = true;
    }
  }

  fotoKtp(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imgKtp = 'data:image/jpeg;base64,' + imageData;
      // console.log(this.imgKtpCatinPria);
    }, (err) => {
      // handle error
    });
  }

  simpan() {

    this.catinPria.districtId = this.kecamatanSelect;
    if (this.hideTbPekerjaan === false) {
      this.catinPria.pekerjaan = this.pekerjaanCb;
    }
    else {
      this.catinPria.pekerjaan = this.pekerjaanTb;
    }

    // this.pernikahanService.EditCatinPria(this.catinPria).subscribe(
    //   success => {
    //
    //   },
    //   error => {
    //
    //   }
    // );
  }

}
