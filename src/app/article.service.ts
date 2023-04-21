import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from "./interfaces/article";
import {catchError, map, tap, Observable, of, switchMap, filter} from "rxjs";
import {Category} from "./interfaces/category";
import {Author} from "./interfaces/author";
import {ArticleWithAuthor} from "./interfaces/articlewithauthor";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl: string = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  postArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/articles`, article, this.httpOptions)
      .pipe(
        catchError(this.handleError<Article>(`postArticle`))
      )
  }


  getArticleWithAuthor(articleId: number): Observable<ArticleWithAuthor> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${articleId}`, this.httpOptions).pipe(
      switchMap(article => {
        console.log(`ARTICLE: ${JSON.stringify(article)}`)
        const authorId = article.authorId;
        return this.http.get<Author>(`${this.apiUrl}/authors/${authorId}`, this.httpOptions).pipe(
          map(author => ({ ...article, author })),
          catchError(() => of(article))
        );
      }),
    );
  }


  getArticles(categoryId?: number, sort?: string, limit?: number): Observable<Article[]>{
    let url: string = `${this.apiUrl}/articles`;

    //TODO Organize/Refactor
    switch (true) {
      case sort === 'views' && categoryId != null && limit !=null:
        url += `?_sort=views&_order=desc&categoryId=${categoryId}&_limit=${limit}`
        break;
      case sort === 'id' && categoryId != null && limit !=null:
        url += `?_sort=id&_order=desc&categoryId=${categoryId}&_limit=${limit}`
        break;
      case sort === 'id' && categoryId != null:
        url += `?_sort=id&_order=desc&categoryId=${categoryId}`
        break;
      case categoryId != null && limit != null:
        url += `?categoryId=${categoryId}&_limit=${limit}`
        break;
      case sort === 'id' && limit != null:
        url += `?_sort=id&_order=desc&_limit=${limit}`
        break;
      case sort === 'views' && limit != null:
        url += `?_sort=views&_order=desc&_limit=${limit}`
        break;
      case sort === 'id':
        url += `?_sort=id&_order=desc`
        break;
      case sort === 'views':
        url += `?_sort=views&_order=desc`
        break;
      case categoryId != null:
        url += `?categoryId=${categoryId}`;
        break;
      case limit != null:
        url += `?_limit=${limit}`;
        break;
      default:
        break;
    }

    return this.http.get<Article[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Article[]>(`getArticles`, []))
      )
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, this.httpOptions)
      .pipe(
        catchError(this.handleError<Category[]>(`getCategories`, []))
      )
  }

  /** COURTESY OF GOOGLE *chefs kiss*
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
