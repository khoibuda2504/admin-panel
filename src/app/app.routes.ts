import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PermissionsComponent } from './components/permissions/permissions.component';

export const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];
