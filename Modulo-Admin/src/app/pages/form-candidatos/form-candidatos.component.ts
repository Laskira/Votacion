import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  CandidatosService,
  uploadProgress,
  toResponseBody,
  markAllAsDirty
} from "src/app/services/candidatos.service";
import { requiredFileType } from "src/app/validators/upload-file-validators";
import { ExtrasService } from "src/app/services/extras.service";
import { AlertasService } from "src/app/services/alertas.service";

@Component({
  selector: "app-form-candidatos",
  templateUrl: "./form-candidatos.component.html",
  styleUrls: ["./form-candidatos.component.scss"]
})
export class FormCandidatosComponent implements OnInit {
  Jornada: any;

  FormularioCan = new FormGroup({
    NombreC: new FormControl("", [Validators.required]),
    Jornada: new FormControl("", [Validators.required]),
    Lema: new FormControl(""),
    Tarjeton: new FormControl("", [Validators.required]),
    Foto: new FormControl("", [Validators.required, requiredFileType("jpeg")])
  });

  constructor(
    private CandidatoService: CandidatosService,
    private extrasService: ExtrasService,
    private alertas: AlertasService
  ) {
    this.extrasService.ObtenerJornadas().subscribe(
      res => {
        this.Jornada = res;
      },
      err => console.log(err)
    );
  }

  ngOnInit(): void {}

  progress: number = 0;
  Progress: boolean = false;

  success = false;

  Crear() {
    this.success = false;
    this.Progress = true;
    markAllAsDirty(this.FormularioCan);
    this.CandidatoService.CrearCandidato(this.FormularioCan.value)
      .pipe(
        uploadProgress(progress => (this.progress = progress)),
        toResponseBody()
      )
      .subscribe(
        res => {
          if (res) {
            this.success = true;
            this.Progress = true;
            this.alertas.Alerta(res);
          }
        },
        err => this.alertas.Alerta(err.error)
      );
  }
}
