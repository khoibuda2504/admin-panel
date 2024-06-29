import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PermissionsService } from 'app/permissions/services/permissions.service';
import { PermissionStore } from 'app/permissions/store/permissions.store';
import { PermissionNode } from 'app/permissions/permissions.model';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css',
})
export class TreeComponent {
  @Input() tree: PermissionNode[] = [];

  private _name: string = '';
  @Input() set parentName(name: string) {
    this._name = name + '.';
  }
  get parentName(): string {
    return this._name;
  }

  constructor(
    private permissionsService: PermissionsService,
    private permissionStore: PermissionStore
  ) {}

  onCheckboxChange(node: PermissionNode, event: Event): void {
    const inputEle = event.target as HTMLInputElement;
    node.checked = inputEle.checked;
    this.permissionStore.addPermission(
      `You have ${inputEle.checked ? 'selected' : 'unselected'} ${
        inputEle.id
      } permission`
    );
    this.permissionsService.checkChildren(node, node.checked);
    this.permissionsService.checkParent(this.permissionsService.rootTree);
  }
}
