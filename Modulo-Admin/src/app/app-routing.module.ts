import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RutasGuard } from "./guard/rutas.guard";

import { HomeAdminComponent } from "./pages/home-admin/home-admin.component";
import { FormCandidatosComponent } from "./pages//form-candidatos/form-candidatos.component";
import { FormPersonasComponent } from "./pages//form-personas/form-personas.component";
import { HomeAComponent } from "./pages//home-a/home-a.component";
import { ListarPersonasComponent } from "./pages//listar-personas/listar-personas.component";
import { ListarCandidatosComponent } from "./pages//listar-candidatos/listar-candidatos.component";
import { LoginAdminComponent } from "./pages//login-admin/login-admin.component";
import { FormUsuariosComponent } from './pages/form-usuarios/form-usuarios.component';
import { ListarUsuariosComponent } from './pages/listar-usuarios/listar-usuarios.component';

const routes: Routes = [
  { path: "", component: LoginAdminComponent, data: { state: 0 } },
  {
    path: "admin",
    component: HomeAdminComponent,
    canActivate: [RutasGuard],
    children: [
      { path: "", component: HomeAComponent, data: { state: 1 } },
      {
        path: "registrar/aprendiz",
        component: FormPersonasComponent,
        data: { state: 2 }
      },
      {
        path: "registrar/candidato",
        component: FormCandidatosComponent,
        data: { state: 3 }
      },
      {
        path: "registrar/usuario",
        component: FormUsuariosComponent,
        data: { state: 4 }
      },
      {
        path: "listar/aprendices",
        component: ListarPersonasComponent,
        data: { state: 5 }
      },
      {
        path: "listar/candidatos",
        component: ListarCandidatosComponent,
        data: { state: 6 }
      },
      {
        path: "listar/usuarios",
        component: ListarUsuariosComponent,
        data: { state: 6 }
      },
      { path: "**", redirectTo: "" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
