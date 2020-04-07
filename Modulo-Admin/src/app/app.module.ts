import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CountUpModule } from "ngx-countup";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CarouselDirective } from './material/carosel.directive';

// Modulo Admin
import { FormPersonasComponent } from "./pages/form-personas/form-personas.component";
import { FormCandidatosComponent } from "./pages/form-candidatos/form-candidatos.component";
import { HomeAComponent } from "./pages/home-a/home-a.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { HomeAdminComponent } from "./pages/home-admin/home-admin.component";
import { ListarCandidatosComponent } from "./pages/listar-candidatos/listar-candidatos.component";
import { ListarPersonasComponent } from "./pages/listar-personas/listar-personas.component";
import { LoginAdminComponent } from "./pages/login-admin/login-admin.component";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormUsuariosComponent } from './pages/form-usuarios/form-usuarios.component';
import { ListarUsuariosComponent } from './pages/listar-usuarios/listar-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPersonasComponent,
    FormCandidatosComponent,
    HomeAComponent,
    FileUploadComponent,
    ProgressComponent,
    HomeAdminComponent,
    ListarCandidatosComponent,
    ListarPersonasComponent,
    LoginAdminComponent,
    SpinnerComponent,
    FormUsuariosComponent,
    ListarUsuariosComponent,
    CarouselDirective
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CountUpModule,
    NgxChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
