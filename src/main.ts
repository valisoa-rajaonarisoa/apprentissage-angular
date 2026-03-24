import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/components/smart/app';
import { appConfig } from './app/components/smart/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
