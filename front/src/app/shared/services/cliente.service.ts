import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../models/cliente";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = '/api/cliente';

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Array<Cliente>> {
    return this.http.get<Cliente[]>(`${this.url}/`)
  }

   public postCliente(data: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.url}/`, data)
  }

  public putCliente(data: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/`, data)
  }

  public deleteCliente(data:Cliente): Observable<any> {
    return this.http.delete<Cliente>(`${this.url}/${data.id}`);
  }

  }

