

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


  //TODO:Check the url pathway if written correctly
  //TODO:Check if the appConfig is imported correctly
  //TODO:TEst the api calls in user service