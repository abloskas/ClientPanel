import { Component, OnInit, ViewChild } from "@angular/core";
import { ClientService } from "../../services/client.service";

import { FlashMessagesService } from "angular2-flash-messages";

import { Client } from "../../models/Client";

import { Router } from "@angular/router";

import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  disableBalanceOnAdd: boolean;
  // disabled on adding a user due to having it as a settings option

  @ViewChild("clientForm")
  form: any;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
   }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      //show error if not valid
      this.flashMessagesService.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 5000
      });
    } else {
      //add new client if valid
      this.clientService.addClient(value);

      //show success message
      this.flashMessagesService.show("New Client Added!", {
        cssClass: "alert-success",
        timeout: 5000
      });
      // want to redirect to dash
      this.router.navigate(["/"]);
    }
  }
}
