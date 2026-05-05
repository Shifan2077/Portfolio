import { Component, Input } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  stack: string[];
  metric: string;
  image: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
