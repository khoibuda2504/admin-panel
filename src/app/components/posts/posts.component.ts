import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostModalComponent } from '../add-post-modal/add-post-modal.component';
import { Post } from '../../types';
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
  editIndex: number | null = null;
  editContent: string | null = '';
  // editingItem
  searchTerm: string = '';
  showModal: boolean = false;
  posts$ = this.postStore.posts$;
  loading$ = this.postStore.loading$;
  error$ = this.postStore.error$;
  private searchTerms = new Subject<string>();
  constructor(private postStore: PostStore) {}
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
    this.searchTerms.next(this.searchTerm);
  }
  addPost(newPost: any): void {
    this.postStore.addPost(newPost);
  }
  editPost(post: Post): void {
    this.editIndex = post.id;
    this.editContent = post.body;
  }

  savePost(post: Post): void {
    if (!this.editIndex) return;
    const updatedPost = {
      ...post,
      body: this.editContent,
    };
    this.postStore.updatePost(updatedPost as Post);
    this.editIndex = null;
    this.editContent = '';
  }

  deletePost(id: number): void {
    this.postStore.deletePost(id);
  }
}
