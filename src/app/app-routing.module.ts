import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { ConversaComponent } from './componentes/conversa/conversa.component';
import { LoginComponent } from './componentes/login/login.component';
import { ListaConsultorasComponent } from './componetes/lista-consultoras/lista-consultoras.component';
import { ListaConversasComponent } from './componetes/lista-conversas/lista-conversas.component';
import { AuthGuardServiceService as AuthGuard } from './service/auth-guard-service.service';

const routes: Routes = [
  {
    path: "consultoras",
    component: ListaConsultorasComponent,
    canActivate: [AuthGuard]
  },
 {
  path: "chat/:id",
  component: ConversaComponent,
  canActivate: [AuthGuard]
 },
 {
  path: "",
  component: ListaConversasComponent,
  canActivate: [AuthGuard]
  
 },
 {
  path: "login",
  component: LoginComponent 
 },
 {
  path: "cadastro",
  component: CadastroComponent 
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
