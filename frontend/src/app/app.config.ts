import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import { definePreset, palette } from '@primeuix/themes';

const primaryPaletteDark = palette('#a31d56') as Record<string, any>;
const primaryPaletteLight = palette('#249e97') as Record<string, any>;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    providePrimeNG({
      theme: {
        preset: definePreset(Lara, {
          semantic: {
            colorScheme: {
              light: {
                primary: {
                  ...(primaryPaletteLight || {}),
                },
              },
              dark: {
                primary: {
                  ...(primaryPaletteDark || {}),
                },
              },
            },
          },
        }),
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),
  ],
};
