import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticleComponent} from "./article/article.component";
import {HomeComponent} from "./home/home.component";
import {ArticleCategoryComponent} from "./article-category/article-category.component";
import {CreatePostComponent} from "./create-post/create-post.component";

const routes: Routes = [
//   { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'category/:id', component: ArticleCategoryComponent},
  { path: 'create', component: CreatePostComponent}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
