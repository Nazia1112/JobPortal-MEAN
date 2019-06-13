import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SeekServiceService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  saveUser(data: any): Observable<any> {

    return this.http.post('http://localhost:3000/seekers/add', data, this.httpOptions);
  }
  saveFile(data: any): Observable<any> {

    return this.http.post('http://localhost:3000/seekers/addfile', data);
  }
  savePhoto(data: any): Observable<any> {

    return this.http.post('http://localhost:3000/seekers/addphoto', data);
  }
  loginUser(data: any): Observable<any> {

    return this.http.post('http://localhost:3000/seekers/login', data, this.httpOptions);
  }


  applyPost(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      })
    };
    return this.http.post('http://localhost:3000/providers/applyPost', { "_id": id }, httpOptions);
  }

  userprofile(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      })
    };
    return this.http.get('http://localhost:3000/seekers/userprofile', httpOptions)
  }

  updateProfile(data): Observable<any>
  {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      })
    };
    return this.http.post('http://localhost:3000/seekers/updateprofile',data, httpOptions);
 
  }
  getuserprofile(data): Observable<any>
  {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      })
    };
    return this.http.post('http://localhost:3000/seekers/editprofile',{"UserName":data}, httpOptions);
    
  }

  getappliedposts(): Observable<any> {

   let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
      })
    };
    return this.http.get('http://localhost:3000/seekers/appliedcompany', httpOptions);
  }


}
