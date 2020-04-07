import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenService } from "../services/token.service";
import { VotarService } from "../services/votar.service";
import { AlertasService } from "../services/alertas.service";

@Injectable({
  providedIn: "root"
})
export class VotosGuard implements CanActivate {
  constructor(
    private token: TokenService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.token.loggedIn()) {
      return true;
    }

    this.router.navigate(["/"]);
    return false;
  }
}
