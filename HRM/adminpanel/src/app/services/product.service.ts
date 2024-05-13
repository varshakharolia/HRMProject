import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url="http://localhost:3000/product";

  constructor(private http:HttpClient) { }

  addNewProduct(data:any): Observable<any> {
    const token = localStorage.getItem('token');
    if (token === null){
      'return';
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.post(this.url, data, {headers:headers});
  }

  getAllProducts(): Observable<any> {
    const token = localStorage.getItem("token");
    if (token === null){
      'return';
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.get(this.url,{headers : headers});
  }

  updateProduct(id: string, data: any): Observable<any> {
    const token = localStorage.getItem("token");
    if (token === null){
      'return';
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
    return this.http.put(`${this.url}/${id}`, data, { headers: headers });
  }
  

}
