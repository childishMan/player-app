import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {
    private apiPath = '/api/'
    constructor(private httpClient: HttpClient) {
     }

     post(path:string,data:any):Observable<any>{
        return this.httpClient.post(this.apiPath+path,data);
     }

     get(path:string,params?:HttpParams):Observable<any>{
         return this.httpClient.get(this.apiPath+path,{params:params});
     }
}