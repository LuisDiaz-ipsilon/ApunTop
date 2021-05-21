import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../app/components/shared/navbar/navbar.component"; 
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
  private loginService: LoginService,
  private router: Router
  ) {}
  onLogout(){
  this.loginService.logout();
  this.router.navigateByUrl('/login');
  }
 }
 