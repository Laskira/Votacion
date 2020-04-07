import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotarService {

  constructor(
    private api: ApiService,
    private http: HttpClient, 
  ) { }

  URL =  this.api.url();

  ObtenerCandidatosJornada(jornada) {
    return this.http.get(this.URL + 'candidatos/jornada/' + jornada);
  }

  BuscarCedula( cedula ){
    return this.http.post<any>(this.URL + 'personas/buscar', cedula )
  }

  BuscarPersona() {
    return this.http.get<any>(this.URL + 'personas/')
  }

  Votar(candidato) {
    return this.http.post<any>(this.URL + 'votos', candidato)
  }
}
