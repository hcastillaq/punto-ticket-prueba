import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConcertComponent } from './search-concert.component';

describe('SearchConcertComponent', () => {
  let component: SearchConcertComponent;
  let fixture: ComponentFixture<SearchConcertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchConcertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchConcertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
