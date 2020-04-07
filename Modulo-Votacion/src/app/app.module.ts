import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './services/token-interceptor.service';

// Modulo Votos
import { HomeComponent } from './pages/home/home.component';
import { JornadaComponent } from './pages/jornada/jornada.component';
import { VotosComponent } from './pages/votos/votos.component';
import { SpinnerComponent } from './pages/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JornadaComponent,
    VotosComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
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
export class AppModule { }
