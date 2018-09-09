import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";

import { Router, Params } from "@angular/router";

import { SettingsService } from '../../services/settings.service';
import {Settings} from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings

  constructor(private flashMessagesService: FlashMessagesService,
    private router: Router,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);

    this.flashMessagesService.show("Settings Saved", {
      cssClass: "alert-success",
      timeout: 5000
    });
  }

}
