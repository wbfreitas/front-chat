import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonModel } from 'src/app/model/person.model';
import { ClienteServiceService } from 'src/app/service/cliente-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  error = false;
  sucesso = false;
  logado = false;
  userLogado: PersonModel = {} as PersonModel;
  constructor(private fb:FormBuilder, private service: ClienteServiceService) { 
    this.form = this.getFom(null);
    this.service.getUserStorage().subscribe(user => {
      this.form = this.getFom(user)
      this.logado = true;
      this.userLogado = user;
    });
  }

  ngOnInit(): void {
  }

  getFom(user: PersonModel | null) {
    return this.fb.group({
      email: [user?.email, Validators.required],
      senha: ['', Validators.required],
      nome: [user?.nome,Validators.required],
      sobrenome: [user?.sobrenome,Validators.required],
      consultora: [!user?.mamae],
    });
  }

  cadastrar() {
    if(!this.form.valid) return;
    
    const form = this.form.value;
    const body = {
      ...form,
      mamae: !form['consultora'] 
      };

      if(this.logado) {
        body.id = this.userLogado.id;
        body.mamae = this.userLogado.mamae;
      }
    this.service.cadastrarUsuario(
     body 
    ).subscribe(user => {
        this.sucesso = true
        this.service.udateUser(user);
    }, _=> this.error = false);
  }

  atualizar() {
  }

}
