import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {  LOCALE_ID } from '@angular/core';

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
import { BuscarComponent } from './components/buscar/buscar.component';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx";
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, VisorComponent, LoadingComponent, CardsComponent, BuscarComponent, ProfileComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [ SQLite,
    SQLitePorter, DocumentViewer, FileTransfer, Platform, File,
    GoogleBooksService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
