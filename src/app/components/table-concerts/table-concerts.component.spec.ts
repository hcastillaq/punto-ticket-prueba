import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConcertsComponent } from './table-concerts.component';

describe('TableConcertsComponent', () => {
  let component: TableConcertsComponent;
  let fixture: ComponentFixture<TableConcertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableConcertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableConcertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
