import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PersonasService } from "src/app/services/personas.service";
import { AlertasService } from "src/app/services/alertas.service";

@Component({
  selector: "app-form-personas",
  templateUrl: "./form-personas.component.html",
  styleUrls: ["./form-personas.component.scss"]
})
export class FormPersonasComponent implements OnInit {
  Sexos: any;

  FormPersona = new FormGroup({
    Documento: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    Nombres: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    P_Apellido: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    S_Apellido: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  constructor(
    private PersonasService: PersonasService,
    private alertar: AlertasService
  ) {}

  ngOnInit(): void {}

  CrearPersona() {
    this.PersonasService.CrearPersona(this.FormPersona.value).subscribe(
      res => {
        this.alertar.Alerta(res);
      },
      err => this.alertar.Alerta(err.error)
    );
  }
}
