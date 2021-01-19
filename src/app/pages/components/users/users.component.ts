import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/data/dummyData';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { ConfirmDialogModel, ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[]=[];
  newUserMode: boolean = false;
  userDetails: string =""
  userName: string = "";
  userType: string = "";
  userAge: string = "";
  userMail: string = "";
  userConfirmPassword: string = "";
  userNewPassword: string = "";
  userTypes: any = [];
  selectedUserID: string = "";
  constructor(private _http: HttpService,
    private _sharedService: SharedService,
    private router: Router,
    public dialog: MatDialog) {
    router.events.subscribe((val) => {
      this.newUserMode = false;
    });
  }

  ngOnInit(): void {
    this._http.getAllUSers().subscribe((res: any) => {
      this.users = JSON.parse(JSON.stringify(res));
    },
      (err) => {
        console.log("ERROR:", err);
      });

    this._http.getUserTypes().subscribe((res: any) => {
      this.userTypes = { ...res };
    })
    //To Do: Remove
    this.userTypes = ["agent", "admin", "shipping", "packing", "accountant"];
  }

  /**
   * 
   */
  getUserDetails() {
    this._http.getUSer("").subscribe((res: any) => {
      this.userDetails = JSON.parse(JSON.stringify(res));
    },
      (err) => {
        console.log("ERROR:", err);
      });
  }
  /**
   * 
   */
  editUser() {
    let param = {
      username: this._sharedService.loggedUser,
      action_user: this.userName,
      usertype: this.userType
    }
    this._http.editUSer(param).subscribe((res) => {
      console.log("Succcessfully Updated", res);
      this.getUserData();
      this._sharedService.openSnackBar("User role updated succesfully!!");

    },
      (err) => {
        console.log("ERROR:", err);
      });
  }
  /**
   * 
   */
  getUserData():void{
    this._http.getAllUSers().subscribe((res: any) => {
      this.users = JSON.parse(JSON.stringify(res));
    },
      (err) => {
        console.log("ERROR:", err);
      })
  }
  /**
   * 
   */
  updateChanges() {
    if (this.newUserMode) {
      if (this.userNewPassword !== this.userConfirmPassword) {
        this._sharedService.openSnackBar("Password Mismatch!!!")
        return;
      }
      let newUser: any = {
        "username": this.userName,
        "usertype": this.userType,
        "details": this.userDetails,
        "password": this.userConfirmPassword
      }
      this._http.addUSer(newUser).subscribe((res) => {
        console.log("New User Added", res);
        this._sharedService.openSnackBar("New User Added!!");
        this.cancel();
        this.getUserData();
      }, (err) => {
        console.log("Error: ", err);
      })
    } else {
      this.editUser();
    }
  }
  /**
   * 
   */
  addNewUser() {
    this.newUserMode = true;
    this.cancel();
    //this.users = JSON.parse(JSON.stringify(Users));
  }
  /**
   * 
   */
  cancel() {
    this.userName = this.userType = this.userDetails =
      this.userNewPassword = this.userConfirmPassword = "";
  }
  /**
   * 
   */
  onSelectUser(user: any) {
    let userId = user["user_id"];
    this.selectedUserID = userId;
    this.newUserMode = false;
    this._http.getUSer(userId).subscribe((res: any) => {
      this.userName = res["username"];
       this.userType = res["usertype"];
       this.userDetails = res["details"];
      // this.userMail = res["userMail"];
    })
    this.userName = user["userName"];
    this.userType = user["userType"];
    this.userAge = user["userAge"];
    this.userMail = user["userMail"];
  }

  /**
   * 
   */
  DeleteUser() {
    const message = `Are you sure you want to delete this User?`;

    const dialogData = new ConfirmDialogModel("Confirm Delete", message);

    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      maxWidth: "500px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe
    this._http.deleteUser(this.selectedUserID).subscribe((res: any) => { 
      this._sharedService.openSnackBar("User Deleted");
    })
  }
}
