import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalConfigSettingsService {

  public ColorSettings: ColorSettings = new ColorSettings();  
  
  constructor()
  { 
    
  }

}


class ColorSettings
{ 
  ColorChangeEvent: EventEmitter<null> = new EventEmitter();
  StyleId: string = "DynamicStyle"
  success: ColorType;
  info: ColorType;
  warning: ColorType;
  danger: ColorType;  

  constructor(_success?: ColorType,
    _info?: ColorType,
    _warning?: ColorType,
    _danger?: ColorType
  ) //variableName?: Type means that these are optional params and you'll see why in a second
  {
    //We did this in case we want to pass params in at start time however for the start we are going to use defaults by checking for null params
    this.success = _success ? _success : {
      name: "success",
      defaultColor: Colors.Success_Back,
      defaultSecondary: Colors.Success_Back,
      fontColor: Colors.White,
      hoverFontColor: Colors.White,
      disabledFontColor: Colors.White,
      hoverColor: Colors.Success_Hover,
      hoverSecondary: Colors.Success_Hover_Alt,
      disabledColor: Colors.Success_Back,
      disabledSecondary: Colors.Success_Back
    } as ColorType; //Setup all our defaults here

    this.info = _info ? _info : {
      name: "info",
      fontColor: Colors.White,
      hoverFontColor: Colors.White,
      disabledFontColor: Colors.White,
      defaultColor: Colors.Info_Back,
      defaultSecondary: Colors.Info_Back,
      disabledColor: Colors.Info_Back,
      disabledSecondary: Colors.Info_Back,
      hoverColor: Colors.Info_Hover,
      hoverSecondary: Colors.Info_Hover_Alt
    } as ColorType;

    this.warning = _warning ? _warning : {} as ColorType;

    this.danger = _danger ? _danger : {} as ColorType;
  }

  private BroadCastChange()
  { 
    this.ColorChangeEvent.emit();
  }
  
  ChangeColor(color: ColorType): void
  { 
    this[color.name] = color;
    this.BroadCastChange();
  }

  ChangeColors(...colors: ColorType[]): void
  { 
    colors.forEach(element => {
      this[element.name] = element
    });

    this.BroadCastChange();
  }

  GenerateColorSettings(): string
  { 
    return  `
              .btn-success{
                color: ${this.success.fontColor};
                background-color:${this.success.defaultColor};
                border-color: ${this.success.defaultSecondary};
              }
              .btn-success:hover{
                color: ${this.success.hoverFontColor};
                background-color: ${this.success.hoverColor};
                border-color: ${this.success.hoverSecondary};
              }
              .btn-success:disabled{
                color:${this.success.disabledFontColor};
                background-color: ${this.success.disabledColor};
                border-color: ${this.success.disabledSecondary};
              }
            `;
  }

  GenerateStyle(): HTMLStyleElement
  { 
    var style = document.createElement("style");
    style.id = this.StyleId;
    style.innerHTML = this.GenerateColorSettings();
    return style;
  }
}  

export const Colors: Color = {
  White: "#FFF",
  Success_Back: "#5cb85c",
  Success_Hover: "#449d44",
  Success_Hover_Alt: "#419641",

  Info_Back: "#5bc0de",
  Info_Hover: "#31b0d5",
  Info_Hover_Alt: "#2aabd2"
};

class Color
{ 
  White: string;
  Success_Back: string;
  Success_Hover: string;
  Success_Hover_Alt: string;


  Info_Back: string;
  Info_Hover: string;
  Info_Hover_Alt: string;

  //Add more here for more fun
}

export interface ColorType
{ //We can fall back to strings if we don't have an enum setup
  name: string;
  fontColor: string | Color;
  hoverFontColor: string | Color;
  disabledFontColor: string | Color;
  defaultColor: string | Color;
  defaultSecondary: string | Color;
  hoverColor: string | Color;
  hoverSecondary: string | Color;
  disabledColor: string | Color;
  disabledSecondary: string | Color;
}
