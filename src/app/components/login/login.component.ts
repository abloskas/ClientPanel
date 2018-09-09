import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(["/"]);
      }
    });
  }

  onSubmit() {
    this.authService
      .login(this.email, this.password)
      .then(res => {
        console.log("successsssss");
        this.flashMessage.show("You are logged in!", {
          cssClass: "alert-success",
          timeout: 5000
        });
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log("errorrrrrrrr");
        this.flashMessage.show(err.message, {
          cssClass: "alert-danger",
          timeout: 5000
        });
      });
  }
}
