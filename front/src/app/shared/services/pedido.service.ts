import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pedido} from "../models/pedido";


@Injectable({
  providedIn: 'root'
})
export class PedidoService {


  private url = '/api/pedido';

  constructor(private http: HttpClient) { }

  public getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.url}/`)
  }

   public postPedido(data: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.url}/`, data)
  }

  public putPedido(data: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.url}/`, data)
  }

  public deletePedido(data:Pedido): Observable<any> {
    return this.http.delete<Pedido>(`${this.url}/${data.id}`);
  }

  }

