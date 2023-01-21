import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ChatModel } from 'src/app/model/chat.model';
import { PersonModel } from 'src/app/model/person.model';
import { ClienteServiceService } from 'src/app/service/cliente-service.service';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.scss']
})
export class ConversaComponent implements OnInit {

  chats$: Observable<ChatModel[]> | null  = null;
  idLogado = localStorage.getItem('idCliente');
  idParceiro: string | undefined;
  loading = true;
  person =  {
  } as PersonModel;

  value = '';
  constructor(private activatedRoute: ActivatedRoute, private service: ClienteServiceService) {
    this.activatedRoute.params.subscribe(p => {
      this.idParceiro = p['id'];
    });
  }


  ngOnInit(): void {
    setTimeout( () => this.loading = false, 3500);
    if(this.idParceiro) {
      this.chats$ = this.service.chat(this.idParceiro);
      this.service.getParceiro().subscribe(p => this.person = p);
    }
    
  }

  delete(id: string) {
    this.loading = true;
    setTimeout( () => this.loading = false, 3500);
    this.service.deleteMensage(id).subscribe();
  }

  sendMsg() {
    if(this.value.length < 1) return;
    this.service.sendMensage(this.value, this.idParceiro || '')
    .subscribe(c => {
      this.value = '';
      this.loading = true;
    setTimeout( () => this.loading = false, 3000);
    });
  }

}
