import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword: string = "";
  newPassword: string = "";
  newPasswordRepeat: string = "";

  constructor(private _sharedService: SharedService,
    private _http: HttpService) { }

  ngOnInit(): void {
  }

  /**
   * 
   */
  saveChanges() {
    if (this.newPassword === this.newPasswordRepeat) {
      let passwordParam = {
        "user_name" : this._sharedService.loggedUser,
        "oldpassword": this.oldPassword,
        "newpassword": this.newPasswordRepeat
      }
      this._http.changePassword(passwordParam).subscribe((res: any) => {
        this._sharedService.openSnackBar(res.message);
        this.cancel();
      })
    } else {
      this._sharedService.openSnackBar("Password Mismatch!!");
    }
  }
  /**
   * 
   */
  cancel() {
    this.oldPassword = "";
    this.newPasswordRepeat = "";
    this.newPassword = "";
  }
}
