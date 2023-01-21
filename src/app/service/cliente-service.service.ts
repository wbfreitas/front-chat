import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { EventSourcePolyfill } from 'ng-event-source';
import { PersonModel } from '../model/person.model';
import { ChatModel } from 'src/app/model/chat.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  private parceiro$ = new BehaviorSubject<PersonModel>({} as PersonModel);
  private logoff$ = new BehaviorSubject<boolean>(false);
  private userStorage$ = new BehaviorSubject<PersonModel>({} as PersonModel);
  constructor(private http: HttpClient, private zone: NgZone, private router: Router) { }

  getConsultoras(): Observable<PersonModel[]> {
    return this.http.get<PersonModel[]>('http://localhost:8081/clientes/api/v1/consultoras-de-amamentacao');
  }

  getDecodedAccessToken(): any {
    try {
      return jwt_decode(localStorage.getItem('token') || '');
    } catch(Error) {
      return null;
    }
  }

  setLogoff() {
    this.logoff$.next(!!localStorage.getItem('token'));
  }

  isLogoff() {
    return this.logoff$.asObservable();
  }

  udateUser(user: PersonModel) {
    return this.userStorage$.next(user);
  }

  logoff() {
    localStorage.clear();
    this.setLogoff();
    this.router.navigate(['login']);
  }

  getUserStorage() {
    return this.userStorage$.asObservable();
  }

  getParceiro() {
    return this.parceiro$.asObservable();
  }

  setParceiro(personModel: PersonModel) {
    this.parceiro$.next(personModel);
  }

  login(email: string, senha: string) {
    return this.http.post('http://localhost:8081/clientes/api/v1/login', {email, senha})
  .pipe(tap(r => this.setToken(r)));
  }

  getUser() {
    return this.http.get<PersonModel>("http://localhost:8081/clientes/api/v1")
    .pipe(tap(user => this.userStorage$.next(user)));
  }

  cadastrarUsuario(usuario: PersonModel) {
    return this.http.post<PersonModel>("http://localhost:8081/clientes/api/v1", usuario)
  }

  
  chat(idParceiro: string): Observable<ChatModel[]> {
    return this
    .event('http://localhost:8080/chat/mensagens-parceiros/' + idParceiro);
  }

  sendMensage(message: string, receiver_id: string): Observable<ChatModel> {
      return this.http
      .post<ChatModel>('http://localhost:8080/chat', {message, receiver_id});
  }

  deleteMensage(id: string) {
    return this.http.delete('http://localhost:8080/chat/' + id);
  }

  chats(): Observable<PersonModel[]> {
    return this
    .event('http://localhost:8080/chat');
  }

  event(url: string): Observable<any> {
    return Observable.create((observer: any)=> {
      var source = new EventSourcePolyfill(url, {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      });
      source.onmessage = (event: any) =>  {
        this.zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      }

      source.onerror = (event: any) => {
        this.zone.run(() => {
          observer.error(event)
        })
      }
    });
  }

  private setToken(result: any) {
    localStorage.setItem('token', 'Bearer ' + result.token);
    localStorage.setItem('idCliente', this.getDecodedAccessToken()?.sub)
    this.setLogoff();
  }
}
