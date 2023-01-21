import { Component, OnInit } from '@angular/core';
import { ClienteServiceService } from 'src/app/service/cliente-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showSair = false;
  isMamae = true;
  constructor(private service: ClienteServiceService) { }

  ngOnInit(): void {
    this.showSair = !!localStorage.getItem('token');
    this.service.isLogoff().subscribe(logoff => this.showSair = logoff);
    this.service.getUserStorage().subscribe(user => {
      this.isMamae = user?.mamae || !user.nome;
    });
  }

  logoff() {
    this.service.logoff();
    this.isMamae = true;
  }

}
