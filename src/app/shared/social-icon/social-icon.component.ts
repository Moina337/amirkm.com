import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img
      *ngIf="icon && icon !== 'email' && icon !== 'cv'; else customIcon"
      [src]="'https://cdn.simpleicons.org/' + icon"
      [alt]="icon"
      class="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9"
      loading="lazy"
    />

    <ng-template #customIcon>
      <svg
        *ngIf="icon === 'email'"
        viewBox="0 0 24 24"
        aria-hidden="true"
        class="h-8 w-8 shrink-0 md:h-9 md:w-9"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
        <path d="m5 7 7 6 7-6" />
      </svg>

      <svg
        *ngIf="icon === 'cv'"
        viewBox="0 0 24 24"
        aria-hidden="true"
        class="h-8 w-8 shrink-0 md:h-9 md:w-9"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path d="M7 3.5h7l5 5V18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" />
        <path d="M14 3.5V9h5" />
        <path d="M8.5 13h7M8.5 16h7" />
      </svg>
    </ng-template>
  `,
})
export class SocialIconComponent {
  @Input() icon: string = '';
}
