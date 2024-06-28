import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PermissionsService } from 'app/services/permissions/permissions.service';
interface PermissionNode {
  name: string;
  children: PermissionNode[];
  checked: boolean;
  parent?: PermissionNode; // Optional parent reference
}
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
  constructor(private permissionsService: PermissionsService) {}
  onCheckboxChange(node: PermissionNode, event: any): void {
    this.permissionsService.onCheckboxChange(node, event);
  }
}
