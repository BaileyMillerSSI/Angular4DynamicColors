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
      defaultColor: "green",
      defaultSecondary: "green",
      fontColor: Colors.White
    } as ColorType; //Setup all our defaults here

    this.info = _info ? _info : {} as ColorType;

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
              .success{
                color: ${this.success.fontColor};
                background-color:${this.success.defaultColor};
                border-color: ${this.success.defaultSecondary}
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
  White: "#FFF"
};

class Color
{ 
  White: string;
  //Add more here for better coding
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
