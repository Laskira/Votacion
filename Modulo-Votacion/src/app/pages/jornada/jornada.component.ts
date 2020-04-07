import { Component, OnInit } from "@angular/core";
import { VotarService } from "src/app/services/votar.service";
import { Router } from "@angular/router";

export interface Persona {
  Nombres: string;
  Documento: string;
  P_Apellido: string;
  S_Apellido: string;
}

@Component({
  selector: "app-jornada",
  templateUrl: "./jornada.component.html",
  styleUrls: ["./jornada.component.scss"]
})
export class JornadaComponent implements OnInit {
  carga: boolean = true;
  Persona: Persona = {
    Documento: "",
    Nombres: "",
    P_Apellido: "",
    S_Apellido: ""
  };
  Nombre: string;
  Saludo: string;

  constructor(private votar: VotarService, private router: Router) {
    this.votar.BuscarPersona().subscribe(res => {
      if (res) {
        this.carga = false;
        this.Persona = res;
      }
    });
  }

  ngOnInit(): void {}

  Votar(jornada: string) {
    this.router.navigate(["votar/" + jornada]);
  }
}
