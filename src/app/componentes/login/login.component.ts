import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteServiceService } from 'src/app/service/cliente-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb:FormBuilder, private service: ClienteServiceService, private router: Router) {
    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    
   }
   error=false;
  login() {
   if(this.form.valid) 
    this.service.login(this.form.value['email'], this.form.value['password'])  
    .subscribe((data: any) => {
      this.router.navigate(['']);
    }, _=> this.error = true);
    
  }

  ngOnInit(): void {
  }

}
