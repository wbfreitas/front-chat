import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConversasComponent } from './lista-conversas.component';

describe('ListaConversasComponent', () => {
  let component: ListaConversasComponent;
  let fixture: ComponentFixture<ListaConversasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaConversasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaConversasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
