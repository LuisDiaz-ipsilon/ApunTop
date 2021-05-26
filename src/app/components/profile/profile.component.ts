import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/login/user.model';
import { LoginPage } from '../../login/login.page';
import { LoginService } from '../../login/login.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user;
  photo;

  constructor(private logInfo: LoginService, public photoService: PhotoService) { 
    this.logInfo.getUsers()
      .then(data => this.user=data); //obtengo los datos del usuario que actualmente maneja el app    
    
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.photo=this.photoService.getPhoto();
  }



  ngOnInit() {}

}
