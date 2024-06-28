// permissions.service.ts
import { Injectable } from '@angular/core';

interface PermissionNode {
  name: string;
  children: PermissionNode[];
  checked: boolean;
  parent?: PermissionNode; // Optional parent reference
}
@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private permissions: string[] = [
    'admin.user-management.create',
    'admin.user-management.edit',
    'admin.user-management.delete',
    'admin.user-management.read',
    'admin.roles.create',
    'admin.roles.edit',
    'admin.roles.delete',
    'admin.roles.read',
    'admin.messages.create',
    'admin.messages.edit',
    'admin.messages.delete',
    'admin.messages.read',
    'ai-service.translation.read',
    'ai-service.agents.read',
  ];

  buildTree(permissions: string[]): PermissionNode[] {
    const root: any = [];

    permissions.forEach((permission) => {
      const parts = permission.split('.');
      let currentLevel = root;
      parts.forEach((part, index) => {
        let existingNode = currentLevel.find((node: any) => node.name === part);

        if (!existingNode) {
          existingNode = { name: part, children: [], checked: true };
          currentLevel.push(existingNode);
        }

        if (index < parts.length - 1) {
          currentLevel = existingNode.children;
        }
      });
    });

    return root;
  }
  realTree = this.buildTree(this.permissions);
  onCheckboxChange(node: PermissionNode, event: any): void {
    const res: string[] = [];
    node.checked = event.target.checked;
    res.push(node.name);
    this.checkChildren(node, node.checked);
    this.checkParent(this.realTree);
  }
  checkChildren(node: PermissionNode, checked: boolean): void {
    if (node.children) {
      node.children.forEach((child) => {
        child.checked = checked;
        this.checkChildren(child, checked);
      });
    }
  }

  checkParent(nodes: PermissionNode[], parent?: PermissionNode): void {
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        node.checked = node.children.every((child) => child.checked);
        this.checkParent(node.children, node);
      }
    });
    if (parent) {
      parent.checked = parent.children.every((child) => child.checked);
    }
  }
}
