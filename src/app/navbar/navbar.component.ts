import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public router: Router, public dialog: MatDialog) {}

  /**
   * logs user out. clears local storage holding user's credentials
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  /**
   * opens movie dialog box that i dont think i am actually using anymore
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
