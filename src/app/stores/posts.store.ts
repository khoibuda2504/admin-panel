import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PostsService } from '../services/posts/posts.service';
import { Post } from '../types';
import { switchMap, tap } from 'rxjs/operators';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class PostStore extends ComponentStore<PostState> {
  constructor(private postService: PostsService) {
    super({ posts: [], loading: false, error: null });
  }

  posts$ = this.select((state) => state.posts);
  loading$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);

  setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
  }));

  setPosts = this.updater((state, posts: Post[]) => ({
    ...state,
    posts,
  }));

  getPosts = this.effect<void>((trigger$) =>
    trigger$.pipe(
      tap(() => {
        this.setLoading(true);
        this.setError(null);
      }),
      switchMap(() =>
        this.postService.getPosts().pipe(
          tap({
            next: (posts) => {
              this.setPosts(posts);
              this.setLoading(false);
            },
            error: (err) => {
              this.setError(err.message);
              this.setLoading(false);
            },
          })
        )
      )
    )
  );

  addPost = this.effect<Post>((post$) =>
    post$.pipe(
      switchMap((post) =>
        this.postService.addPost(post).pipe(
          tap({
            next: (newPost) => {
              this.setPosts([...this.get().posts, newPost]);
            },
            error: (err) => {
              this.setError(err.message);
            },
          })
        )
      )
    )
  );

  updatePost = this.effect<Post>((post$) =>
    post$.pipe(
      switchMap((post) =>
        this.postService.updatePost(post).pipe(
          tap({
            next: (updatedPost) => {
              const posts = this.get().posts.map((i) =>
                i.id === updatedPost.id ? updatedPost : i
              );
              this.setPosts(posts);
            },
            error: (err) => {
              this.setError(err.message);
            },
          })
        )
      )
    )
  );

  deletePost = this.effect<number>((id$) =>
    id$.pipe(
      switchMap((id) =>
        this.postService.deletePost(id).pipe(
          tap({
            next: () => {
              const posts = this.get().posts.filter((post) => post.id !== id);
              this.setPosts(posts);
            },
            error: (err) => {
              this.setError(err.message);
            },
          })
        )
      )
    )
  );
}
