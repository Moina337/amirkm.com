import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Skill } from '../../core/models/skill.model';
import { SocialIconComponent } from '../../shared/social-icon/social-icon.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SocialIconComponent],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  // Duplicated once so the marquee track can loop seamlessly at -50%.
  loop$: Observable<Skill[]>;

  constructor(private portfolio: PortfolioService) {
    this.loop$ = this.portfolio.getSkills().pipe(map((skills) => [...skills, ...skills]));
  }
}
