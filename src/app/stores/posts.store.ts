import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { PostsService } from '../services/posts/posts.service';
import { NewPost, Post } from '../types';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  editIdx: number | null;
  searchTerm: string;
}

@Injectable()
export class PostStore extends ComponentStore<PostState> {
  editIndex: number | null = null;
  editContent: string | null = '';
  constructor(private postService: PostsService) {
    super({
      posts: [],
      loading: false,
      error: null,
      editIdx: null,
      searchTerm: '',
    });
  }
  posts$ = this.select((state) => state.posts);
  loading$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);
  editIdx$ = this.select((state) => state.editIdx);

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

  setEditIdx = this.updater((state, editIdx: number | null) => ({
    ...state,
    editIdx,
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

  addPost = this.effect<NewPost>((post$) =>
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
              this.setEditIdx(null);
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
  searchPosts = this.effect<string>((searchTerm$) =>
    searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm) =>
        this.postService.getPosts().pipe(
          tap({
            next: (posts) => {
              const filterPosts = posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
              );
              this.setPosts(filterPosts);
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
