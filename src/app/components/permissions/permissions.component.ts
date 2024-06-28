// permissions-tree.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { PermissionsService } from '../../services/permissions/permissions.service';
import { CommonModule } from '@angular/common';
import { TreeComponent } from '../tree/tree.component';

interface PermissionNode {
  name: string;
  children: PermissionNode[];
  checked?: boolean;
}

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  standalone: true,
  imports: [CommonModule, TreeComponent],
})
export class PermissionsComponent implements OnInit {
  constructor(private permissionsService: PermissionsService) {}
  tree = this.permissionsService.realTree;
  ngOnInit(): void {}
}
