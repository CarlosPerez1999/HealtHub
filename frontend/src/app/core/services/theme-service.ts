import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageThemeKey = 'theme';
  isDarkMode = signal<boolean>(this.getInitialTheme());
  theme = computed(() => (this.isDarkMode() ? 'app-dark' : 'light'));

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  private applyTheme(isDark: boolean) {
    if (this.theme() === 'app-dark') document.documentElement.classList.add(this.theme());
    else document.documentElement.classList.remove('app-dark');
  }

  private getInitialTheme(): boolean {
    const storedTheme = localStorage.getItem(this.storageThemeKey);
    if (storedTheme === 'dark') return true;
    if (storedTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme() {
    this.isDarkMode.update((currentTheme) => !currentTheme);
    this.applyTheme(this.isDarkMode());
    localStorage.setItem(this.storageThemeKey, this.theme());
  }
}
