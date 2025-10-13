export type ProjectType = {
    id: string;
    title: string;
    primaryImgId: string;
    secondaryImgId?: string;
    tertiaryImgId?: string;
    githubLink?: string;
    externalLink?: string;
    roleIds?: string[];
    descriptionHTML?: string;
    short_description?: string;
    techIds?: string[];
}

export const projectData: Record<string, ProjectType> = {
  "sunshine-nights": {
    id: "sunshine-nights",
    title: "Sunshine Nights",
    primaryImgId: "sunshine-primary",
    secondaryImgId: "sunshine-secondary",
    tertiaryImgId: "sunshine-tertiary",
    githubLink: "https://github.com/crawfordforbes/sunshinev3",
    externalLink:"http://sunshinenights.com/",
    roleIds: ["developer", "designer", ],
    descriptionHTML: `<p>Upon finishing bootcamp, I built this site for a friend's band in New York City. It consists of a fully functioning CMS with users, a Sinatra server, a postgres database, and a vanilla javascript frontend. The site's history reflects the changing landscape of a touring artist's internet needs; we removed a fully custom media gallery and reduced content here as the artist world moved to instagram and other social media sites. At one point years ago React was used in the front end, but with such minimal user interaction and site structure it wasn't worth the load time.</p>`,
    short_description: "A band website with a custom CMS built with Sinatra and Postgres.",
    techIds: ["ruby", "sinatra", "activerecord"]
  },
  "crawford-forbes": {
    id: "crawford-forbes",
    title: "Crawford Forbes Portfolio",
    primaryImgId: "sunshine-primary",
    secondaryImgId: "sunshine-secondary",
    roleIds: ["developer", "designer", "solo"],
    descriptionHTML: `<p>Let's be frank, this is more of a meta-portfolio site, now that it's featuring itself. Time is a flat black circle, and so is this metaphor, as you're probably going to read this again at some point.</p>`,
    // techIds: ["react", "vite"]
  },
  "sunshine-nights-2": {
    id: "sunshine-nights-2",
    title: "2Sunshine Nights",
    primaryImgId: "sunshine-primary",
    secondaryImgId: "sunshine-secondary",
    githubLink: "https://github.com/crawfordforbes/sunshinev3",
    externalLink:"http://sunshinenights.com/",
    roleIds: ["developer", "designer", ],
    descriptionHTML: `<p>2Upon finishing bootcamp, I built this site for a friend's band in New York City. It consists of a fully functioning CMS with users, a Sinatra server, a postgres database, and a vanilla javascript frontend. The site's history reflects the changing landscape of a touring artist's internet needs; we removed a fully custom media gallery and reduced content here as the artist world moved to instagram and other social media sites. At one point years ago React was used in the front end, but with such minimal user interaction and site structure it wasn't worth the load time.</p>`,
    short_description: "2A band website with a custom CMS built with Sinatra and Postgres.",
    techIds: ["ruby", "sinatra", "activerecord"]
  },
  "sunshine-nights-3": {
    id: "sunshine-nights-3",
    title: "3Sunshine Nights",
    primaryImgId: "sunshine-primary",
    secondaryImgId: "sunshine-secondary",
    githubLink: "https://github.com/crawfordforbes/sunshinev3",
    externalLink:"http://sunshinenights.com/",
    roleIds: ["developer", "designer", ],
    descriptionHTML: `<p>3Upon finishing bootcamp, I built this site for a friend's band in New York City. It consists of a fully functioning CMS with users, a Sinatra server, a postgres database, and a vanilla javascript frontend. The site's history reflects the changing landscape of a touring artist's internet needs; we removed a fully custom media gallery and reduced content here as the artist world moved to instagram and other social media sites. At one point years ago React was used in the front end, but with such minimal user interaction and site structure it wasn't worth the load time.</p>`,
    short_description: "3A band website with a custom CMS built with Sinatra and Postgres.",
    techIds: ["ruby", "sinatra", "activerecord"]
  },
  "sunshine-nights-4": {
    id: "sunshine-nights-4",
    title: "4Sunshine Nights",
    primaryImgId: "sunshine-primary",
    secondaryImgId: "sunshine-secondary",
    githubLink: "https://github.com/crawfordforbes/sunshinev4",
    externalLink:"http://sunshinenights.com/",
    roleIds: ["developer", "designer", ],
    descriptionHTML: `<p>4Upon finishing bootcamp, I built this site for a friend's band in New York City. It consists of a fully functioning CMS with users, a Sinatra server, a postgres database, and a vanilla javascript frontend. The site's history reflects the changing landscape of a touring artist's internet needs; we removed a fully custom media gallery and reduced content here as the artist world moved to instagram and other social media sites. At one point years ago React was used in the front end, but with such minimal user interaction and site structure it wasn't worth the load time.</p>`,
    short_description: "4A band website with a custom CMS built with Sinatra and Postgres.",
    techIds: ["ruby", "sinatra", "activerecord"]
  },
}