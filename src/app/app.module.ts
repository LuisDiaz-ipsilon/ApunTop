import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { VisorComponent } from './components/visor/visor.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GoogleBooksService } from './services/api/google-books.service';
import { HomeComponent } from './components/home/home.component';
import { CardsComponent } from './components/cards/cards.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, VisorComponent, LoadingComponent, CardsComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [ GoogleBooksService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
