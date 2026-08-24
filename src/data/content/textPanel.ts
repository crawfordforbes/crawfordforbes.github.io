import type { ReactNode } from 'react';

type TextPanelContent = {
  id: string;
  description: ReactNode;
};

export const textPanelContent: Record<string, TextPanelContent> = {
  "about-me": {
    "id": "about-me",
    "description":`
      <p>I’m a Software Engineer with a decade of experience building enterprise SPAs, high-volume platforms, and complex front-end systems. I specialize in translating complex data requirements into maintainable, high-performance code, focusing heavily on application state, performance optimization, and scalable component architecture.</p>

      <p>At Simpleview, I spent seven years shaping the front-end architecture for global destination platforms and leading dev teams to ship roughly 30 projects annually. I thrive when I'm deep in the codebase, mentoring engineers, and collaborating across product teams to untangle tough technical challenges.</p>

      <p>I’m looking for my next role within a collaborative engineering team. Whether contributing directly as an individual developer, driving front-end architecture, or leading projects, I’m open to any role where I can solve interesting technical problems, write clean code, and ship great software.</p>
    `
  },
  "projects-title": {
    "id": "projects-title",
    "description": `<h3 class='section-title'>Selected Projects</h3>
    <p class='section-description'>A few highlights of the work I’m most proud of. Click on a technology or role to filter.</p>`
  },
  "favorites-title": {
    "id": "favorites-title",
    "description": `<h3 class='section-title'>Selected Technologies</h3>
    <p class='section-description'>A curated list of frameworks, libraries, and tools I trust.</p>`
  },
  "not-found-title": {
    "id": "not-found-title",
    "description": `<h3 class='section-title'>404 - Page Not Found</h3>
    <p class='section-description'>Sorry, the page you're looking for doesn't exist.</p>`
  }
}