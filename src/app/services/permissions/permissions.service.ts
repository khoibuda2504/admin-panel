import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private permissions = [
    'admin.user-management.create',
    'admin.user-management.edit',
    'admin.settings'
  ];
  constructor() { }
  getPermissions(): string[] {
    return this.permissions;
  }
}
