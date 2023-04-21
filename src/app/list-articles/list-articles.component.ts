import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Article} from "../interfaces/article";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.less']
})
export class ListArticlesComponent implements OnInit, OnChanges {
  articles: Article[] = [];
  displayedArticles: Article[] = [];
  totalArticles: number;
  pageIndex = 1;
  pageSize = 9;
  @Input() categoryId: number;

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId']) {
      this.getArticles(this.categoryId);
    }
  }

  ngOnInit() {
  }

  updateDisplayedArticles(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedArticles = this.articles.slice(startIndex, endIndex);
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayedArticles();
  }

  private getArticles(categoryId: number) {
    this.articleService.getArticles(categoryId, 'id').subscribe(
      articles => {
        this.articles = articles;
        this.totalArticles = this.articles.length;
        this.updateDisplayedArticles();
      }
    )
  }
}
