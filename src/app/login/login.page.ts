//Modificar el diseño del login agregando funcionalidades
//Importamos int
import { LoginService, LoginResponseData } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',// asignamos el tag de nuestro componente
  templateUrl: './login.page.html',//Ponemos la estructura de nuestro componente
  styleUrls: ['./login.page.scss'],//Cargamos los estilos que usará
})

export class LoginPage implements OnInit {//Exportamos la clase, implement

  //Declaramos una variable boleana
  isLoading: boolean = false;
  isLoginMode: boolean = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private appLogin: AppComponent
  ) { 

  }

  ngOnInit() {
  }



  onSubmit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    const email = form.value.email;
    const pass = form.value.password;
    this.authenticate(email, pass);

  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  showAlert(titulo: string, mensaje: string) {
    this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    }).then(alertEl => alertEl.present());
  }
  //Verificaciones
  authenticate(email: string, password: string) {
    this.isLoading = true;
    //this.loginService.login();
    this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Validando ...'
    })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<LoginResponseData>;
        if (this.isLoginMode) {
          authObs = this.loginService.login(email, password);
        }
        else {
          authObs = this.loginService.signup(email, password);
        }
        //this.loginService.signup(email, password).subscribe(response => {
        authObs.subscribe(response => {
          console.log(response);
          this.isLoading = false;
          this.appLogin.setShowNavbar(true);
          loadingEl.dismiss();
          this.router.navigateByUrl('home');
        },
          errorResponse => {
            this.isLoading = false;
            loadingEl.dismiss();
            const error = errorResponse.error.error.message;
            let mensaje = 'Acceso incorrecto !';
            switch (error) {
              case 'EMAIL_EXISTS': mensaje = 'Usuario ya existe !';
                break;
              case 'EMAIL_NOT_FOUND': mensaje = 'Usuario no existe !';
                break;
              case 'INVALID_PASSWORD': mensaje = 'Contraseña incorrecta !';
                break;
            }
            console.log(mensaje);
            this.showAlert('Error', mensaje);
          });

      });
  }
}