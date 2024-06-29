import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs/operators';

interface PermissionState {
  permissions: string[];
}

@Injectable()
export class PermissionStore extends ComponentStore<PermissionState> {
  constructor() {
    super({
      permissions: [],
    });
  }
  selectedPermissions$ = this.select((state) => state.permissions);

  setPermission = this.updater((state, permissions: string[]) => ({
    ...state,
    permissions,
  }));

  addPermission = this.effect<string>((permission$) =>
    permission$.pipe(
      tap({
        next: (permission) => {
          const permissions = this.get().permissions;
          this.setPermission([...permissions, permission]);
        },
      })
    )
  );
}
