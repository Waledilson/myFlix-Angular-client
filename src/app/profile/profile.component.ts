import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * gets user's information
   * @returns user's info including name, password, email and date of birth in json
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  /**
   * opens box with input fields for user to update their information
   */
  openEditUser(): void {
    this.dialog.open(EditUserComponent, {
      width: '450px',
    });
  }

  /**
   * deletes user's account
   * @returns nothing. upon deletion, the user is sent back to the welcome screen to either sign up or log in
   */
  deleteAccount(): void {
    if (confirm('Are you sure you want to permanently delete this account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account has successfully been deleted!', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
