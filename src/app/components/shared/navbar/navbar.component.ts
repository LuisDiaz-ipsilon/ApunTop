import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router ) { }

  ngOnInit() {}

  openBuscar(){
    this.router.navigateByUrl('buscador');
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }

}
