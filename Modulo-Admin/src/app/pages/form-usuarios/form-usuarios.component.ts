import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PermisosService } from "src/app/services/permisos.service";
import { AlertasService } from "src/app/services/alertas.service";

@Component({
  selector: "app-form-usuarios",
  templateUrl: "./form-usuarios.component.html",
  styleUrls: ["./form-usuarios.component.scss"]
})
export class FormUsuariosComponent implements OnInit {
  hide: boolean = true;

  FormUsuario = new FormGroup({
    Documento: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    NombreP: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    Password: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(
    private permisosServise: PermisosService,
    private alertar: AlertasService
  ) {}

  ngOnInit(): void {}

  CrearUsuario() {
    this.permisosServise.CrearUsuario(this.FormUsuario.value).subscribe(
      res => {
        this.alertar.Alerta(res);
      },
      err => this.alertar.Alerta(err.error)
    );
  }
}
