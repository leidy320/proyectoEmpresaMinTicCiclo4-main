import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesUsuarioComponent } from './mensajes-usuario.component';

describe('MensajesUsuarioComponent', () => {
  let component: MensajesUsuarioComponent;
  let fixture: ComponentFixture<MensajesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
