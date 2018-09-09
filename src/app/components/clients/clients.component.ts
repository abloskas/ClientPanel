import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    let obs = this.clientService.getClients();
    obs.subscribe(clients => {
      console.log("clients......", clients);
      console.log(clients[0].firstName);
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    const total = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);

    this.totalOwed = total;
  }
}
