import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { VotarService } from "src/app/services/votar.service";
import { FormGroup, FormControl } from "@angular/forms";
import { TokenService } from "src/app/services/token.service";
import { AlertasService, mensaje } from "src/app/services/alertas.service";
import { ApiService } from "src/app/services/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-votos",
  templateUrl: "./votos.component.html",
  styleUrls: ["./votos.component.scss"]
})
export class VotosComponent implements OnInit {
  carga: boolean = true;
  candidatos: any;
  ruta: string;
  Jornada: string = "";
  tipo: number = 0;
  url: string = "";

  FormVotar = new FormGroup({
    IdCandidato: new FormControl("")
  });

  constructor(
    private votar: VotarService,
    private token: TokenService,
    private router: Router,
    private alertas: AlertasService,
    public api: ApiService
  ) {}

  ngOnInit(): void {
    this.ruta = this.router.routerState.snapshot.url;
    this.ruta = this.ruta.replace("/votar/", "");

    if (this.ruta == "Diurna") {
      this.Jornada = this.ruta;
      this.tipo = 1;
    } else if (this.ruta == "fin-de-semana") {
      this.Jornada = "Fin de Semana";
      this.tipo = 3;
    } else {
      this.Jornada = this.ruta;
      this.tipo = 2;
    }

    this.votar.ObtenerCandidatosJornada(this.ruta).subscribe(res => {
      if (res) {
        this.carga = false;
        this.candidatos = res;
      }
    });
  }

  Votar(candidato) {
    this.FormVotar.get("IdCandidato").setValue(candidato._id);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Deseas votar por " + candidato.NombreC + " #" + candidato.Targeton,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00e676",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, votar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        this.carga = true;
        this.votar.Votar(this.FormVotar.value).subscribe(
          res => {
            if (res) {
              this.carga = false;
              this.alertas.AlertaSinCerrar(res);
              setTimeout(() => {
                this.token.logout();
              }, 1000);
            }
          },
          err => this.alertas.AlertaSinCerrar(err.error)
        );
      }
    });
  }
}
