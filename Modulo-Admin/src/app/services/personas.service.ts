import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(
    private api: ApiService,
    private http: HttpClient 
  ) { }

  URL = this.api.url() + '/personas';

  CrearPersona(Persona){
    return this.http.post(this.URL, Persona);
  }

  ObtenerPersonas(){
    return this.http.get(this.URL + '/todos');
  }

  EliminarPersona(id: string) {
    return this.http.delete(this.URL + '/' + id)
  }
}
