import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ArticleService} from "../article.service";
import {Article} from "../interfaces/article";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-popular-articles',
  templateUrl: './popular-articles.component.html',
  styleUrls: ['./popular-articles.component.less']
})
export class PopularArticlesComponent implements OnInit, OnChanges {
  articles?: Article[];
  mainArticle: Article;
  sideArticles: Article[] = [];
  dataLoaded: boolean = false;
  @Input() categoryId: number;


  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
  }

  //TODO: Catch with Activated Route Instead?
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId']) {
      this.getPopularArticles();
    }
    }

  //TODO: Logic to grab and sort articles based on popularity AND DATE
  ngOnInit(): void {
    this.getPopularArticles()
  }

  getPopularArticles(){
    this.articleService.getArticles(this.categoryId, 'views', 3).subscribe(
      articles => {
        this.articles = articles;
        this.mainArticle = this.articles[0];
        this.sideArticles = [];
        this.sideArticles.push(...this.articles.slice(1, 3));
        this.dataLoaded = true;
      }
    );
  }

}
