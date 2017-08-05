import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PernikahanServiceProvider } from "../../providers/pernikahan-service/pernikahan-service";
import { LokasiServiceProvider } from "../../providers/lokasi-service/lokasi-service";

/**
 * Generated class for the PenghuluDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-penghulu-details',
  templateUrl: 'penghulu-details.html',
})
export class PenghuluDetailsPage {
  id;
  kabupaten;
  kecamatan;
  provinsi;
  public districtId;
  public regencyId;
  nama;
  tanggal_lahir;
  no_ktp;
  alamat;
  agama;
  pendidikan;
  nomor_handphone

  penghulu = {
    districtId: this.districtId,
    nama: this.nama,
    tanggal_lahir: this.tanggal_lahir,
    no_ktp: this.no_ktp,
    alamat: this.alamat,
    agama: this.agama,
    pendidikan: this.pendidikan,
    nomor_handphone: this.nomor_handphone
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private pernikahanService: PernikahanServiceProvider, private lokasiService: LokasiServiceProvider) {
    this.id = navParams.get('id');
  }

  LoadProvinsi(id){
    this.lokasiService.ShowProvinsiByKabupaten(id).subscribe(
      data => {
        this.provinsi = data;
        console.log(this.provinsi);
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKabupaten(id){
    console.log('Kecamatan ID In LoadKabupaten() :'+id)
    this.lokasiService.ShowKabupatenByKecamatan(id).subscribe(
      data => {
        this.kabupaten = {
          id: data.id,
          name: data.name,
          provinceid: data.provinceid
        };
        this.LoadProvinsi(data.id)
        console.log(this.kabupaten);
      },
      err => {
        console.log(err);
      }
    );
  }

  LoadKecamatan(id){
    console.log('Kecamatan ID: '+id);
    this.lokasiService.ShowKecamatanById(id).subscribe(
      data => {
        this.kecamatan = {
          id: data.id,
          name: data.name,
          regencyId: data.regencyId
        };
        console.log(this.kecamatan);
      },
      err => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenghuluDetailsPage');

    this.pernikahanService.ShowPenghuluDetails(this.id).subscribe(
      data => {
        this.penghulu = data;
        this.LoadKecamatan(data.districtId);
        this.LoadKabupaten(data.districtId);
        console.log(this.penghulu);
        console.log(this.penghulu.districtId);
        console.log(data.districtId);
      },
      err => {
        console.log(err);
      }
    );
  }

}
