import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../features/navbar/navbar.component';
import { FooterComponent } from '../../features/footer/footer.component';
import { WhatsappButtonComponent } from '../../features/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-whatsapp-button></app-whatsapp-button>
  `,
})
export class MainLayoutComponent {}
