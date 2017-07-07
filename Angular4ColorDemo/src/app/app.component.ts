import { Component } from '@angular/core';

import { GlobalConfigSettingsService,ColorType } from "./global-config-settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  constructor(private Config: GlobalConfigSettingsService)
  { 
    document.body.appendChild(Config.ColorSettings.GenerateStyle());
    Config.ColorSettings.ColorChangeEvent.subscribe(() =>
    { 
      document.body.replaceChild(Config.ColorSettings.GenerateStyle(), document.getElementById(Config.ColorSettings.StyleId));
    });
  }
}
