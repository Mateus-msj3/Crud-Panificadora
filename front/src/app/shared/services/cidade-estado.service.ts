import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado} from "../models/estado";
import {Cidade} from "../models/cidade";


@Injectable({
  providedIn: 'root'
})
export class CidadeEstadoService {

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]>{
    return  this.http.get<Estado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  getCidades(idEstado: number): Observable<Cidade[]>{
    return  this.http.get<Cidade[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`)

  }

}
