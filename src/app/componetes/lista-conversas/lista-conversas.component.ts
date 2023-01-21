import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { PersonModel } from 'src/app/model/person.model';
import { ClienteServiceService } from 'src/app/service/cliente-service.service';

@Component({
  selector: 'app-lista-conversas',
  templateUrl: './lista-conversas.component.html',
  styleUrls: ['./lista-conversas.component.scss']
})
export class ListaConversasComponent implements OnInit {

  chats$: Observable<PersonModel[]> = of([]);
  loading = true;
  isMamae = false;
  constructor(private service: ClienteServiceService, private router: Router) { }

  abrirConversa(personModel: PersonModel) {
    this.service.setParceiro(personModel);
    this.router.navigate(['/chat', personModel.id]);
  }

  ngOnInit(): void {
    this.chats$ = this.service.chats()
    setTimeout( () => this.loading = false, 3000);
    this.service.getUserStorage().subscribe(user => this.isMamae = user?.mamae);
  }

}
