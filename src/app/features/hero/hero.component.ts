import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { HeroContent } from '../../core/models/profile.model';
import { HeroVisualComponent } from './hero-visual/hero-visual.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeroVisualComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  hero$: Observable<HeroContent>;

  constructor(private portfolio: PortfolioService) {
    this.hero$ = this.portfolio.getProfile().pipe(map((profile) => profile.hero));
  }
}
