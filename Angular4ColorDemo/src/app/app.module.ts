import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PreviewColorComponent } from './preview-color/preview-color.component';

import { GlobalConfigSettingsService } from "./global-config-settings.service";

@NgModule({
  declarations: [
    AppComponent,
    PreviewColorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GlobalConfigSettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
