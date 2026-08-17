import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Interest } from '../../core/models/interest.model';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interests.component.html',
})
export class InterestsComponent {
  interests$: Observable<Interest[]>;

  constructor(private portfolio: PortfolioService) {
    this.interests$ = this.portfolio.getInterests();
  }
}
