import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VotarService } from "src/app/services/votar.service";
import { Router } from "@angular/router";
import { TokenService } from "src/app/services/token.service";
import { AlertasService } from "src/app/services/alertas.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  carga: boolean = false;
  myControl = new FormControl();
  createFormGroup() {
    return new FormGroup({
      Documento: new FormControl("", [
        Validators.required,
        Validators.maxLength(15)
      ])
    });
  }

  CedulaForm: FormGroup;

  constructor(
    private personas: VotarService,
    private router: Router,
    private token: TokenService,
    private alertas: AlertasService
  ) {
    this.CedulaForm = this.createFormGroup();
  }

  ngOnInit(): void {
    var input = document.getElementById("Documento");
    input.addEventListener("input", function() {
      //@ts-ignore
      if (this.value.length > 15) this.value = this.value.slice(0, 15);
    });
    if (this.token.loggedIn()) {
      this.router.navigate(["/jornada"]);
    }
  }

  buscar() {
    this.carga = true;
    this.personas.BuscarCedula(this.CedulaForm.value).subscribe(
      res => {
        if (res) {
          localStorage.setItem("token", res);
          this.router.navigate(["jornada"]);
          this.carga = false;
        }
      },
      err => {
        if (err) {
          this.carga = false;
          this.alertas.Alerta(err.error);
        }
      }
    );
  }
}
