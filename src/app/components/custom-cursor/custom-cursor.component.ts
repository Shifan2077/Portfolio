import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.css',
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('dotElement', { static: true }) private readonly dotElement?: ElementRef<HTMLElement>;
  @ViewChild('trailElement', { static: true }) private readonly trailElement?: ElementRef<HTMLElement>;

  protected readonly isHovering = signal(false);
  protected readonly isVisible = signal(false);

  protected dot = { x: -100, y: -100 };
  protected trail = { x: -100, y: -100 };

  private target = { x: -100, y: -100 };
  private frameId = 0;
  private hasPointer = false;

  constructor(
    private readonly ngZone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.target = { x: event.clientX, y: event.clientY };

    if (!this.hasPointer) {
      this.dot = { ...this.target };
      this.trail = { ...this.target };
      this.hasPointer = true;
      this.paintCursor();
    }

    this.isVisible.set(true);
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent): void {
    this.isHovering.set(this.isInteractive(event.target));
  }

  @HostListener('document:mouseout', ['$event'])
  onMouseOut(event: MouseEvent): void {
    if (!this.isInteractive(event.relatedTarget)) {
      this.isHovering.set(false);
    }
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.isVisible.set(false);
  }

  private animate(): void {
    this.dot.x += (this.target.x - this.dot.x) * 0.45;
    this.dot.y += (this.target.y - this.dot.y) * 0.45;
    this.trail.x += (this.target.x - this.trail.x) * 0.14;
    this.trail.y += (this.target.y - this.trail.y) * 0.14;
    this.paintCursor();

    this.frameId = requestAnimationFrame(() => this.animate());
  }

  private paintCursor(): void {
    const dot = this.dotElement?.nativeElement;
    const trail = this.trailElement?.nativeElement;

    if (!dot || !trail) {
      return;
    }

    dot.style.transform = `translate3d(${this.dot.x}px, ${this.dot.y}px, 0)`;
    trail.style.transform = `translate3d(${this.trail.x}px, ${this.trail.y}px, 0)`;
  }

  private isInteractive(target: EventTarget | null): boolean {
    return target instanceof Element && Boolean(target.closest('a, button, [data-cursor-hover]'));
  }
}
