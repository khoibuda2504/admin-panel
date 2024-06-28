import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostModalComponent } from '../add-post-modal/add-post-modal.component';
import { NewPost, Post } from '../../types';
import { PostStore } from '../../stores/posts.store';
import { CommonModule } from '@angular/common';
import { ShareDirectiveModule } from '../../directives/share.module';
@Component({
  selector: 'app-posts',
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AddPostModalComponent,
    CommonModule,
    ShareDirectiveModule,
  ],
  providers: [PostStore],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  posts$ = this.postStore.posts$;
  loading$ = this.postStore.loading$;
  error$ = this.postStore.error$;
  editIdx$ = this.postStore.editIdx$;
  private searchTerms = new Subject<string>();
  constructor(private postStore: PostStore) {}
  editContent = '';
  ngOnInit(): void {
    this.postStore.getPosts();
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.search(term))
      )
      .subscribe((results) => {
        this.posts = results;
      });
  }
  search(term: string): any[] {
    if (!term.trim()) {
      return this.posts;
    }

    return this.posts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase())
    );
  }
  searchPosts(): void {
    this.postStore.searchPosts(this.searchTerm);
  }
  addPost(newPost: NewPost): void {
    this.postStore.addPost(newPost);
  }
  editPost(post: Post): void {
    this.editContent = post.body;
    this.postStore.setEditIdx(post.id);
  }

  savePost(post: Post): void {
    const updatedPost = {
      ...post,
      body: this.editContent,
    };
    this.postStore.updatePost(updatedPost as Post);
  }

  deletePost(id: number): void {
    this.postStore.deletePost(id);
  }
  handleKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.postStore.setEditIdx(null);
    }
  }
}
