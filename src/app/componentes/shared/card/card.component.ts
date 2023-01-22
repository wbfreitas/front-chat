import { Component, Input, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/model/person.model';
import { ClienteServiceService } from 'src/app/service/cliente-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  person: PersonModel = {} as PersonModel;
  @Input()
  voltar: boolean = false;
  mamae = false;
  constructor(private service: ClienteServiceService) { }

  ngOnInit(): void {
    this.service.getUserStorage().subscribe(user => this.mamae =user.mamae);
  }

}
