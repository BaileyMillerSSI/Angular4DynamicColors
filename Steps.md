# Setup Steps
1. Run `ng new Angular4ColorDemo`
2. Download Bootstrap 4 [CDN Link](https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css)
3. Save this file to `\Angular4ColorDemo\src\assets\css\bootstrap.min.css`
4. Add bootstrap to the styles for the Angular CLI\
5. Run `ng serve` to ensure that everything is working as intended. If all goes well your console output will be green all over.

# Adding preview components
1. Create a container inside of our `app.component.html` and then create a row
2. Run command `ng generate component PreviewColor --spec=false` *--spec=false is to help generate less files for smaller projects*
3. Inside of `preview-color.component.ts` change `app-preview-color` to `preview-color` *Simply a preference thing, I don't like the app- syntax*

# Setting up the Service
1. Run command `ng generate service GlobalConfigSettings --spec=false` to create our new service for all the magic
2. Add GlobalConfigSettingsService as a provider in `app.module.ts` *Remember to import it at the top of `app.module.ts`*
3. We're going to need an interface so lets create on inside of the `global-config-settings.service.ts` file for simplicity

## Creating a color type and enum constant
1. Create a class called `ColorType` inside of `global-config-settings.service.ts` that looks like this
```
export interface ColorType
{ //We can fall back to strings if we don't have an enum setup
  name: string;
  fontColor: string | Color;
  hoverFontColor: string | Color;
  disabledFontColor: string | Color;
  defaultColor: string | Color;
  hoverColor: string | Color;
  disabledColor: string | Color;
}
```
2. Now you're going to need this Color class however this comes in two parts. First this code
```
class Color
{ //We are not exporting this class we are doing this so it cannot be changed 
  White: string;
  //Add more here for better coding
}
```

Secondly this code, this allows for a const Colors to be imported and used throughout the application. It will also keep your code Type Safe by preventing changes to these colors. What we just did is like an enum for strings.
```
export const Colors: Color = {
  White: "#FFF"
};
```

## Returning to the service
1. We have our colors now we need to set them up
2. Create a new class called ColorSettings and this is the root of all our color settings setup
```
class ColorSettings
{ 
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
    this.success = _success ? _success : {} as ColorType; //Setup all our defaults here

    this.info = _info ? _info : {} as ColorType;

    this.warning = _warning ? _warning : {} as ColorType;

    this.danger = _danger ? _danger : {} as ColorType;
  }
}
```
3.Inside of `GlobalConfigSettingsService` we need to create a new public variable ColorSettings

## Adding our Style to the DOM
1. It took me awhile to decide how I wanted to do this step that is because the way I finally landed on isn't the Angular way
2. Go into our `app.component.ts` and we are going to setup code to inject our style into the DOM
3. This code isn't complex but is really going to be the most amount of code
4. We need an event to listen to for changes as well as ways of changing the color(s)
5. Now that we have everything setup and ready for usage we need to add all of our defaults and all of our class properties, this takes time and lots of copy and pasting
