import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PermissionsService } from './services/permissions.service';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './components/tree/tree.component';
import { PermissionStore } from './store/permissions.store';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  standalone: true,
  imports: [CommonModule, TreeComponent],
  providers: [PermissionStore],
})
export class PermissionsComponent implements AfterViewChecked {
  constructor(
    private permissionsService: PermissionsService,
    private permissionStore: PermissionStore
  ) {}
  rootTree = this.permissionsService.rootTree;
  @ViewChild('console', { static: true }) console!: ElementRef;

  selectedPermission$ = this.permissionStore.selectedPermissions$;

  ngAfterViewChecked() {
    this.console.nativeElement.scrollTop =
      this.console.nativeElement.scrollHeight;
  }
}
