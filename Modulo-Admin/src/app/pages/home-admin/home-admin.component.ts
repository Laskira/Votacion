import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/token.service";
import { routerTransition } from "src/app/material/router.animation";
import { PermisosService } from "src/app/services/permisos.service";

@Component({
  selector: "app-home-admin",
  templateUrl: "./home-admin.component.html",
  styleUrls: ["./home-admin.component.scss"],
  animations: [routerTransition]
})
export class HomeAdminComponent implements OnInit {
  NombreP: any = "";
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  mostrar: boolean = false;
  registrar: Array<any>;
  listar: Array<any>;

  constructor(public token: TokenService, private permisos: PermisosService) {
    this.permisos.Perfil().subscribe(res => {
      if (res) {
        //@ts-ignore
        this.NombreP = res.NombreP;

        //@ts-ignore
        if (res.Documento === "root") {
          this.registrar = [
            {
              Label: "Aprendiz",
              Icon: "account_circle",
              Router: "registrar/aprendiz"
            },
            {
              Label: "Candidato",
              Icon: "people",
              Router: "registrar/candidato"
            },
            { Label: "Usuario", Icon: "people", Router: "registrar/usuario" }
          ];

          this.listar = [
            {
              Label: "Aprendices",
              Icon: "account_circle",
              Router: "listar/aprendices"
            },
            {
              Label: "Candidatos",
              Icon: "people",
              Router: "listar/candidatos"
            },
            { Label: "Usuarios", Icon: "people", Router: "listar/usuarios" }
          ];
        } else {
          this.registrar = [
            {
              Label: "Aprendiz",
              Icon: "account_circle",
              Router: "registrar/aprendiz"
            },
            {
              Label: "Candidato",
              Icon: "people",
              Router: "registrar/candidato"
            }
          ];

          this.listar = [
            {
              Label: "Aprendices",
              Icon: "account_circle",
              Router: "listar/aprendices"
            },
            {
              Label: "Candidatos",
              Icon: "people",
              Router: "listar/candidatos"
            }
          ];
        }
      }
    });
  }

  ngOnInit(): void {}
}
