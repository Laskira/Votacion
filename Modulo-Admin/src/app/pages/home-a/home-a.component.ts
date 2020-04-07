import { Component, OnInit } from "@angular/core";
import { ExtrasService } from "src/app/services/extras.service";

@Component({
  selector: "app-home-a",
  templateUrl: "./home-a.component.html",
  styleUrls: ["./home-a.component.scss"]
})
export class HomeAComponent implements OnInit {
  Votos: any;
  Personas: any;
  Porcentaje: any;
  carga: boolean = true;

  Diurna: any[];
  Nocturna: any[];
  FinDeSemana: any[];

  images = [];

  // options
  showYAxis = true;
  showLegend = true;

  options = {
    decimalPlaces: 2
  };

  constructor(private ExtrasService: ExtrasService) {
    this.DatosCargar();
  }

  ngOnInit(): void {}

  DatosCargar() {
    this.carga = true
    this.ExtrasService.ObtenerContador().subscribe((data: {}) => {
      // @ts-ignore
      this.Votos = data.countVotos;
      // @ts-ignore
      this.Porcentaje = data.Porcentaje;
      // @ts-ignore
      this.Personas = data.countPersonas;
      if (data) {
        this.carga = false;
      }
    });

    this.ExtrasService.ObtenerReportes().subscribe(
      res => {
        //@ts-ignore
        this.Diurna = res.Diurna;
        //@ts-ignore
        this.Nocturna = res.Nocturna;
        //@ts-ignore
        this.FinDeSemana = res.FinDeSemana;

        this.images = [
          //@ts-ignore
          { Jornada: "Diurna", item: "0", cont: res.CountVotosDiurna },
          //@ts-ignore
          { Jornada: "Nocturna", item: "1", cont: res.CountVotosNocturna },

          {
            Jornada: "Fin de Semana",
            item: "2",
            //@ts-ignore
            cont: res.CountVotosFinDeSemana
          }
        ];
      },
      err => console.log(err)
    );
  }
}
