import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonModel } from 'src/app/model/person.model';
import { ClienteServiceService } from 'src/app/service/cliente-service.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-consultoras',
  templateUrl: './lista-consultoras.component.html',
  styleUrls: ['./lista-consultoras.component.scss']
})
export class ListaConsultorasComponent implements OnInit {

  consultoras$: Observable<PersonModel[]> = of(
    [ ] as PersonModel[]
  ); 
  constructor(private clienteService: ClienteServiceService, private router: Router) { }

  ngOnInit(): void {
    this.consultoras$ = this.clienteService.getConsultoras();
  }

  abrirConversa(personModel: PersonModel) {
    this.clienteService.setParceiro(personModel);
    this.router.navigate(['/chat', personModel.id]);
  }

}
