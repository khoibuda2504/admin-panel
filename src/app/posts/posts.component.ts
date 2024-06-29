import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPostModalComponent } from './components/add-post-modal/add-post-modal.component';
import { NewPost, Post } from "./posts.model"
import { PostStore } from './store/posts.store';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../shared/directives';
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
    ShareModule,
  ],
  providers: [PostStore],
})
export class PostsComponent implements OnInit {
  showModal: boolean = false;
  editContent = '';

  filteredPosts$ = this.postStore.filteredPosts$;
  loading$ = this.postStore.loading$;
  error$ = this.postStore.error$;
  editIdx$ = this.postStore.editIdx$;

  constructor(private postStore: PostStore) {}

  ngOnInit(): void {
    this.postStore.getPosts();
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.postStore.searchPosts(searchTerm);
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
