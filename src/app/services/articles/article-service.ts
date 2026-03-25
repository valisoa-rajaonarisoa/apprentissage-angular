import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticleType } from '../../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  //inject le httpClient
  private http = inject(HttpClient);

  private BASE_URL = 'http://localhost:5000';

  //getArticle
  getAllArticles() {
    return this.http.get<ArticleType[]>(`${this.BASE_URL}/articles`);
  }
}
