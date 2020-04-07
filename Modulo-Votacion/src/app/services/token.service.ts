import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { VotarService } from './votar.service';
import { AlertasService } from './alertas.service';

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor(
    private router: Router,
    private votos: VotarService,
    private alertas: AlertasService
  ) {}

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
