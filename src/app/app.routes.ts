import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PermissionsComponent } from './permissions/permissions.component';

export const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];
