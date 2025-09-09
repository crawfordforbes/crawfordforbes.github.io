export type ProjectType = {
    id: string,
    title: string,
    bannerImgId: string,
    primaryImgId: string,
    secondaryImgId: string,
    githubLink?: string,
    externalLink?: string,
    catIds?: string[],
    descriptionHTML?: string,
    techIds?: string[],
}

export type ProjectsType = {
  [key: string]: {
    id: string,
    title: string,
    bannerImgId: string,
    primaryImgId: string,
    secondaryImgId: string,
    githubLink?: string,
    externalLink?: string,
    catIds?: string[],
    descriptionHTML?: string,
    techIds?: string[],
  }
}
export const projectData:ProjectsType = {
  "sunshine-nights": {
    id: "sunshine-nights",
    title: "Sunshine Nights",
    bannerImgId: "sunshine-banner",
    primaryImgId: "sunshine-primary",
    secondaryImgId: "sunshine-secondary",
    githubLink: "https://github.com/crawfordforbes/sunshinev3",
    externalLink:"https://www.sunshinenights.com",
    catIds: ["developer", "designer", ],
    descriptionHTML: `<p>Upon finishing bootcamp, I built this site for a friend's band in New York City. It consists of a fully functioning CMS with users, a Sinatra server, a postgres database, and a vanilla javascript frontend. The site's history reflects the changing landscape of a touring artist's internet needs; we removed a fully custom media gallery and reduced content here as the artist world moved to instagram and other social media sites. At one point years ago React was used in the front end, but with such minimal user interaction and site structure it wasn't worth the load time.</p>`,
    techIds: ["ruby", "sinatra", "activerecord"]
  },
  "crawford-forbes": {
    id: "crawford-forbes",
    title: "Crawford Forbes Portfolio",
    bannerImgId: "sunshine-banner",
    primaryImgId: "sunshine-primary",
    secondaryImgId: "sunshine-secondary",
    catIds: ["developer", "designer", "solo"],
    descriptionHTML: `<p>Let's be frank, this is more of a meta-portfolio site, now that it's featuring itself. Time is a flat black circle, and so is this metaphor, as you're probably going to read this again at some point.</p>`,
    techIds: ["react", "vite"]
  }
}