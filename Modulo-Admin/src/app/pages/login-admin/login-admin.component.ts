import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PermisosService } from "src/app/services/permisos.service";
import { TokenService } from "src/app/services/token.service";
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: "app-login-admin",
  templateUrl: "./login-admin.component.html",
  styleUrls: ["./login-admin.component.scss"]
})
export class LoginAdminComponent implements OnInit {
  hide: boolean = true;

  FormuLogin = new FormGroup({
    Documento: new FormControl("", [Validators.required, Validators.minLength(4)]),
    Password: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(
    private permisosService: PermisosService,
    private router: Router,
    private alertas: AlertasService ,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    if(this.token.getToken()) {
      this.router.navigate(['/admin'])
    }
  }

  login() {
    this.permisosService.Acceder(this.FormuLogin.value).subscribe(
      res => {
        if (res) {
          //@ts-ignore
          this.alertas.AlertaSuccess(res.alerta)
          //@ts-ignore
          console.log(res.mensaje)
          //@ts-ignore
          localStorage.setItem("token", res.token);
          this.router.navigate(["admin/"]);
        }
      },
      err => {
        this.alertas.Alerta(err.error);
      }
    );
  }
}
