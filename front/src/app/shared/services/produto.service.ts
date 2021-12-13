import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produto} from "../models/produto";


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = '/api/produto';

  constructor(private http: HttpClient) { }

  public getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/`)
  }

   public postProduto(data: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.url}/`, data)
  }

  public putProduto(data: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/`, data)
  }

  public deleteProduto(data:Produto): Observable<any> {
    return this.http.delete<Produto>(`${this.url}/${data.id}`);
  }

  }

