import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaConsultorasComponent } from './componetes/lista-consultoras/lista-consultoras.component';
import { Interceptor } from './service/interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './componentes/shared/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ConversaComponent } from './componentes/conversa/conversa.component';
import { CardComponent } from './componentes/shared/card/card.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ListaConversasComponent } from './componetes/lista-conversas/lista-conversas.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuardServiceService } from './service/auth-guard-service.service';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    ListaConsultorasComponent,
    HeaderComponent,
    ConversaComponent,
    CardComponent,
    ListaConversasComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    AuthGuardServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
