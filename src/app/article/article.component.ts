import { Component, OnInit } from '@angular/core';
import {Article} from "../interfaces/article";
import {ArticleService} from "../article.service";
import {Author} from "../interfaces/author";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ArticleWithAuthor} from "../interfaces/articlewithauthor";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {
  loadedArticle: ArticleWithAuthor;
  fallback = 'data:image/webp;base64,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';
  srcAuthor: string;
  srcHero: string;
  currentArticleId: number;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentArticleId = +params['id'];
      this.getArticleAndAuthor(this.currentArticleId)
    });
  }

  getArticleAndAuthor(articleId: number): void {
    this.articleService.getArticleWithAuthor(articleId).subscribe(
      articleWithAuthor => {
        this.loadedArticle = articleWithAuthor;
        this.srcHero = articleWithAuthor.heroImage;
        if(articleWithAuthor.author){
          this.srcAuthor = articleWithAuthor.author.authorPicture;
        }
      }
    )
  }

  getDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString(); // Returns a string in the format 'MM/DD/YYYY'
  }
}
