import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { Image } from 'primeng/image';
import { FloatLabel } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { ThemeService } from '../../core/services/theme-service';
@Component({
  selector: 'app-login',
  imports: [Button, InputText, ReactiveFormsModule, Image, FloatLabel, FluidModule],
  templateUrl: './login.html',
})
export class Login {
  themeService = inject(ThemeService);
}
