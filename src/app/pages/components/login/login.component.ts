import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";

  constructor(private _sharedService: SharedService,
    private router: Router,
    private _http: HttpService,
    private _auth: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this._http.getLogin(this.userName, this.password).subscribe((res: any) => {
      if (res) {
        this._sharedService.setUserType(res.userType);
        this._auth.setToken(res.token);
        this._sharedService.username = this.userName;
        this._sharedService.loggedUser= this.userName;
        if (this._sharedService.userTypeValue === "accountant") {
          this.router.navigate(['/order']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    })
  }
}
