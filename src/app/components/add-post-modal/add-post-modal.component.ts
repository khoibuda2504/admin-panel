import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-post-modal',
  standalone: true,
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css'],
  imports: [ReactiveFormsModule],
})
export class AddPostModalComponent {
  @Output() addPost = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  postForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required]], // Add email validation
    });
  }
  handleAddPost(): void {
    const newPost = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
    };

    this.addPost.emit(newPost);
    this.postForm.reset();
    this.closeModal.emit();
  }
}
