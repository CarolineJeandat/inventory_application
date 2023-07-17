import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:3000/api';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}
  // Add
  AddProduct(data: Product): Observable<any> {
    let API_URL = `${this.REST_API}/add-product`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  // Get all objects
  GetProducts() {
    return this.httpClient.get(`${this.REST_API}`);
  }
  // Get single object by id
  GetProductById(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-product-by-id/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Get single object by name
  GetProductByName(name: string): Observable<any> {
    let API_URL = `${this.REST_API}/read-product-by-name/${name}`;
    let test = this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
    return test
  }
  // Update
  updateProduct(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-product/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Delete
  deleteProduct(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-product/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }

}
