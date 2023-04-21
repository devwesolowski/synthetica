import {Article} from "./article";
import {Author} from "./author";

export interface ArticleWithAuthor extends Article {
  author?: Author;
}
