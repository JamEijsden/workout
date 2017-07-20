import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchemaDialogComponent } from './create-schema-dialog.component';

describe('CreateSchemaDialogComponent', () => {
  let component: CreateSchemaDialogComponent;
  let fixture: ComponentFixture<CreateSchemaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchemaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchemaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
