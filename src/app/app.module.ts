import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LatestArticlesComponent } from './latest-articles/latest-articles.component';
import { PopularArticlesComponent } from './popular-articles/popular-articles.component';
import { CreatePostComponent } from './create-post/create-post.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import { StoreModule } from '@ngrx/store';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import {NzImageModule} from "ng-zorro-antd/image";
import { NavComponent } from './nav/nav.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ArticleCategoryComponent } from './article-category/article-category.component';
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { EmailSubscriptionComponent } from './email-subscription/email-subscription.component';
import { ShareComponent } from './share/share.component';
import { AboutAuthorComponent } from './about-author/about-author.component';
import { SuggestArticleComponent } from './suggest-article/suggest-article.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LatestArticlesComponent,
    PopularArticlesComponent,
    CreatePostComponent,
    ArticleComponent,
    HomeComponent,
    NavComponent,
    ListArticlesComponent,
    ArticleCategoryComponent,
    EmailSubscriptionComponent,
    ShareComponent,
    AboutAuthorComponent,
    SuggestArticleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzIconModule,
        NzButtonModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}, {}),
        NzImageModule,
        NzPaginationModule,
    ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
