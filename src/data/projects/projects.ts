export type ProjectType = {
    id: string;
    title: string;
    imageIds: string[];
    githubLink?: string;
    externalLink?: string;
    roleIds?: string[];
    descriptionHTML?: string;
    short_description?: string;
    techIds?: string[];
    dates?: string;
}

const translations = {
  "summary": "Summary",
  "challenge": "Challenge",
  "approach": "Approach",
  "result": "Result",
  "behind": "Behind the Build"
}

export const projectData: Record<string, ProjectType> = {
  "sunshine-nights": {
    id: "sunshine-nights",
    title: "Sunshine Nights",
    imageIds: ["sunshine-nights-primary", "sunshine-nights-secondary", "sunshine-nights-tertiary"],
    githubLink: "https://github.com/crawfordforbes/sunshinev3",
    externalLink:"http://sunshinenights.com/",
    roleIds: ["developer", "designer", "solo"],
    descriptionHTML: `<article class='description-with-title'><h4 class='title'>${translations.summary}</h4><p>Developed a responsive website and custom CMS for a touring band from New York City. Originally a feature-rich React app with media galleries and post management tools, it later evolved into a lightweight JavaScript site as the band’s needs changed.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.challenge}</h4><p>Create a site that balanced visual creativity with practical usability, allowing non-technical users to manage content easily while adapting to an evolving digital presence across social media platforms.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.approach}</h4><p>Built both front and back ends from scratch: a Sinatra server with bcrypt-secured logins, SQLite3 with Active Record, and a custom admin dashboard for managing posts, media, and expiration dates. Over time, refactored the React-based front end to simpler vanilla JavaScript for performance and longevity.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.result}</h4><p>Delivered a stable, easy-to-manage platform that reflected the band’s evolving identity, remaining technically solid and adaptable over several design iterations.</p></article>`,
    short_description: "Responsive site and custom CMS for a NYC band, evolving from a full React/Redux SPA to a lean, vanilla JS build as the band's needs changed.",
    techIds: ["ruby", "sinatra", "activerecord", "bcrypt", "react", "vanillajs", "webpack", "nodejs"],
    dates: "2015 - Present"
  },
  "crawford-forbes": {
    id: "crawford-forbes",
    title: "Crawford Forbes Portfolio",
    imageIds: [],
    roleIds: ["developer", "designer", "solo"],
    descriptionHTML: `<article class='description-with-title'><h4 class='title'>${translations.summary}</h4><p>An ongoing personal project to showcase my work, experiment with AI-driven tools, and refresh my React and TypeScript skills. The site is both a professional portfolio and a creative sandbox.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.challenge}</h4><p>Design and build a site that feels clean and intentional — balancing technical depth with visual polish — while keeping the codebase modern, performant, and easy to iterate on.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.approach}</h4><p>Built with Vite, React, React Router, and TypeScript, following modern web development practices. Designed the UI myself, drawing on years of collaboration with award-winning designers and my growing design sensibility. Implemented responsive layouts, subtle animations, and accessible navigation.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.result}</h4><p>A fast, expressive personal site that demonstrates both my technical versatility and my appreciation for thoughtful design. It continues to evolve alongside my skills and interests.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.behind}</h4><p>From the start, I knew I wanted hexagons to be a central design element — I’d been experimenting with hex-based mapping and loved the structured, grid-like aesthetic. My first version used large hexagonal project cards to echo that motif, but the layout quickly became cluttered and didn’t scale well with larger project sets. To improve readability and maintainability, I switched to rounded rectangular cards and introduced pill-shaped filters, which better balanced usability and visual interest.</p>
    <p>Color was another deliberate choice. After seeing many portfolio sites that felt overly corporate or subdued, I wanted something that stood out — vibrant gradients and bold accent tones that reflect creativity without overwhelming the content. The typography was chosen with the same principle in mind: clean, modern, and legible, complementing the playful geometry and color without competing for attention.</p></article>`,
    short_description: "My personal portfolio site, built with React and TypeScript to showcase my work and experiment with modern web development techniques.",
    techIds: ["react", "nodejs", "typescript", "vite", "cssmodules"],
    dates: "2025 - Present"
  },
  "moneytree": {
    id: "moneytree",
    title: "MoneyTree",
    imageIds: [], // Temporary fallback until moneytree images are added
    roleIds: ["developer", "designer", ],
    descriptionHTML: `<article class='description-with-title'><h4 class='title'>${translations.summary}</h4><p>Built a data-rich, interactive visualization tool for PwC to explore multi-year venture capital data. This single-page React app allowed users to filter, drill down, chart, and export insights across complex datasets.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.challenge}</h4><p>Translate an enormous, multi-layered financial dataset into an experience that was fast, intuitive, and on-brand for one of the world’s largest consulting firms. The project required strict adherence to PwC’s design, accessibility, and security guidelines.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.approach}</h4><p>Architected and developed the entire front end using React, Redux, and Highcharts, powered by an API provided by PwC. Designed a flexible filtering system and dynamic chart generation with XLS export, all deployed within Adobe Experience Manager.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.result}</h4><p>Delivered a highly customizable, secure analytics platform that became a key part of PwC’s MoneyTree reporting suite. The app showcased both the depth of PwC’s data and the clarity of its visual storytelling.</p></article>`,
    short_description: "Data-rich React app for PwC enabling deep financial analysis with dynamic charts, filters, and exports — my first greenfield build.",
    techIds: ["nodejs", "babel", "webpack", "react", "redux", "highcharts"],
    dates: "2016 - 2017",
  },
  "palm-springs": {
    id: "palm-springs",
    title: "Visit Palm Springs",
    imageIds: [], // Temporary fallback until palm-springs images are added
    roleIds: ["developer", "lead"],
    descriptionHTML: `<article class='description-with-title'><h4 class='title'>${translations.summary}</h4><p>Visit Palm Springs partnered with Simpleview to create a vibrant new website that captured the city’s midcentury modern aesthetic while helping visitors easily explore local attractions, events, and amenities. As team lead, I guided both the technical and creative aspects of the project—balancing design ambition with development feasibility and timeline constraints.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.challenge}</h4><p>The client wanted a site that celebrated Palm Springs’ distinctive style while remaining highly functional and maintainable within Simpleview’s modular system. They also had an extensive collection of legacy content and imagery hosted on disparate platforms, which required careful migration and reorganization to fit our infrastructure.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.approach}</h4><p>I collaborated closely with the design and project management teams to ensure proposed layouts were technically achievable and within scope. For key custom features, like the parallax blog container that visually spotlights their stories and imagery, I worked with designers to refine the concept so it could be implemented efficiently.
    <br>
    On the technical side, I developed and oversaw several custom scripts to migrate content and media. One handled the movement of assets from AWS to our Cloudinary system, while another automated uploads from an FTP server to populate their media gallery—complete with supplied descriptions and organizational structure. I also supported junior developers on the team, ensuring consistent standards and smooth integration across multiple components.</p></article>
    <article class='description-with-title'><h4 class='title'>${translations.result}</h4><p>The final site delivered an engaging, visually distinctive experience that captures Palm Springs’ personality while remaining performant and easy for the client to manage. By keeping the design ambitious but grounded in achievable scope, our team met deadlines without sacrificing polish or functionality.</p></article>`,
    short_description: "Led development of a vibrant, midcentury-modern website for Visit Palm Springs, balancing ambitious design with technical feasibility and content migration.",
    techIds: ["simpleview-cms", "cloudinary", "vanillajs", "vue"],
    dates: "2024"
  }
}