import { PostsService } from './posts.service';
import { Post } from '../posts.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PostsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostsService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    postService = new PostsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  it('should fetch posts', () => {
    const dummyPosts: Post[] = [
      { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
    ];
    httpClientSpy.get.and.returnValue(of(dummyPosts));
    postService.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });
  });

  it('should add post', () => {
    const dummyPost: Post = { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 };
    httpClientSpy.post.and.returnValue(of(dummyPost));
    postService.addPost(dummyPost).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });
  });
  
  it('should update post', () => {
    const dummyPost: Post = { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 };
    httpClientSpy.put.and.returnValue(of(dummyPost));
    postService.updatePost(dummyPost).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });
  });
  
  it('should delete post', () => {
    const dummyPost: Post = { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 };
    httpClientSpy.delete.and.returnValue(of(dummyPost));
    postService.deletePost(dummyPost.id).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });
  });
  
});
