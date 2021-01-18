import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/data/dummyData';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = Users;
  newUserMode: boolean = false;
  selectedUserID: string = "";
  userDetails: any = {
    "username": ""
  };

  userName: string = "";
  userType: string = "";
  userAge: string = "";
  userMail: string = "";
  userConfirmPassword: string = "";
  userNewPassword: string = "";
  userTypes: any = [];

  constructor(private _http: HttpService,
    private _sharedService: SharedService,
    private router: Router) {
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
      console.log("Succcessfully Updated", res)
    },
      (err) => {
        console.log("ERROR:", err);
      });
  }
  /**
   * 
   */
  updateChanges() {
    if (this.newUserMode) {
      if (this.userNewPassword !== this.userConfirmPassword) {
        alert("Password Mismatch!!!");
        return;
      }
      let newUser: any = {
        "userName": this.userName,
        "userType": this.userType,
        "user_email_id": this.userMail,
        "userAge": this.userAge,
        "userPassword": ""
      }
      this._http.addUSer(newUser).subscribe((res) => {
        console.log("New User Added", res);
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
    this.users = JSON.parse(JSON.stringify(Users));
  }
  /**
   * 
   */
  cancel() {
    this.userName = this.userType = this.userAge = this.userMail =
      this.userNewPassword = this.userConfirmPassword = "";

    this._sharedService.openSnackBar("Cancelled");
  }
  /**
   * 
   */
  onSelectUser(user: any) {
    let userId = user["userId"];
    this.selectedUserID = userId;
    this.newUserMode = false;
    this._http.getUSer(userId).subscribe((res: any) => {
      // this.userName = res["userName"];
      // this.userType = res["userType"];
      // this.userAge = res["userAge"];
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
    this._http.deleteUser(this.selectedUserID).subscribe((res: any) => { 
      this._sharedService.openSnackBar("User Deleted");
    })
  }
}
