import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { HttpClient } from '@angular/common/http';
import { PostsService } from './services/posts.service';

describe('PostsComponent', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let postService: PostsService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    postService = new PostsService(httpClientSpy);
  });

  it('should create', () => {
    expect(1).toBe(1);
  });
});
