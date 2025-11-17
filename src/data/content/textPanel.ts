type TextPanelContent = {
  id: string;
  description: string;
};

export const textPanelContent: Record<string, TextPanelContent> = {
  "about-me": {
    "id": "about-me",
    "description":`
      <p>I'm a front-end–focused developer who bridges the gap between ambitious design and pragmatic engineering. With 10 years experience building secure SPAs, producing full-fledged marketing websites, and managing high-functioning teams, I turn complex requirements into polished, maintainable web applications.</p>

      <p>I work closely with designers and PMs to balance creative vision with technical feasibility, breaking big ideas into clear steps and shipping steadily. My priorities: on-time and in-scope delivery, cultivating a strong team, and producing maintainable code.</p>

      <p>At Simpleview, I spent seven years building tourism websites for destinations like Visit Palm Springs and Mackinac Island. As a Team Lead, I guided developers, shaped architecture decisions, and streamlined our processes while shipping ~30 sites a year.</p>

      <p>I'm looking for a role where I can grow as a technical lead while staying hands-on with code. Ideal fit: a product-focused team tackling interesting problems, where I can mentor developers and contribute to architecture decisions.</p>

      <p>When I'm not coding, I'm usually writing experimental music, building game prototypes, or building Lego with my kids.</p>

    `
  },
  "projects-title": {
    "id": "projects-title",
    "description": `<h3 class='section-title'>Selected Projects</h3>`
  }
}