import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { SocialLink } from '../../core/models/social-link.model';
import { SocialIconComponent } from '../../shared/social-icon/social-icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SocialIconComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  social$: Observable<SocialLink[]>;
  year = new Date().getFullYear();

  constructor(private portfolio: PortfolioService) {
    this.social$ = this.portfolio.getProfile().pipe(map((profile) => profile.social));
  }
}
