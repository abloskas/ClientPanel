import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/Client";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { Router, Params } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show("You are logged out", {
      cssClass: "alert-success",
      timeout: 5000
    });
    this.router.navigate(["/login"]);
  }
}
