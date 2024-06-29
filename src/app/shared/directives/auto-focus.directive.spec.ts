import { AutoFocusDirective } from './auto-focus.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';

@Component({
  template: `<textarea appAutoFocus></textarea>`,
})
class TestComponent {}

describe('AutoFocusDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let textareaEl: DebugElement;
  let renderer2: Renderer2;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AutoFocusDirective],
      providers: [Renderer2],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    textareaEl = fixture.debugElement.query(By.css('textarea'));
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2);
  });

  it('should create an instance', () => {
    const directive = new AutoFocusDirective(textareaEl, renderer2);
    expect(directive).toBeTruthy();
  });

  it('should focus the textarea when the component is initialized', (done) => {
    fixture.detectChanges();
    setTimeout(() => {
      expect(document.activeElement).toBe(textareaEl.nativeElement);
      done();
    }, 0);
  });
});
