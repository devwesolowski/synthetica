import {Component,OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-article-category',
  templateUrl: './article-category.component.html',
  styleUrls: ['./article-category.component.less']
})
export class ArticleCategoryComponent implements OnInit {
  // @Output() idChangeEvent = new EventEmitter<number>();

  categoryId: number;
  category: string;
  idToCategory = {
    1: 'Technology',
    2: 'Movies',
    3: 'Music',
    4: 'Games'
  };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('id'));
      this.category = this.idToCategory[this.categoryId] || '';
    });
  }

}
