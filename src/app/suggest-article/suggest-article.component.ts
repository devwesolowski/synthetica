import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-suggest-article',
  templateUrl: './suggest-article.component.html',
  styleUrls: ['./suggest-article.component.less']
})
export class SuggestArticleComponent implements OnInit {
  articleThumbnail: string;
  articleTitle: string;
  newArticleId: number;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {
    this.articleService.getArticles(null, "id", 1).subscribe(
      articles => {
        this.articleThumbnail = articles[0].heroImage;
        this.articleTitle = articles[0].title;
        this.newArticleId = articles[0].id;
      }
    )
  }

}
