import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PermisosService {
  constructor(
    private api: ApiService, 
    private http: HttpClient
  ) {}

  URL = this.api.url() + "/permisos/";

  Acceder(User) {
    return this.http.post(this.URL + "acceder", User);
  }

  Perfil() {
    return this.http.get(this.URL);
  }

  ListarUsuarios() {
    return this.http.get(this.URL + "cuentas");
  }

  CrearUsuario(usuario) {
    return this.http.post(this.URL, usuario )
  }

  EliminarUsuario(id: string) {
    return this.http.delete(this.URL + id )
  }
}
