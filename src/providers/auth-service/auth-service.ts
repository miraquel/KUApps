import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { BaseUrl } from "../base-url";
import * as moment from "moment";
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthServiceProvider {
  urlMaster: string = BaseUrl.BASE_API_URL;
  accessToken = {
    id: '',
    ttl: '',
    created: '',
    userId: '',
    principalType: ''
  }
  user;

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public adminLogin(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    }
    else {
      // At this point make a request to your backend to make a real check!
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify(credentials);

      var url = this.urlMaster+'/api/Admins/login';
      var response = this.http.post(url,body,options)
        .map(res => res.json())
        .timeout(5000);
      return response;
    }
  }

  public pendaftarLogin(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    }
    else {
      // At this point make a request to your backend to make a real check!
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({
        headers: headers
      });

      let body = JSON.stringify(credentials);

      var url = this.urlMaster+'/api/Pendaftars/login';
      var response = this.http.post(url,body,options)
        .map(res => res.json())
        .timeout(5000);
      return response;
    }
  }

  adminFindById(user) {
    console.log(user);
    var url = this.urlMaster+'/api/Admins/'+user.userId+'?filter={"include": "roles"}&access_token='+user.id;
    var response = this.http.get(url)
      .map(rs => rs.json())
      .timeout(5000);
    return response;
  }

  pendaftarFindById(user) {
    console.log(user);
    var url = this.urlMaster+'/api/Pendaftars/'+user.userId+'?access_token='+user.id;
    var response = this.http.get(url)
      .map(rs => rs.json())
      .timeout(5000);
    return response;
  }

  public register(credentials, token) {
    // At this point make a request to your backend to make a real check!
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      nip: credentials.nip,
      nama: credentials.nama,
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      dob: moment(credentials.dob).toISOString(),
      alamat: credentials.alamat,
      pendidikan: credentials.pendidikan,
      golongan: credentials.golongan
    });
    console.log(body);

    var url = this.urlMaster+'/api/Admins?access_token='+token;
    var response = this.http.post(url,body,options)
    .map(res => res.json())
    .timeout(5000);
    return response;
  }

  pendaftarRegister(credentials) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      nama: credentials.nama,
      nomor_handphone: credentials.nomor_handphone,
      username: credentials.username,
      email: credentials.email,
      password: credentials.password
    });
    console.log(body);

    var url = this.urlMaster+'/api/Pendaftars';
    var response = this.http.post(url,body,options)
    .map(res => res.json())
    .timeout(5000);
    return response;
  }

  adminChangePassword(password) {
    console.log(this.accessToken.id);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify(password);

    var url = this.urlMaster+'/api/Admins/change-password?access_token='+this.accessToken.id;
    var response = this.http.post(url,body,options)
    .map(res => res.json())
    .timeout(5000);
    return response;
  }

  pendaftarChangePassword(password) {
    console.log(this.accessToken);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify(password);

    var url = this.urlMaster+'/api/Pendaftars/change-password?access_token='+this.accessToken.id;
    var response = this.http.post(url,body,options)
    .map(res => res.json())
    .timeout(5000);
    return response;
  }

  deleteUser(id, token) {
    console.log(id);
    var url = this.urlMaster+'/api/Admins/'+id+'?access_token='+token;
    var response = this.http.delete(url)
      .map(rs => rs.json())
      .timeout(5000);
    return response;
  }

  editUser(admin, token) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      nip: admin.nip,
      nama: admin.nama,
      dob: admin.dob,
      alamat: admin.alamat,
      pendidikan: admin.pendidikan,
      golongan: admin.golongan,
      username: admin.username,
      email: admin.email,
      password: admin.password
    });

    var url = this.urlMaster+'/api/Admins/'+admin.id+'?access_token='+token;
    var response = this.http.put(url,body,options)
    .map(res => res.json())
    .timeout(5000);
    return response;
  }

  getUserInfo(currentLogedInUser) {
    console.log(currentLogedInUser);
    var url = this.urlMaster+'/api/Admins/'+currentLogedInUser.userId+'?filter={"include": ["roles"]}&access_token='+currentLogedInUser.token;
    var response = this.http.get(url)
      .map(rs => rs.json())
      .timeout(5000);
    return response;
  }

  getAdmins(token) {
    var url = this.urlMaster+'/api/Admins?filter={"include": "roles"}&access_token='+token;
    var response = this.http.get(url)
      .map(rs => rs.json())
      .timeout(5000);
    return response;
  }

  getRoles(token) {
    var url = this.urlMaster+'/api/Roles?access_token='+token;
    var response = this.http.get(url)
      .map(rs => rs.json())
      .timeout(5000);
    return response;
  }

  mapRoleToUser(id, roleId, token) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      principalType: "USER",
      principalId: id,
      roleId: roleId
    });

    var url = this.urlMaster+'/api/RoleMappings?access_token='+token;
    var response = this.http.post(url,body,options)
    .map(res => res.json())
    .timeout(5000);
    return response;
  }

  updateUserRole(id, roleId, token) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    let body = JSON.stringify({
      roleId: roleId
    });

    var url = this.urlMaster+'/api/RoleMappings/update?where={"principalId":'+id+'}&access_token='+token;
    var response = this.http.post(url,body,options)
    .map(res => res.json())
    .timeout(5000);
    return response;
  }

  public adminLogout(token) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    var url = this.urlMaster+'/api/Admins/logout'+'?access_token='+token;
    var response = this.http.post(url,options)
      .map(res => res.json())
      .timeout(5000);
    return response;
  }

  public pendaftarLogout() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({
      headers: headers
    });

    var url = this.urlMaster+'/api/Pendaftars/logout'+'?access_token='+this.accessToken.id;
    var response = this.http.post(url,options)
      .map(res => res.json())
      .timeout(5000);
    return response;
  }

}
