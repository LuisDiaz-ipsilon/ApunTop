import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../app/components/shared/navbar/navbar.component";
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { LoginPage } from './login/login.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  showNavbar: boolean; //esta variable nos apoya para ocultar el navbar

  constructor(
    private loginService: LoginService,
    private router: Router,

  ) {
    this.showNavbar=false;
  }

  setShowNavbar(show: boolean){
    this.showNavbar=show;
  }

  isShowNavbar(){
     return this.showNavbar;
  }

  onLogout() {
    this.loginService.logout();
    console.log("click")
    this.router.navigateByUrl('login');
  }
}
