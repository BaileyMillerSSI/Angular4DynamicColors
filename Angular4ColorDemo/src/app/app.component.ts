import { Component } from '@angular/core';

import { GlobalConfigSettingsService,ColorType } from "./global-config-settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  Classes: string[] = ["success", "info", "warning", "danger"];
  DisabledGlobal: boolean = false;
  NextState: string = "Disable All"
  constructor(private Config: GlobalConfigSettingsService)
  { 
    document.body.appendChild(Config.ColorSettings.GenerateStyle());
    Config.ColorSettings.ColorChangeEvent.subscribe(() =>
    { 
      document.body.replaceChild(Config.ColorSettings.GenerateStyle(), document.getElementById(Config.ColorSettings.StyleId));
    });
  }

  ToggleState(): void
  {
    if (this.DisabledGlobal)
    {
      this.DisabledGlobal = false;
      this.NextState = "Disable All";
    } else
    { 
      this.DisabledGlobal = true;
      this.NextState = "Enable All";
    }
  }  


}
