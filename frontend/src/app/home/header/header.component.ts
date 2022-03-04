import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
  }

  logout() {
    this._userService.logout();
    this._router.navigate(['/login']);
  }

}
