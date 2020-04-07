import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { Chart } from "chart.js";

@Injectable({
  providedIn: "root"
})
export class ExtrasService {
  constructor(
    private api: ApiService, 
    private http: HttpClient
  ) {}

  URL = this.api.url() ; 

  ObtenerJornadas() {
    return this.http.get<any>(this.URL + "extras/jornadas");
  }

  ObtenerContador() {
    return this.http.get(this.URL + "extras/contador");
  }

  ObtenerReportes() {
    return this.http.get(this.URL + "votos/reporte")
  }
}
