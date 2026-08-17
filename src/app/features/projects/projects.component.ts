import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/project.model';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapper') wrapperRef?: ElementRef<HTMLElement>;
  @ViewChild('track') trackRef?: ElementRef<HTMLElement>;

  projects: Project[] = [];
  activeIndex = 0;

  private rafId: number | null = null;

  constructor(private portfolio: PortfolioService) {
    this.portfolio.getProjects().subscribe((projects) => (this.projects = projects));
  }

  ngAfterViewInit(): void {
    this.updateWrapperHeight();
    // Recalcule une fois que les polices/images sont chargées et la mise en page stabilisée.
    setTimeout(() => this.updateWrapperHeight(), 300);
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateWrapperHeight();
    this.onScroll();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.rafId) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.render();
    });
  }

  private updateWrapperHeight() {
    if (!this.wrapperRef || this.projects.length === 0) return;
    // Une hauteur de viewport de scroll par projet garde un rythme cohérent
    // avec la distance que l'utilisateur doit parcourir pour révéler chacun.
    const vh = window.innerHeight;
    this.wrapperRef.nativeElement.style.height = `${this.projects.length * vh}px`;
  }

  private render() {
    if (!this.wrapperRef || !this.trackRef || this.projects.length === 0) return;

    const wrapper = this.wrapperRef.nativeElement;
    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollable = rect.height - vh;

    if (scrollable <= 0) return;

    const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    const maxTranslate = this.trackRef.nativeElement.scrollWidth - window.innerWidth;
    const translate = progress * maxTranslate;

    this.trackRef.nativeElement.style.transform = `translateX(-${translate}px)`;

    const idx = Math.round(progress * (this.projects.length - 1));
    if (idx !== this.activeIndex) this.activeIndex = idx;
  }

  goTo(index: number) {
    if (!this.wrapperRef || this.projects.length === 0) return;
    const clamped = Math.min(Math.max(index, 0), this.projects.length - 1);

    const wrapper = this.wrapperRef.nativeElement;
    const vh = window.innerHeight;
    const scrollable = wrapper.offsetHeight - vh;
    const targetProgress = clamped / (this.projects.length - 1);
    const targetY = wrapper.offsetTop + scrollable * targetProgress;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  next() {
    this.goTo(this.activeIndex + 1);
  }

  prev() {
    this.goTo(this.activeIndex - 1);
  }
}
