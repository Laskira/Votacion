import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

export interface mensaje {
  icon?: any;
  mensaje?: any;
  titulo?: any;
  confirm?: any;
}

@Injectable({
  providedIn: "root"
})
export class AlertasService {
  constructor() {}

  Alerta(mensaje: mensaje) {
    Swal.fire({
      icon: mensaje.icon,
      title: mensaje.titulo,
      text: mensaje.mensaje,
      showConfirmButton: false,
      showCloseButton: true,
      padding: '2em',
      timer: 4000,
      timerProgressBar: true
    });
  }

  AlertaSinCerrar(mensaje: mensaje) {
    Swal.fire({
      icon: mensaje.icon,
      title: mensaje.titulo,
      showConfirmButton: false,
      showCloseButton: false,
      padding: '2em',
      timer: 3200,
      timerProgressBar: true,
      allowOutsideClick: false
    });
  }
}
