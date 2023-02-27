import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * gets all movies from api
   * @returns all movie arrays in json
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * gets user's favorite movies
   * @returns favorite movies in json
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   * checks to see if movie is already in user's favorite movie list
   * @param _id
   * @returns boolean yes or no
   */
  isFav(_id: string): boolean {
    return this.favorites.includes(_id);
  }

  /**
   * adds favorite movie to user's favorite movie list
   * @param _id
   * @returns user's updated favorite movie list
   */
  addFav(_id: string): void {
    this.fetchApiData.addToFavorites(_id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been added to your favorites!', 'Ok', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * deletes favorite movie from user's favorite movie list
   * @param _id
   * @returns user's updated favorite movie list
   */
  delFav(_id: string): void {
    console.log(_id);
    this.fetchApiData.deleteFromFavorites(_id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * opens angular material card with movie title and description
   * @param title
   * @param description
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '450px',
    });
  }

  /**
   * opens angular material card with director's name, birth year and bio
   * @param name
   * @param bio
   * @param birth
   */
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Birth: birth,
        Bio: bio,
      },
      width: '450px',
    });
  }

  /**
   * opens angular material card with genre's name and description
   * @param name
   * @param description
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }
}
