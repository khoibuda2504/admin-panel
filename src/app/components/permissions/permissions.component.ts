import { Component, Input, OnInit } from '@angular/core';
import { PermissionsService } from '../../services/permissions/permissions.service';
import { CommonModule } from '@angular/common';
interface PermissionNode {
  name: string;
  children: PermissionNode[];
  checked?: boolean;
  parent?: PermissionNode;
}
@Component({
  selector: 'app-permissions',
  standalone: true,
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  imports: [CommonModule],
})
export class PermissionsComponent implements OnInit {
  @Input() tree: PermissionNode[] = [
    {
      name: 'admin',
      children: [
        {
          name: 'user-management',
          children: [
            {
              name: 'create',
              children: [],
            },
            {
              name: 'edit',
              children: [],
            },
            {
              name: 'delete',
              children: [],
            },
            {
              name: 'read',
              children: [],
            },
          ],
        },
        {
          name: 'roles',
          children: [
            {
              name: 'create',
              children: [],
            },
            {
              name: 'edit',
              children: [],
            },
            {
              name: 'delete',
              children: [],
            },
            {
              name: 'read',
              children: [],
            },
          ],
        },
        {
          name: 'messages',
          children: [
            {
              name: 'create',
              children: [],
            },
            {
              name: 'edit',
              children: [],
            },
            {
              name: 'delete',
              children: [],
            },
            {
              name: 'read',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'ai-service',
      children: [
        {
          name: 'translation',
          children: [
            {
              name: 'read',
              children: [],
            },
          ],
        },
        {
          name: 'agents',
          children: [
            {
              name: 'read',
              children: [],
            },
            {
              name: 'delete',
              children: [],
            },
          ],
        },
      ],
    },
  ];
  constructor() {}
  ngOnInit(): void {}

  onCheckboxChange(node: PermissionNode, event: any) {
    node.checked = event.target.checked;
    this.checkUncheckChildren(node, node.checked);
    this.updateParentNodeCheckState(node);
  }

  checkUncheckChildren(node: PermissionNode, checked: boolean = false) {
    if (node.children) {
      node.children.forEach((child) => {
        child.checked = checked;
        this.checkUncheckChildren(child, checked);
      });
    }
  }

  updateParentNodeCheckState(node: PermissionNode) {
    const areAllSiblingsChecked = node.children.every((child) => child.checked);
    if (node.checked !== areAllSiblingsChecked) {
      node.checked = areAllSiblingsChecked;
    }
    // if (node.parent) {
    //   this.updateParentNodeCheckState(node.parent);
    // }
  }
}
