import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LokasiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LokasiServiceProvider {
  urlMaster: string = 'http://192.168.0.15:3000/';

  constructor(public http: Http) {
    console.log('Hello LokasiServiceProvider Provider');
  }

  ShowProvinsi(){
    var url = this.urlMaster+'api/Provinces';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowProvinsiById(provinsiId){
    var url = this.urlMaster+'api/Provinces/'+provinsiId;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowProvinsiByKabupaten(kabupatenId){
    var url = this.urlMaster+'api/Regencies/'+kabupatenId+'/province';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowKabupaten(provinsiId: number){
    var url = this.urlMaster+'api/Provinces/'+provinsiId+'/regencies';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowKabupatenById(kabupatenId){
    var url = this.urlMaster+'api/Regencies/'+kabupatenId;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowKabupatenByKecamatan(kecamatanId){
    var url = this.urlMaster+'api/Districts/'+kecamatanId+'/regency';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowKecamatan(kabupatenId: number){
    var url = this.urlMaster+'api/Regencies/'+kabupatenId+'/districts';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowKecamatanById(kecamatanId: number){
    var url = this.urlMaster+'api/Districts/'+kecamatanId;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowDesaByID(KecamatanId: number){
    var url = this.urlMaster+'api/Districts/'+KecamatanId+'/villages';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  ShowDesa(){
    var url = this.urlMaster+'api/Villages';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
