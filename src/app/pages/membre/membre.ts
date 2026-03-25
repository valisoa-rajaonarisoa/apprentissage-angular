import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ArticleService } from '../../services/articles/article-service';
import { Subscription } from 'rxjs';
import { ArticleType } from '../../models/article.model';

@Component({
  selector: 'app-membre',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './membre.html',
  styleUrl: './membre.css',
})
export class Membre implements OnInit, OnDestroy {
  //Inject l'api
  private articleService = inject(ArticleService);

  //subcption
  private subscription?: Subscription;

  //tableau signal qui contient la liste des articles
  articles = signal<ArticleType[]>([]);

  //chargement des datas?
  isLoading = signal(false);

  //error
  errorView = signal<string | null>(null);

  //chargement initial
  ngOnInit(): void {
    this.getAllArticle();
  }

  //fonction pour recuperer tout les articles
  getAllArticle() {
    this.isLoading.set(true);
    this.subscription = this.articleService.getAllArticles().subscribe({
      //okey
      next: (data) => {
        this.articles.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(" une erreur s'est produite lors de la récuperation des articles ", error);
        // error.set(error)
        if (error.status == 401) {
          console.log(' token manquante');
          this.errorView.set('Token expiré ou manquante');
        } else if (error.status == 403) {
          this.errorView.set('Pas autorisé role insuffisant');
        } else {
          this.errorView.set('Une erreur interne');
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
