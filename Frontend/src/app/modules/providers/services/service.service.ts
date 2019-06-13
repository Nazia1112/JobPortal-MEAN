import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComProfile} from '../../../constants/Provider-profile'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isProLoggedIn() {
    if (localStorage.getItem('key')) {
      return true;
    }
    return false;
  }



  addPostProvider(data): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/providers/add', data, httpOptions);
  }

  loginUser(data): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/providers/login', data, httpOptions);
  }
  postAdd(data): Observable<any> {
    
    let token = localStorage.getItem('key');
    console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post('http://localhost:3000/providers/addPost', data, httpOptions);
  }


  getproviderPost(): Observable<any> {

    let token = localStorage.getItem('key');
    console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get('http://localhost:3000/providers/providerPost', httpOptions);
  }

  getallPosts(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/providers/allPost', httpOptions);
  }

  deletePost(data): Observable<any> {
    let token = localStorage.getItem('key');
    console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete('http://localhost:3000/providers/deletePost/' + data, httpOptions);
  }


  getappliedposts(): Observable<any> {

    let token = localStorage.getItem('key');
    console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get('http://localhost:3000/providers/appliedpostusers', httpOptions);
  }
  


  getPost(data): Observable<any>
  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/providers/getPost',{"_id":data}, httpOptions);
  }

  search(data):Observable<any>
  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };   
    return this.http.post('http://localhost:3000/providers/search',data, httpOptions);
  }

  companyprofile():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('key')
      })
    };
    return this.http.get('http://localhost:3000/providers/companyprofile', httpOptions)
  }

  getcomprofile(data): Observable<any>
  {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('key')
      })
    };
    return this.http.post('http://localhost:3000/providers/editprofile',{"CompanyName":data}, httpOptions);
    // return this.http.post('http://localhost:3000/products/getparam',{"SKU":data},this.httpOptions);
  }

  updateProfile(data): Observable<any>
  {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('key')
      })
    };
    return this.http.post('http://localhost:3000/providers/updateprofile',data, httpOptions);
 
  }






}
