import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddPostModalComponent } from './add-post-modal.component';

describe('AddPostModalComponent', () => {
  let component: AddPostModalComponent;
  let fixture: ComponentFixture<AddPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule,AddPostModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize postForm with empty fields', () => {
    expect(component.postForm).toBeDefined();
    expect(component?.postForm?.get('title')?.value).toEqual('');
    expect(component?.postForm?.get('body')?.value).toEqual('');
  });

  it('should emit addPost and closeModal events when handleAddPost is called', () => {
    const emitSpyAddPost = spyOn(component.addPost, 'emit');
    const emitSpyCloseModal = spyOn(component.closeModal, 'emit');

    component.postForm.setValue({ title: 'Test Title', body: 'Test Body' });

    component.handleAddPost();

    expect(emitSpyAddPost).toHaveBeenCalledOnceWith({
      title: 'Test Title',
      body: 'Test Body',
    });
    expect(emitSpyCloseModal).toHaveBeenCalled();

    expect(component?.postForm?.get('title')?.value).toEqual(null);
    expect(component?.postForm?.get('body')?.value).toEqual(null);
  });
});
