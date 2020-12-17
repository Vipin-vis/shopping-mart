import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";

  constructor(private _sharedService: SharedService,private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    //To-do: integrate api
    if (this.userName === "admin" &&
      this.password === "admin") {
        this._sharedService.setUserType("admin");
        this.router.navigate(['/home']);
    }
  }
}
