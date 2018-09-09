import { Component, OnInit } from "@angular/core";

import { Client } from "../../models/Client";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { Router, ActivatedRoute, Params } from "@angular/router";

import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"]
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    //get id from the URL
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getAClient(this.id);
    });
    //get the client
  }

  getAClient(id: string) {
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.id, this.client);
    });
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessagesService.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 5000
      });
    } else {
      //add id to client
      value.id = this.id;
      //update client
      this.clientService.updateClient(value.id, value);
      this.flashMessagesService.show("Client Updated!", {
        cssClass: "alert-success",
        timeout: 5000
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
