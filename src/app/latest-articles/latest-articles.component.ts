import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../interfaces/category";
import {ArticleService} from "../article.service";
import {Article} from "../interfaces/article";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-latest-articles',
  templateUrl: './latest-articles.component.html',
  styleUrls: ['./latest-articles.component.less']
})
export class LatestArticlesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  categories?: Category[] = [];
  articles?: Article[] = [];
  articlesByCategory? = {};

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    //First GETS all categories to render each card.
    this.articleService.getCategories().subscribe(
      categories => {
        this.categories = categories
        this.getCategoryArticles();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //Runs through a loop the length of categories, to run a GET request on each category for LATEST 3 articles (by id)
  //Then runs an inner loop to push those to an object array holding articles by their categoryId for easy iteration
  getCategoryArticles(): void {
    for (let i = 1; i <= this.categories.length; i++) {
      this.subscription = this.articleService.getArticles(i, 'id', 3).subscribe({
        next: (articles: Article[]) => {
          if (!this.articlesByCategory[i]) {
            this.articlesByCategory[i] = [];
          }
          for (let article of articles) {
            this.articlesByCategory[i].push(article);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
        }
      });
    }
  }


}
