import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConstants } from '../constants/AppConstants';
import { Employee } from '../models/employee';



@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private currentUserSubject: BehaviorSubject<Employee>;
  public currentUser: Observable<Employee>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentEmployeeValue(): Employee {
    return this.currentUserSubject.value;
  }


  login(queryParams: any = new Object()) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let httpOptions = {
      headers: headers
    }
    return this.http.post<Employee>(AppConstants.LOGIN, queryParams, httpOptions)
      .pipe(
        map((employee) => {
          localStorage.setItem('currentUser', JSON.stringify(employee));
          this.currentUserSubject.next(employee);
          return employee;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  post(url: string, queryParams: any = new Object(), extraHeaders?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    for (let headerKey in extraHeaders) {
      headers.append(headerKey, extraHeaders[headerKey]);
    }
    let httpOptions = {
      headers: headers
    }
    return this.http.post(url, queryParams, httpOptions)
      .pipe(
        map(
          (result) => {
            return result
            // if(result.status == 200 && result.body){
            //   try{
            //     return result.json();
            //   }catch(e){
            //     console.log(e)
            //   }
            // }
          })
      );
  }

  get(url: string, extraHeaders?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    for (let headerKey in extraHeaders) {
      headers.append(headerKey, extraHeaders[headerKey]);
    }
    let httpOptions = {
      headers: headers
    }
    return this.http.get(url, httpOptions)
      .pipe(
        map(
          (result) => { return result }
        )
      );
  }

  put(url: string, queryParams: any = new Object(), extraHeaders?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    for (let headerKey in extraHeaders) {
      headers.append(headerKey, extraHeaders[headerKey]);
    }
    let httpOptions = {
      headers: headers
    }
    return this.http.put(url, queryParams, httpOptions)
      .pipe(
        map(
          (result) => { return result }
        )
      );
  }

  delete(url: string, extraHeaders?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    for (let headerKey in extraHeaders) {
      headers.append(headerKey, extraHeaders[headerKey]);
    }
    let httpOptions = {
      headers: headers
    }
    return this.http.delete(url, httpOptions)
      .pipe(
        map(
          (result) => { return result }
        )
      );
  }

}
