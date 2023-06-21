import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var baseApi = environment.baseApi;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = baseApi + 'api/';

  constructor(private http: HttpClient) {}
  //-----------------------------------------------RESERVATIONS
  reservGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'reserv');
  }
  reservPost(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'reserv', body);
  }
  reservUpdate(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'reserv/' + id, body);
  }
  //-----------------------------------------------RESources
  resourcesGet(): Observable<any> {
    return this.http.get(this.baseUrl + 'resources');
  }
  resourcesPost(body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'resources', body);
  }
  resourcesUpdate(id: any, body: any): Observable<any> {
    return this.http.post(this.baseUrl + 'resources/' + id, body);
  }
}
