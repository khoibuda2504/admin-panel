import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DisappearDirective } from './disappear.directive';

@Component({
  template: `<div appDisappear>Test Content</div>`,
})
class TestComponent {}

describe('DisappearDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DisappearDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should make the element disappear after 2 seconds', fakeAsync(() => {
    const div = fixture.debugElement.query(
      By.directive(DisappearDirective)
    ).nativeElement;
    expect(div.style.display).not.toBe('none'); // Initially visible

    tick(2000); // Fast forward 2 seconds
    fixture.detectChanges(); // Trigger change detection

    expect(div.style.display).toBe('none'); // Should be hidden after 2 seconds
  }));
});
