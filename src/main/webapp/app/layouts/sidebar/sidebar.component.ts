import { Component } from '@angular/core';
import {LoginService} from "app/core/login/login.service";
import {JhiLanguageService} from "ng-jhipster";
import {SessionStorageService} from "ngx-webstorage";
import {AccountService} from "app/core/auth/account.service";
import {ProfileService} from "app/layouts/profiles/profile.service";
import {Router} from "@angular/router";
import {VERSION} from "app/app.constants";

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isNavbarCollapsed = true;
  version: string;

  constructor(
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
  }
  login(): void {
    this.loginService.login();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() : boolean {
   return this.accountService.isAuthenticated();
  }
}
