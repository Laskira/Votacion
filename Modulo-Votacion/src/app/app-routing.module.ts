import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { JornadaComponent } from "./pages/jornada/jornada.component";
import { VotosComponent } from "./pages/votos/votos.component";
import { VotosGuard } from "./guard/votos.guard";

const routes: Routes = [
  { path: "", component: HomeComponent, data: { state: 0 } },
  {
    path: "jornada",
    component: JornadaComponent,
    canActivate: [VotosGuard],
    data: { state: 1 }
  },
  {
    path: "votar/Diurna",
    component: VotosComponent,
    canActivate: [VotosGuard],
    data: { state: 2 }
  },
  {
    path: "votar/Nocturna",
    component: VotosComponent,
    canActivate: [VotosGuard],
    data: { state: 2 }
  },
  {
    path: "votar/fin-de-semana",
    component: VotosComponent,
    canActivate: [VotosGuard],
    data: { state: 2 }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
