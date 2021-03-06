import { Component, OnInit, Input } from '@angular/core';

//import for closing the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//import for bringing in API calls 
import { FetchApiDataService } from '../fetch-api-data.service';

//import for displaying notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
 
   @Input() userData = { Username: '', Password: ''};

   constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }
// This is the function responsible for sending the form inputs to the backend

/**
   * Sends request to API for jwt token and user data, then stores response in local storage.
   * App then routes to movie view and confirms login with snack bar message.
   * @returns snackbar message confirmation
   */
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result:{ token: string; user: { Username: string; }; }) => {
this.dialogRef.close();
console.log(result);
 localStorage.setItem('user', result.user.Username);
 localStorage.setItem('token', result.token);
      this.snackBar.open('User login succcesful!', 'OK',{
        duration:2000
      });
       this.router.navigate(['movies']);
     
 }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
    closeDialog(): void {
    this.dialogRef.close();
  }
}
