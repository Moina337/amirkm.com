import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Isolated hero visual. Today it renders a placeholder image; swap the
 * `image` input (see src/app/data/portfolio.data.ts) for a real photo,
 * illustration, screenshot, or replace the template entirely with a
 * different visual (terminal, animation, custom component) without
 * touching the Hero component that hosts it.
 */
@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-visual.component.html',
})
export class HeroVisualComponent {
  @Input() image!: string;
  @Input() alt = 'Portrait ou visuel de présentation';
  imageFailed = false;
}
