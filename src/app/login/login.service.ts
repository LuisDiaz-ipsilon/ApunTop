import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from './usuario.model';
import { User } from "./user.model";


import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


export interface LoginResponseData {// exportamos esta interface
    kind: string;
    idToken: string,
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    private _usuarioLoggeado = true;
    private _usuario = new BehaviorSubject<Usuario>(null);

    private storage: SQLiteObject;
    songsList = new BehaviorSubject([]);
    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    get usuarioLoggeado() {
        //return this._usuarioLoggeado;
        return this._usuario.asObservable().pipe(map(user => {
            if (user) {
                return !!user.token;
            }
            else {
                return false;
            }
        }));
    }

    constructor(
        private platform: Platform,
        private sqlite: SQLite,
        private http: HttpClient,
        private sqlPorter: SQLitePorter,
    ) {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'positronx_db.db',
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                    this.getFakeData();
                });
        });
    }
    
    //funciones requeridas por SQLite
    dbState() {
        return this.isDbReady.asObservable();
    }

    getFakeData() {
        this.http.get(
            'assets/dump.sql',
            { responseType: 'text' }
        ).subscribe(data => {
            this.sqlPorter.importSqlToDb(this.storage, data)
                .then(_ => {
                    this.getUsers();
                    this.isDbReady.next(true);
                })
                .catch(error => console.error(error));
        });
    }

    getUsers() {
        return this.storage.executeSql('SELECT * FROM users', []).then(res => {
            let items: User[] = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        id: res.rows.item(i).id,
                        correo: res.rows.item(i).correo,
                        pass: res.rows.item(i).pass
                    });
                }
            }
            this.songsList.next(items);
        });
    }

    addUser(id, correo, pass) {
        let data = [id, correo, pass];
        return this.storage.executeSql('INSERT INTO users (id, correo, pass) VALUES (?, ?, ?)', data)
        .then(res => {
          this.getUsers();
        });
    }

    deleteUser(id) {
        return this.storage.executeSql('DELETE FROM users WHERE id = ?', [id])
        .then(_ => {
          this.getUsers();
        });
    }
    
    //funciones requeridas para funcionamiento de firebase
    logout() {
        //this._usuarioLoggeado = false;
        this._usuario.next(null);
        this.deleteUser(0);
    }

    signup(email: string, password: string) {
        return this.http.post<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            { email: email, password: password, returnSecureToken: true }
        );
    }

    private setUserDate(userData: LoginResponseData) {//guardamos el usuario logeado
        const expTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
        this._usuario.next(new Usuario(userData.localId, userData.email, userData.idToken, expTime));
    }
    login(email: string, password: string) {
        return this.http.post<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            { email: email, password: password, returnSecureToken: true }
        ).pipe(tap(this.setUserDate.bind(this)));
    }
}