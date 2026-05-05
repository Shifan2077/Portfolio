import { Component } from '@angular/core';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { Project } from './components/project-card/project-card.component';
import { RevealDirective } from './reveal.directive';

@Component({
  selector: 'app-root',
  imports: [CustomCursorComponent, RevealDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly skills = ['Python', 'RAG Systems', 'Data Analytics', 'AWS', 'SQL', 'OpenCV'];

  protected readonly projects: Project[] = [
    {
      title: 'AI Study Tool',
      description:
        'A RAG-based learning assistant that helps students query study material, retrieve relevant context, and generate focused explanations.',
      stack: ['Angular', 'Python', 'RAG', 'LLMs', 'Vector Search'],
      metric: 'RAG Assistant',
      image: 'AItool.png',
    },
    {
      title: 'CCTV Motion Detection System',
      description:
        'A Raspberry Pi based surveillance workflow that detects motion, captures activity, and supports lightweight edge monitoring.',
      stack: ['Raspberry Pi', 'Python', 'OpenCV', 'IoT'],
      metric: 'Edge AI',
      image: 'raspi.png',
    },
    {
      title: 'Secure File Sharing Website',
      description:
        'A cloud-backed secure file sharing platform designed around authentication, storage, and reliable access to shared documents.',
      stack: ['AWS', 'Web Security', 'Storage', 'SQL'],
      metric: 'Cloud App',
      image: 'AWS.png',
    },
  ];

  protected readonly achievements = [
    'NPTEL Python & Java',
    'AWS Cloud Foundations',
    'Data Science Certification',
  ];

  protected readonly processSteps = [
    {
      number: '01',
      title: 'Discover',
      text: 'Understand the user goal, data source, constraints, and measurable success metric.',
    },
    {
      number: '02',
      title: 'Design',
      text: 'Map the retrieval flow, model behavior, cloud architecture, and user experience.',
    },
    {
      number: '03',
      title: 'Deliver',
      text: 'Build, test, and refine the system into a reliable AI-powered product experience.',
    },
  ];

  protected readonly contacts = [
    {
      label: 'Email',
      value: 'mdshifannagarji@gmail.com',
      href: 'mailto:mdshifannagarji@gmail.com',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/md-shifan-nagarji',
      href: 'https://www.linkedin.com/in/md-shifan-nagarji',
    },
    {
      label: 'GitHub',
      value: 'github.com/ShifanNagarji',
      href: 'https://github.com/ShifanNagarji',
    },
  ];
}
