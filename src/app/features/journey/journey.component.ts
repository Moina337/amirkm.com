import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Experience } from '../../core/models/experience.model';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey.component.html',
})
export class JourneyComponent {
  journey$: Observable<Experience[]>;
  experience$: Observable<Experience[]>;
  academicJourney$: Observable<Experience[]>;

  constructor(private portfolio: PortfolioService) {
    this.journey$ = this.portfolio.getJourney();
    this.experience$ = this.journey$.pipe(
      map((items) => items.filter((item) => item.category === 'experience')),
    );
    this.academicJourney$ = this.journey$.pipe(
      map((items) => items.filter((item) => item.category === 'academic')),
    );
  }
}
