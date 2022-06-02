import { Component, OnInit, Input } from '@angular/core';

//import for closing the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//import for bringing in API calls 
import { FetchApiDataService } from '../fetch-api-data.service';

//import for displaying notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result:{ token: string; user: { Username: string; }; }) => {
this.dialogRef.close();
console.log(result);
 localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      this.snackBar.open('User login succcesful!', 'OK',{
        duration:2000
      });
     
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
