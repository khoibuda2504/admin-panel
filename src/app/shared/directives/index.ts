import { NgModule } from '@angular/core';
import { DisappearDirective } from './disappear.directive';
import { AutoFocusDirective } from './auto-focus.directive';
@NgModule({
  declarations: [DisappearDirective, AutoFocusDirective],
  exports: [DisappearDirective, AutoFocusDirective],
})
export class ShareModule {}
