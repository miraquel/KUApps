import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BaseUrl } from "../base-url";
import { AuthServiceProvider } from "../auth-service/auth-service";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the PernikahanServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PernikahanServiceProvider {
  urlMaster: string = BaseUrl.BASE_API_URL;

  constructor(
    public http: Http,
    private authService: AuthServiceProvider
  ) {
    console.log('Hello PernikahanServiceProvider Provider');
  }

  ShowPenghulu(){
    var url = this.urlMaster+'/api/Penghulus?filter={"include":{"districts":{"regencies":"provinces"}}}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowPenghuluDetails(penghuluId: number){
    var url = this.urlMaster+'/api/Penghulus/'+penghuluId;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  hapusPenghulu(penghuluId, token) {
    var url = this.urlMaster+'/api/Penghulus/'+penghuluId+'?access_token='+token;
    var response = this.http.delete(url).map(res => res.json());
    return response;
  }

  editPenghulu(penghulu, token) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      nama: penghulu.nama,
      tanggal_lahir: penghulu.tanggal_lahir,
      no_ktp: penghulu.no_ktp,
      alamat: penghulu.alamat,
      agama: penghulu.agama,
      pendidikan: penghulu.pendidikan,
      nomor_handphone: penghulu.nomor_handphone,
      districtId: penghulu.districtId
    });

    var url = this.urlMaster+'/api/Penghulus/'+penghulu.id+'?access_token='+token;;
    var response = this.http.put(url,body,options)
    .map(res => res.json(), this.handleError);
    return response;
  }

  ShowNikah() {
    var url = this.urlMaster+'/api/Nikahs?filter={"include": [{"catinpria":{"districts":{"regencies":"provinces"}}},{"catinwanita":{"districts":{"regencies":"provinces"}}},{"penghulu":{"districts":{"regencies":"provinces"}}},"village","invoice"]}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowNikahById(nikahId: number) {
    var url = this.urlMaster+'/api/Nikahs/'+nikahId+'?filter={"include": ["catinpria","catinwanita","penghulu","village","invoice"]}';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowNikahByPendaftar() {
    var url = this.urlMaster+'/api/Nikahs/findOne?filter={"include": [{"catinpria":{"districts":{"regencies":"provinces"}}},{"catinwanita":{"districts":{"regencies":"provinces"}}},{"penghulu":{"districts":{"regencies":"provinces"}}},"village",{"invoice":"pembayarans"}], "where": {"pendaftarId":'+this.authService.accessToken.userId+'}}&access_token='+this.authService.accessToken.id;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  SimpanCatinPria(
    districtIdCatinPria,
    noKtpCatinPria,
    urlKtpCatinPria,
    namaCatinPria,
    tanggalLahirCatinPria,
    agamaCatinPria,
    pekerjaanCatinPria,
    alamatCatinPria,
    wali_nikahCatinPria,
    statusCatinPria
  ){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      districtId: districtIdCatinPria,
      no_ktp: noKtpCatinPria,
      url_ktp: 'api/Attachments/'+urlKtpCatinPria.result.files.file[0].container+'/download/'+urlKtpCatinPria.result.files.file[0].name,
      nama: namaCatinPria,
      tanggal_lahir: tanggalLahirCatinPria,
      agama: agamaCatinPria,
      pekerjaan: pekerjaanCatinPria,
      alamat: alamatCatinPria,
      wali_nikah: wali_nikahCatinPria,
      status: statusCatinPria
    });

    var url = this.urlMaster+'/api/catinPria';
    var response = this.http.post(url,body,options)
    .toPromise()
    .then(res => res.json(), this.handleError);
    return response;
  }

  // EditCatinPria(catinPria){
  //   let headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //
  //   let options = new RequestOptions({
  //     headers: headers
  //   });
  //
  //   let body = JSON.stringify({
  //     districtId: catinPria.districtId,
  //     no_ktp: catinPria.no_ktp,
  //     url_ktp: 'api/Attachments/'+urlKtpCatinPria.result.files.file[0].container+'/download/'+urlKtpCatinPria.result.files.file[0].name,
  //     nama: namaCatinPria,
  //     tanggal_lahir: tanggalLahirCatinPria,
  //     agama: agamaCatinPria,
  //     pekerjaan: pekerjaanCatinPria,
  //     alamat: alamatCatinPria,
  //     wali_nikah: wali_nikahCatinPria,
  //     status: statusCatinPria
  //   });
  //
  //   var url = this.urlMaster+'/api/catinPria';
  //   var response = this.http.put(url,body,options)
  //     .map(res => res.json(), this.handleError);
  //   return response;
  // }

  SimpanCatinWanita(
    districtIdCatinWanita,
    noKtpCatinWanita,
    urlKtpCatinWanita,
    namaCatinWanita,
    tanggalLahirCatinWanita,
    agamaCatinWanita,
    pekerjaanCatinWanita,
    alamatCatinWanita,
    wali_nikahCatinWanita,
    statusCatinWanita
  ){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      districtId: districtIdCatinWanita,
      no_ktp: noKtpCatinWanita,
      url_ktp: 'api/Attachments/'+urlKtpCatinWanita.result.files.file[0].container+'/download/'+urlKtpCatinWanita.result.files.file[0].name,
      nama: namaCatinWanita,
      tanggal_lahir: tanggalLahirCatinWanita,
      agama: agamaCatinWanita,
      pekerjaan: pekerjaanCatinWanita,
      alamat: alamatCatinWanita,
      wali_nikah: wali_nikahCatinWanita,
      status: statusCatinWanita
    });

    var url = this.urlMaster+'/api/CatinWanita';
    var response = this.http.post(url,body,options)
    .toPromise()
    .then(res => res.json(), this.handleError);
    return response;
  }

  SimpanPenghulu(
    desa,
    nama,
    tanggal_lahir,
    no_ktp,
    alamat,
    agama,
    pendidikan,
    nomor_handphone,
    token
  ){
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      districtId: desa,
      nama: nama,
      tanggal_lahir: tanggal_lahir,
      no_ktp: no_ktp,
      alamat: alamat,
      agama: agama,
      pendidikan: pendidikan,
      nomor_handphone: nomor_handphone
    });

    var url = this.urlMaster+'/api/Penghulus?access_token='+token;
    var response = this.http.post(url,body,options)
    .toPromise()
    .then(res => res.json(), this.handleError);
    return response;
  }

  SimpanNikah(
    catinpriaId,
    catinwanitaId,
    adminId,
    villageId,
    tanggal
  ) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      catinpriaId: catinpriaId,
      catinwanitaId: catinwanitaId,
      adminId: adminId,
      villageId: villageId,
      tanggal: tanggal
    });

    var url = this.urlMaster+'/api/Pendaftars/'+this.authService.accessToken.userId+'/nikahs?access_token='+this.authService.accessToken.id;
    var response = this.http.post(url,body,options)
    .toPromise()
    .then(res => res.json(), this.handleError);
    return response;
  }

  SimpanInvoice(invoice) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      no_slip: invoice.noSlip,
      bank: invoice.bank,
      tanggal: invoice.tanggal,
      nominal: invoice.nominal,
      status: invoice.status
    });

    var url = this.urlMaster+'/api/Invoices';
    var response = this.http.post(url,body,options)
      .map(res => res.json(), this.handleError);
    return response;
  }

  UpdateInvoice(invoice, id) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      no_slip: invoice.no_slip,
      bank: invoice.bank,
      tanggal: invoice.tanggal,
      nominal: invoice.nominal,
      status: invoice.status
    });

    var url = this.urlMaster+'/api/Invoices/'+id;
    var response = this.http.put(url,body,options)
      .map(res => res.json(), this.handleError);
    return response;
  }

  updateNikahInvoice(invoiceId, nikahId) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      invoiceId: invoiceId
    });

    var url = this.urlMaster+'/api/Nikahs/'+nikahId;
    var response = this.http.patch(url,body,options)
      .map(res => res.json(), this.handleError);
    return response;
  }

  updateNikahStatus(status, nikahId) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify(status);

    var url = this.urlMaster+'/api/Nikahs/'+nikahId;
    var response = this.http.patch(url,body,options)
      .map(res => res.json(), this.handleError);
    return response;
  }

  hapusNikah(id) {
    var url = this.urlMaster+'/api/Nikahs/'+id;
    var response = this.http.delete(url).map(res => res.json());
    return response;
  }

  hapusCatinPria(id) {
    var url = this.urlMaster+'/api/CatinPria/'+id;
    var response = this.http.delete(url).map(res => res.json());
    return response;
  }

  hapusCatinWanita(id) {
    var url = this.urlMaster+'/api/CatinWanita/'+id;
    var response = this.http.delete(url).map(res => res.json());
    return response;
  }

  handleError(err) {
    console.log(err);
    return err.json().message || false;
  }

}
