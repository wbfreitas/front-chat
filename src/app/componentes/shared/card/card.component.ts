import { Component, Input, OnInit } from '@angular/core';
import { PersonModel } from 'src/app/model/person.model';

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
  constructor() { }

  ngOnInit(): void {
  }

}
