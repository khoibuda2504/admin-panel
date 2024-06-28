import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPost, Post } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}?_limit=10`);
  }
  addPost(post: NewPost): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Post>(this.apiUrl, JSON.stringify(post), {
      headers,
    });
  }
  updatePost(post: Post): Observable<Post> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Post>(
      `${this.apiUrl}/${post.id}`,
      JSON.stringify(post),
      { headers }
    );
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/${id}`);
  }
}
