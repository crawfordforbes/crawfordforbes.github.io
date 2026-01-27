import type { ReactNode } from 'react';

type TextPanelContent = {
  id: string;
  description: ReactNode;
};

export const textPanelContent: Record<string, TextPanelContent> = {
  "about-me": {
    "id": "about-me",
    "description":`
      <p>I'm a UI Engineer who bridges the gap between ambitious design and pragmatic engineering. With a decade of experience building enterprise SPAs and high-volume platforms, I turn complex requirements into maintainable code.</p>

      <p>At Simpleview, I spent seven years shaping the core architecture of tourism sites for global destinations and leading dev teams to ship ~30 projects annually. I’m at my best when I’m hands-on with code, mentoring developers, and collaborating with designers to solve interesting problems.</p>

      <p>I’m looking for a role where I can remain deeply hands-on with code while contributing to high-level architecture. My ideal fit is a product-focused team where I can solve complex technical problems, mentor developers, and translate creative vision into high-performance production reality.</p>
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
  }
}