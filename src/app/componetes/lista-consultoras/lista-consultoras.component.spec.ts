import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConsultorasComponent } from './lista-consultoras.component';

describe('ListaConsultorasComponent', () => {
  let component: ListaConsultorasComponent;
  let fixture: ComponentFixture<ListaConsultorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaConsultorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaConsultorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
