import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { Observable } from "rxjs";
import { Client } from "../models/Client";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection("clients", ref =>
      ref.orderBy("lastName", "asc")
    );
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.clients;
  }

  addClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          const id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  updateClient(id: string, client: Client) {
    this.clientDoc = this.afs.doc(`clients/${id}`);
    this.clientDoc.update(client);
    console.log("from service..", client.id);
  }

  deleteClient(id: string, client: Client) {
    this.clientDoc = this.afs.doc(`clients/${id}`);
    this.clientDoc.delete();
  }
}
