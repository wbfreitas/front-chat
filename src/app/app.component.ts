import { Component } from '@angular/core';
import { ClienteServiceService } from './service/cliente-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Consultoria na Amamentação';
  constructor(private service: ClienteServiceService) {
    this.service.setLogoff();
    if(localStorage.getItem('token'))
      this.service.getUser().subscribe();
  }
}


