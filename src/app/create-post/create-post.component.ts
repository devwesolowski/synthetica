import { Component } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../article.service";
import {Article} from "../interfaces/article";
import {User} from "../interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.less']
})
export class CreatePostComponent {

  validateForm: UntypedFormGroup;
  article: Article;

  //TODO: Replaced by getCategories api call
  categoryMap = {
    Technology: 1,
    Movies: 2,
    Music: 3,
    Games: 4,
  };
  currentUser: User = {
    isAdmin: true,
    id: 1,
    authorId: 1
  }


  //TODO: add validator for url? -- add max length logic for body
  constructor(private fb: UntypedFormBuilder, private articleService: ArticleService, private router: Router) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      heroImage: ['', [Validators.required]],
      body: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  //reset form logic cleans up validateForm
  resetForm(e?: MouseEvent): void {
    if(e) {
      e.preventDefault();
    }
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  //TODO logic for submit to return to home category page with new articles
  submitForm(): void {
    this.submitArticle()
  }

  buildArticle(): void {
    const currentUnixTimestamp: number = Math.floor(new Date().getTime() / 1000);
    const categoryId = this.categoryMap[this.validateForm.value.category] || null;

    this.article = {
      authorId: this.currentUser.id,
      categoryId: categoryId,
      title: this.validateForm.value.title.trim(),
      heroImage: this.validateForm.value.heroImage.trim(),
      body: this.validateForm.value.body.trim(),
      views: 0,
      dateAdded: currentUnixTimestamp,
      dateUpdated: currentUnixTimestamp
    }
  }

  //Build Article With Values
  submitArticle() {
    this.buildArticle()
    this.articleService.postArticle(this.article).subscribe({
      next: (article: Article) => {
        console.log(`created article just finely like: ${JSON.stringify(article)}`);
        //TODO: SUCCESS MESSAGE OUTPUT TO APP COMPONENT
        this.router.navigate(['/article', article.id]);
      },
      error: (error: any) => {
        console.log(`Error creating article: ${error}`);
        //TODO: ERROR Popup
      },
      complete: () => {
      }
    });
  }
}
