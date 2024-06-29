import { DisappearDirective } from './disappear.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appDisappear [delay]="delay">Test Element</div>`
})
class TestComponent {
  delay = 1000;
}

describe('DisappearDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DisappearDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.directive(DisappearDirective));
  });

  it('should create an instance', () => {
    const directive = new DisappearDirective(debugElement);
    expect(directive).toBeTruthy();
  });

  it('should disappear after the specified delay', fakeAsync(() => {
    fixture.detectChanges();
    expect(debugElement.nativeElement.style.display).not.toBe('none');

    tick(component.delay);
    fixture.detectChanges();
    
    expect(debugElement.nativeElement.style.display).toBe('none');
  }));

  it('should disappear after a custom delay', fakeAsync(() => {
    component.delay = 2000;
    fixture.detectChanges();
    expect(debugElement.nativeElement.style.display).not.toBe('none');

    tick(component.delay);
    fixture.detectChanges();
    
    expect(debugElement.nativeElement.style.display).toBe('none');
  }));
});
