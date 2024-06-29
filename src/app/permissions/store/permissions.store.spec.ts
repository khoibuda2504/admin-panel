import { TestBed } from '@angular/core/testing';
import { PermissionStore } from './permissions.store';

describe('PermissionStore', () => {
  let store: PermissionStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionStore],
    });
    store = TestBed.inject(PermissionStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with an empty array of permissions', () => {
    store.selectedPermissions$.subscribe((permissions) => {
      expect(permissions).toEqual([]);
    });
  });

  it('should add permission to the state', () => {
    const permissionToAdd = 'admin.user-management.create';

    store.addPermission(permissionToAdd);

    store.selectedPermissions$.subscribe((permissions) => {
      expect(permissions).toContain(permissionToAdd);
      expect(permissions.length).toBe(1);
    });
  });

  it('should handle multiple permissions being added', () => {
    const permissionsToAdd = ['admin.user-management.create', 'admin.roles.edit'];

    permissionsToAdd.forEach((permission) => store.addPermission(permission));

    store.selectedPermissions$.subscribe((permissions) => {
      expect(permissions.length).toBe(2);
      permissionsToAdd.forEach((perm) => {
        expect(permissions).toContain(perm);
      });
    });
  });
});
