import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestArticleComponent } from './suggest-article.component';

describe('SuggestArticleComponent', () => {
  let component: SuggestArticleComponent;
  let fixture: ComponentFixture<SuggestArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
