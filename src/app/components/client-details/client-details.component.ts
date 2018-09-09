import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/Client";
import { ClientService } from "../../services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";

import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //get id from the URL
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.getAClient(this.id);
    });
    //get the client
  }

  getAClient(id: string) {
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      console.log(this.id, this.client);
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.id, this.client);
    if (Error) {
      console.log("err...", Error);
    }
    this.flashMessagesService.show("Balance Updated!", {
      cssClass: "alert-success",
      timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm("Are you sure?")) {
      this.clientService.deleteClient(this.id, this.client);
      this.flashMessagesService.show("Client Deleted", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }
}
