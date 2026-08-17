import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { AboutContent } from '../../core/models/profile.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  about$: Observable<AboutContent>;

  constructor(private portfolio: PortfolioService) {
    this.about$ = this.portfolio.getProfile().pipe(map((profile) => profile.about));
  }
}
