import SimpleImage from "@/components/global/OptimizedImage";
import VideoPlayer from "@/components/global/VideoPlayer";
import Caption from "@/components/global/Caption";

import type { ReactNode } from 'react'

export type ProjectType = {
    id: string;
    title: string;
    imageIds: string[];
    githubLink?: string;
    externalLink?: string;
    roleIds?: string[];
  descriptionHTML?: string;
  /** Optional JSX description (preferred) */
  description?: ReactNode;
    short_description?: string;
    techIds?: string[];
    dates?: string;
    featured?: boolean;
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
    imageIds: ["sunshine-nights-desktop", "sunshine-nights-press-page"],
    githubLink: "https://github.com/crawfordforbes/sunshinev3",
    externalLink:"http://sunshinenights.com/",
    roleIds: ["developer", "solo"],
    description: (
      <>
        <article className='description-with-title'>
          <h4 className='title'>{translations.summary}</h4>
          <p>
            <span className="floating float-right asset-caption">
              <VideoPlayer src="/videos/sunshine-nights-navigation.mp4" poster="/videos/sunshine-nights-navigation.jpg"/>
              <Caption content="Users can quickly access information and find the band on their preferred social media." />
            </span>
            Developed a responsive website and custom CMS for a touring band from New York City. Originally a feature-rich React app with media galleries and other content, it evolved into a lightweight JavaScript site as the band’s needs changed.
          </p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.challenge}</h4>
          <p>Create a site that balances visual creativity with practical usability, allowing non-technical users to manage content easily while adapting to an evolving digital presence across social media platforms.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <p>Built both front and back ends from scratch: a Sinatra server with bcrypt-secured logins, SQLite3 with Active Record, and a custom admin dashboard for managing posts, media, and expiration dates. Over time, refactored the React-based front end to simpler vanilla JavaScript for performance and longevity. Hosted on a DigitalOcean droplet for minimum downtime.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.result}</h4>
          <p>Delivered a stable, easy-to-manage platform that reflected the band’s evolving identity, remaining technically solid and adaptable over several design iterations.</p>
        </article>
      </>
    ),
    short_description: "Responsive site and custom CMS for a NYC band, evolving from a full React/Redux SPA to a lean, vanilla JS build as the band's needs changed.",
    techIds: ["ruby", "sinatra", "active-record", "bcrypt", "react", "vanilla-js", "less", "webpack", "node", "postgresql", "digital-ocean", "git", "github"],
    dates: "2015 - Present"
  },
  "crawford-forbes": {
    id: "crawford-forbes",
    title: "Crawford Forbes Portfolio",
    imageIds: ["crawford-forbes-header", "crawford-forbes-projects-index", "crawford-forbes-projects-detail"],
    roleIds: ["developer", "designer", "solo"],
    featured: true,
    description: (
      <>
        <article className='description-with-title'>
          <h4 className='title'>{translations.summary}</h4>
          <p>
            <span className="floating float-right asset-caption">
              <VideoPlayer src="/videos/crawford-forbes-site-scroll.mp4" poster="/videos/crawford-forbes-site-scroll.jpg"/>
              <Caption content="Vivid colors, dynamic layouts, and engaging interactions bring the portfolio to life." />
            </span>
            An ongoing personal project to showcase my work, experiment with AI-driven tools, and refresh my React and TypeScript skills. This site is both a professional portfolio and a creative sandbox.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.challenge}</h4>
          <p>Design and build a site that feels clean and intentional — balancing technical depth with visual polish — while keeping the codebase modern, performant, and iterable.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <p>Built with Vite, React, React Router, and TypeScript, following modern web development practices. Designed the UI myself, drawing on years of collaboration with award-winning designers and my growing design sensibility. Implemented responsive layouts, subtle animations, and accessible navigation.</p>
        </article>
        <div className="mosaic mosaic-2 asset-caption">
          <VideoPlayer src="/videos/crawford-forbes-projects-index.mp4" poster="/video/crawford-forbes-projects-index.jpg"/>
          <VideoPlayer src="/videos/crawford-forbes-projects-detail.mp4" poster="/video/crawford-forbes-projects-detail.jpg"/>
        </div>
        <Caption content="Hover effects, transitions, and dynamic content loading enhance the user experience." />
        <article className='description-with-title'>
          <h4 className='title'>{translations.result}</h4>
          <p>A fast, expressive personal site that demonstrates both my technical versatility and my appreciation for thoughtful design. It continues to evolve alongside my skills and interests.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.behind}</h4>
          <p>From the start, I knew I wanted hexagons to be a central design element — I’d been experimenting with hex-based elevation maps and loved the structured, grid-like aesthetic. My first version used large hexagonal project cards to echo that motif, but the layout quickly became cluttered and didn’t scale well with larger project sets. To improve readability and maintainability, I switched to rounded rectangular cards and introduced pill-shaped filters, which better balanced usability and visual interest.</p>
          <p>Color was another deliberate choice. After seeing many portfolio sites that felt unengaging or subdued, I wanted something that stood out — vibrant gradients and bold accent tones that reflect creativity without overwhelming the content. The typography was chosen with the same principle in mind: clean, modern, and legible, complementing the playful geometry and color without competing for attention.</p>
        </article>
      </>
    ),
    short_description: "My personal portfolio site, built with React and TypeScript to showcase my work and experiment with modern web development techniques.",
    techIds: ["react", "node", "typescript", "vite", "splide", "fontawesome","git", "github"],
    dates: "2025 - Present"
  },
  "moneytree": {
    id: "moneytree",
    title: "MoneyTree Explorer",
    imageIds: ["moneytree-history-filter-selection", "moneytree-history-unfiltered", "moneytree-pie-charts"],
    roleIds: ["developer", "contributor"],
    description: (
      <>
        <article className='description-with-title'>
          <h4 className='title'>{translations.summary}</h4>
          <p>Built a data-rich, interactive visualization tool for PwC to explore multi-year venture capital data. This single-page React app allowed users to filter, drill down, chart, and export insights across complex datasets.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.challenge}</h4>
          <p>Translate an enormous, multi-layered financial dataset into an experience that was fast, intuitive, and on-brand for one of the world’s largest consulting firms. The project required strict adherence to PwC’s design, accessibility, and security guidelines.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <p>Architected and developed the entire front end using a myriad of libraries and technologies including React, Redux, and Highcharts, all powered by an API provided by PwC. Designed a flexible filtering system and sharable, dynamic chart and map generation with XLS export, all deployed within Adobe Experience Manager.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.result}</h4>
          <p>Delivered a highly customizable, secure analytics platform that became a key part of PwC’s MoneyTree reporting suite. The app showcased both the depth of PwC’s data and the clarity of its visual storytelling.</p>
        </article>
        <article>
          <p>MoneyTree Explorer is no longer available online, and its github repository is private.</p>
      </article>
      </>
    ),
    short_description: "Data-rich React app for PwC enabling deep financial analysis with dynamic charts, filters, and exports.",
    techIds: ["node", "babel", "webpack", "react", "react-router", "redux", "highcharts", "sheet-js", "file-saver", "less", "git", "github", "aem"],
    dates: "2016 - 2017",
  },
  "palm-springs": {
    id: "palm-springs",
    title: "Visit Palm Springs",
    imageIds: ["palm-springs-hero", "palm-springs-listings", "palm-springs-media-gallery", "palm-springs-midcentury-modern-design"],
    externalLink: "https://www.visitpalmsprings.com/",
    roleIds: ["developer", "lead", "contributor"],
    featured: true,
    description: (
      <>
        <article className='description-with-title'>
          <h4 className='title'>{translations.summary}</h4>
          <p><a href="https://www.visitpalmsprings.com/" target="_blank" rel="noopener noreferrer">Visit Palm Springs</a> partnered with Simpleview to create a vibrant new website that captured the city’s Mid-century Modern aesthetic while helping visitors easily explore local attractions, events, and amenities. As Team Lead, I was the acting consultant for both the technical and creative aspects of the project, balancing design ambition with development feasibility and timeline constraints.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.challenge}</h4>
          <p>The client wanted a site that celebrated Palm Springs’ distinctive style while remaining highly functional and maintainable within Simpleview’s modular system. They also had an extensive collection of legacy content and imagery hosted on disparate platforms, which required careful migration and reorganization to fit our infrastructure.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <p>
            <span className="floating float-right asset-caption">
              <VideoPlayer src="/videos/palm-springs-scrolling-effect.mp4" poster="/videos/palm-springs-scrolling-effect.jpg"/>
              <Caption content="Visit Palm Springs' in-scope scrolling panel supports multiple data types" />
            </span>
            I collaborated closely with the design and project management teams to ensure proposed layouts were technically achievable and within scope. For key custom features, like the <a href="https://www.visitpalmsprings.com/" target="_blank" rel="noopener noreferrer">parallax-like blog container</a> that visually spotlights their stories and imagery, I worked with designers to refine the concept so it could be implemented efficiently.
          </p>
          <br />
          <p>
            <span className="floating float-left asset-caption">
              <VideoPlayer src="/videos/palm-springs-media-gallery.mp4" poster="/videos/palm-springs-media-gallery.jpg" />
              <Caption content="Visit Palm Springs' media galleries were imported with cleaned data and a client supplied organizational structure." />
            </span>
            On the technical side, I developed and oversaw several custom scripts to migrate content and media. One handled the movement of assets into our Cloudinary system, while another automated uploads from an FTP server to populate their <a href="https://visitpalmsprings.com/media-gallery/" target="_blank" rel="noopener noreferrer">media gallery</a>, complete with supplied descriptions and organizational structure. I also supported individual collaborators on the team, ensuring consistent standards and smooth integration across multiple components.
          </p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.result}</h4>
          <p>The final site delivered an engaging, visually distinctive experience that captures Palm Springs’ personality while remaining performant and easy for the client to manage. By keeping the design ambitious but grounded in achievable scope, our team met deadlines without sacrificing polish or functionality.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.behind}</h4>
          <p>The Palm Springs site is a great example of how strong collaboration between design and development can elevate both sides. It also reinforced my belief that “scope” doesn’t have to limit creativity—it can sharpen it.</p>
        </article>
      </>
    ),
    short_description: "Led development of a vibrant, midcentury-modern website for Visit Palm Springs, balancing ambitious design with technical feasibility and content migration.",
    techIds: ["simpleview-cms", "cloudinary", "vanilla-js", "vue", "cheerio", "async", "lodash", "mongodb", "figma", "git", "github"],
    dates: "2024"
  },
  "mackinac-island": {
    id: "mackinac-island",
    title: "Mackinac Island Tourism Bureau",
    imageIds: ["mackinac-island-homepage", "mackinac-island-booking-index", "mackinac-island-booking-detail", "mackinac-island-footer", "mackinac-island-postal-slider"],
    externalLink: "https://www.mackinacisland.org",
    roleIds: ["developer", "lead", "contributor"],
    featured: true,
    description: (
      <>
        <article className='description-with-title'>
          <h4 className='title'>{translations.summary}</h4>
          <p>
            <span className="floating float-right asset-caption">
              <SimpleImage
                src="mackinac-island-booking-detail"
                alt="Mackinac Island Booking Widget"
                className="image"
                aspectRatio="16/9"
                objectFit="cover"
              />
              <Caption content="Mackinac Island's booking widget allows users to easily get rates and make reservations" />
            </span>
            <a href="https://www.mackinacisland.org" target="_blank" rel="noopener noreferrer">Mackinac Island Tourism Bureau’s new website</a> was a showcase of teamwork and technical coordination. As Team Lead, I guided the development process across multiple custom features — from data migration and custom homepage components to integrating a complex <a href="https://www.mackinacisland.org/stay/hotels/" target="_blank" rel="noopener noreferrer">hotel booking system</a> — all while maintaining smooth collaboration among developers, designers, and project managers.
          </p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.challenge}</h4>
          <p>The project involved several advanced technical requirements layered atop a tight timeline. The client wanted a fully interactive map tied to dynamic callouts, a migration of <a href="https://www.mackinacisland.org/blog/" target="_blank" rel="noopener noreferrer">legacy blog data</a> from a highly customized CSV, and a new <a href="https://www.mackinacisland.org/stay/hotels/" target="_blank" rel="noopener noreferrer">hotel-booking feature</a> built into a recently rewritten Listings widget. Each of these pieces required careful planning and collaboration to align with both the client’s needs and our evolving internal systems.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <p>
            <span className="floating float-left asset-caption">
              <VideoPlayer src="/videos/mackinac-island-postal-slider.mp4" poster="/videos/mackinac-island-postal-slider.jpg"/>
              <Caption content="This custom postal service themed slider showcases the island's unique attractions while staying within appropriate guidelines." />
            </span>
            I collaborated with a teammate to plan and execute a custom import script that parsed and migrated their <a href="https://www.mackinacisland.org/blog/" target="_blank" rel="noopener noreferrer">blog posts</a> from a nonstandard CSV format into our CMS. On the front end, I worked closely with another developer to design and build the custom <a href="https://www.mackinacisland.org/" target="_blank" rel="noopener noreferrer">postal themed slider</a>, ensuring that performance and accessibility were maintained.
          </p>
          <p>
            <span className="floating float-right asset-caption">
              <VideoPlayer src="/videos/mackinac-island-map.mp4" poster="/videos/mackinac-island-map.jpg"/>
              <Caption content="This interactive map allows users to explore Mackinac Island's attractions in a dynamic way." />
            </span>
            For the <a href="https://www.mackinacisland.org/" target="_blank" rel="noopener noreferrer">interactive map</a>, I partnered with the design team to conceptualize how the visual and functional elements would sync, linking map markers to a callout slider for a fluid, guided exploration of the island’s points of interest. I then helped plan the technical approach and guided the developer who implemented it.
          </p>
          <p>
            <span className="floating float-left asset-caption">
              <SimpleImage
                src="mackinac-island-booking-index"
                alt="Mackinac Island Booking Widget"
                className="image"
                aspectRatio="16/9"
                objectFit="cover"
                objectPosition="top"
              />
              <Caption content="Using the Book Direct engine, users can get average nightly rates for custom date ranges or go straight to a hotel's booking provider." />
            </span>
            The most intricate task was extending our newly updated Listings widget to include a <a href="https://www.mackinacisland.org/stay/hotels/" target="_blank" rel="noopener noreferrer">hotel booking system powered by a third-party API</a>. This involved updating a large VueJS component suite — roughly two-dozen interdependent files — to fetch and display data like nightly rates, availability, and booking links. I optimized the system by refactoring API calls for efficiency and contributed a pull request to incorporate these improvements into our base client.
          </p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.result}</h4>
          <p>The finished site combined a clean, user-friendly experience with complex functionality under the hood. Visitors can browse blog content, explore the island through an interactive map, and book hotels directly from the site — all powered by efficient, maintainable systems. The project became a model of coordinated teamwork and thoughtful technical problem-solving.</p>
        </article>
      </>
    ),
    short_description: "Led development of Mackinac Island Tourism Bureau's feature-rich website, coordinating complex data migration, interactive maps, and a hotel booking system within a tight timeline.",
    techIds: ["simpleview-cms", "vanilla-js", "vue", "cheerio", "async", "lodash", "mongodb", "glide", "figma", "git", "github"],
    dates: "2015 - Present"
  },
  "custom-widgets": {
    id: "custom-widgets",
    title: "Custom Widgets & Components",
    imageIds: ["custom-widgets-virginia-map", "custom-widgets-panama-map-slider", "custom-widgets-chattanooga-navigation"],
    roleIds: ["developer", "contributor"],
    description: (
      <>
        <article className='description-with-title'>
          <h4 className='title'>{translations.summary}</h4>
          <p>Across several destination sites, I built a series of one-off custom widgets that elevated user engagement and brought complex design ideas to life. From animated sliders to responsive maps, these projects demonstrate my ability to translate creative vision into performant, maintainable front-end solutions.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.challenge}</h4>
          <p>Each widget presented its own technical and UX hurdles — often involving ambitious animation concepts, multilingual content management, or responsive behavior across varied aspect ratios. Many were designed to push the limits of our proprietary CMS while maintaining accessibility and client editability.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <ul>
            <li>
              <h5 className="subtitle"><a href="https://www.virginia.org/places-to-visit/regions/" target="_blank" rel="noopener noreferrer">Virginia Tourism Corporation Custom Map Widget:</a></h5>
              <p>Created an <a href="https://www.virginia.org/places-to-visit/regions/" target="_blank" rel="noopener noreferrer">interactive SVG map highlighting Virginia’s regions</a>. Developed custom overlay modals for each region and a mobile-friendly navigation system with slide arrows and dots to avoid tap conflicts while maintaining usability on small screens.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/custom-widgets-virginia-map-desktop.mp4" poster="/video/custom-widgets-virginia-map-desktop.jpg"/>
                <VideoPlayer src="/videos/custom-widgets-virginia-map-mobile.mp4" poster="/video/custom-widgets-virginia-map-mobile.jpg"/>
              </div>
              <Caption content="This custom map with overlay allows users to access targeted information quickly." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://www.tourismpanama.com/" target="_blank" rel="noopener noreferrer">Visit Panamá Animated Sliders:</a></h5>
              <p>Built two animated sliders using Slick and custom CSS. The <a href="https://www.tourismpanama.com/" target="_blank" rel="noopener noreferrer">map slider</a> dynamically loaded regional map images based on language and CMS settings, reducing client overhead. The <a href="https://www.tourismpanama.com/svtest/highlights/" target="_blank" rel="noopener noreferrer">highlights slider</a> showcased vivid, full-screen imagery with minimal text and custom bullet-to-title transitions for a more immersive effect.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/custom-widgets-panama-map-slider.mp4" poster="/videos/custom-widgets-panama-map-slider.jpg"/>
                <VideoPlayer src="/videos/custom-widgets-panama-highlights-slider.mp4" poster="/videos/custom-widgets-panama-highlights-slider.jpg"/>
              </div>
              <Caption content="These sliders showcase Panamá's beautiful regions and imagery with smooth transitions." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://www.visitchattanooga.com/" target="_blank" rel="noopener noreferrer">Chattanooga Tourism Co. Scroll & Navigation Effects:</a></h5>
              <p>Implemented a scrolling transition where new content layers elegantly over existing sections using ScrollMagic, CSS, and JS. Additionally, built a fully custom animated navigation system with transforming text and decorative swooping animations, all coded from scratch.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/custom-widgets-chattanooga-pinned-content.mp4" poster="/videos/custom-widgets-chattanooga-pinned-content.jpg"/>
                <VideoPlayer src="/videos/custom-widgets-chattanooga-navigation.mp4" poster="/videos/custom-widgets-chattanooga-navigation.jpg"/>
              </div>
              <Caption content="These effects enhance the storytelling experience by providing smooth transitions and engaging interactions." />
            </li>
          </ul>

        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.result}</h4>
          <p>Each widget added distinct motion and interactivity that aligned with each destination’s branding and storytelling goals. They strengthened user engagement while remaining lightweight and fully client-editable within our proprietary CMS.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.behind}</h4>
          <p>Much of the success in these builds came from balancing design ambition with technical practicality. Each required deep attention to browser performance, event handling, and mobile usability — particularly the Virginia map, which demanded inventive navigation patterns for small screens.</p>
        </article>
      </>
    ),
    short_description: "A collection of custom front-end widgets for destination websites, featuring interactive maps, animated sliders, and unique navigation effects that enhance user engagement.",
    techIds: ["simpleview-cms", "cloudinary", "vanilla-js", "scroll-magic", "git", "github", "svn", "adobe-xd", "photoshop"],
    dates: "2019 - 2022"
  },
  "bellevue": {
    id: "bellevue",
    title: "Visit Bellevue CVB",
    imageIds: ["bellevue-header", "bellevue-nav", "bellevue-listings-index", "bellevue-listings-detail"],
    externalLink: "https://www.visitbellevuewa.com/",
    roleIds: ["developer", "contributor"],
    description: (
      <>
        <article className='description-with-title'>
          <h4 className='title'>{translations.summary}</h4>
          <p>Visit Bellevue wanted a website that captured the city’s polished, modern energy while keeping users engaged through dynamic visuals. As part of the development team at Simpleview, I implemented a range of custom animations and data integrations that brought the site’s vibrant design to life.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.challenge}</h4>
          <p>The design concept featured a bold visual style with layered scrolling effects and several areas of dynamic content. My challenge was to translate these ambitious design ideas into performant, reliable front-end code that would hold up across browsers and devices.</p>
          <div className="mosaic mosaic-2 asset-caption">
            <VideoPlayer src="/videos/bellevue-hero-title-scroll.mp4" poster="/videos/bellevue-hero-title-scroll.jpg"/>
            <VideoPlayer src="/videos/bellevue-corporations-marquee.mp4" poster="/videos/bellevue-corporations-marquee.jpg"/>
          </div>
          <Caption content="These animations showcase Bellevue's vibrant energy and modern design while enhancing user engagement." />
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <p>I built several custom scroll-based animations for the homepage. The mutating outlined “Welcome” text over the hero section and the scrolling list of local corporations were achieved with a combination of CSS and JavaScript for smooth, lightweight animations. For the horizontally scrolling image boxes, I used the ScrollMagic library to handle the advanced scroll triggers and transitions.</p>

          <div className="mosaic mosaic-2 asset-caption">
            <VideoPlayer src="/videos/bellevue-vertical-scroller.mp4" poster="/videos/bellevue-vertical-scroller.jpg"/>
            <VideoPlayer src="/videos/bellevue-a-b-scroller.mp4" poster="/videos/bellevue-a-b-scroller.jpg"/>
          </div>
          <Caption content="Developed with the ScrollMagic library, these animations enhance the user experience by providing smooth transitions and engaging visuals." />

          <p>On the functional side, I extended the site’s hotel Listings widget with several custom integrations. I added data from Yelp and TripAdvisor, along with a custom booking button, all powered by our proprietary CRM. This combination allowed visitors to browse hotels, read reviews, and book stays directly through the site, all from a single, cohesive interface.</p>
          <div className="mosaic mosaic-2 asset-caption">
            <SimpleImage
              src="bellevue-listings-index"
              alt="Bellevue Listings Widget"
              className="image"
              aspectRatio="16/9"
              objectFit="cover"
            />
            <SimpleImage
              src="bellevue-listings-detail"
              alt="Bellevue Listings Widget"
              className="image"
              aspectRatio="16/9"
              objectFit="cover"
            />
          </div>
          <Caption content="Visit Bellevue's Listings Widget incorporates data from multiple sources to provide a comprehensive view of available accommodations." />

        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.result}</h4>
          <p>The finished website blends modern interactivity with solid performance and usability. The animated sections bring motion and energy to the design, while the integrated booking and review data make the site more practical and informative for visitors.</p>
        </article>
      </>
    ),
    short_description: "A dynamic, design-driven site featuring custom scroll animations, interactive elements, and data integrations built for a seamless user experience.",
    techIds: ["simpleview-cms", "cloudinary", "vanilla-js", "vue", "cheerio", "async", "lodash", "mongodb", "scroll-magic", "svn", "photoshop"],
    dates: "2019 - 2020",
  },
  "highlights": {
    id: "highlights",
    title: "Additional Highlights",
    imageIds: ["highlights-wyoming-homepage", "highlights-woodbury-events", "highlights-black-hills-intro", "highlights-cedar-city-mosaic", "highlights-livco-blog-marquee", "highlights-sunshine-coast-featured-events","highlights-cooperstown-homepage"],
    roleIds: ["developer", "lead"],
    description: (
      <>
        <article className='description-with-title'>
          <p>Over seven years at Simpleview, I led or contributed to more than 150 destination websites. Below are a few selected highlights that showcase both breadth and specialization — from performance optimization and listings integrations to custom interactive components. These are quick snapshots rather than full case studies; click any entry to explore the live site or view a short demo.</p>
        </article>
        <article className='description-with-title'>
          <h4 className='title'>{translations.approach}</h4>
          <ul>
            <li>
              <h5 className="subtitle"><a href="https://travelwyoming.com/" target="_blank" rel="noopener noreferrer">Travel Wyoming</a></h5>
              <p>A large-scale tourism build requiring two coordinated development teams. I led eight contributors across roughly two dozen custom components and complex listings detail pages. My focus was on maintaining consistency, providing code review and feedback, and managing feature prioritization through to content.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-wyoming-homepage.mp4" poster="/videos/highlights-wyoming-homepage.jpg"/>
                <VideoPlayer src="/videos/highlights-wyoming-listings-detail.mp4" poster="/videos/highlights-wyoming-listings-detail.jpg"/>
              </div>
              <Caption content="A smooth homepage scroll demonstrates the site’s cohesive modular design; a hotel detail video highlights custom data integrations, including nearby attraction sliders." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://destinationwoodbury.com/" target="_blank" rel="noopener noreferrer">Destination Woodbury</a></h5>
              <p>A compact, modern build completed in just two weeks — a strong showcase of what our team could achieve on a short timeline. The clean, open layout highlights local charm while keeping the experience light and fast.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-woodbury-homepage.mp4" poster="/videos/highlights-woodbury-homepage.jpg"/>
                <SimpleImage
                  src="highlights-woodbury-events"
                  alt="Destination Woodbury Events Page"
                  className="image"
                  aspectRatio="16/9"
                  objectFit="cover"
                />
              </div>
              <Caption content="The design pans through bold typography, subtle animation, and a streamlined flow that balances efficiency with visual appeal." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://www.blackhillsbadlands.com/" target="_blank" rel="noopener noreferrer">Black Hills & Badlands, SD</a></h5>
              <p>This vibrant, detail-oriented site blends scenic imagery with intricate SVG decorations and tear transitions. I guided build strategy to ensure visual cohesion across content types and consistent behavior between stylized components.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-blackhills-homepage.mp4" poster="/videos/highlights-blackhills-homepage.jpg"/>
                <VideoPlayer src="/videos/highlights-blackhills-listings.mp4" poster="/videos/highlights-blackhills-listings.jpg"/>
              </div>
              <Caption content="Homepage and Listings pages showcase layered sections, smooth transitions, and careful design fidelity carried throughout the site." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://visitcedarcity.com/" target="_blank" rel="noopener noreferrer">Visit Cedar City</a></h5>
              <p>A large dual-team project filled with visual storytelling and custom component work. The site uses numerous icons, layered textures, and illustrated accents to reinforce regional character while maintaining high usability.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-cedar-city-homepage.mp4" poster="/videos/highlights-cedar-city-homepage.jpg"/>
                <VideoPlayer src="/videos/highlights-cedar-city-events.mp4" poster="/videos/highlights-cedar-city-events.jpg"/>
              </div>
              <Caption content="The homepage walkthrough shows detailed iconography, decorative tears, and rich custom components that bring the region’s personality to life." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://www.visitlivco.com/" target="_blank" rel="noopener noreferrer">Visit LivCo</a></h5>
              <p>A highly stylized, colorful destination site designed around expressive layouts, playful textures, and animation-driven storytelling. I led the build team in translating an ambitious creative vision into a performant, maintainable implementation.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-livco-homepage.mp4" poster="/videos/highlights-livco-homepage.jpg"/>
                <VideoPlayer src="/videos/highlights-livco-attractions.mp4" poster="/videos/highlights-livco-attractions.jpg"/>
              </div>
              <Caption content="The homepage features vivid color blocking, textured backgrounds, and animated iconography that make the site both dynamic and cohesive." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://www.sunshinecoastcanada.com/" target="_blank" rel="noopener noreferrer">Sunshine Coast Tourism</a></h5>
              <p>A layered, design-heavy site rich with illustrated tears, overlapping decorations, and custom iconography. The build required careful attention to stacking contexts and component structure to preserve design fidelity across screen sizes.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-sunshine-coast-homepage.mp4" poster="/videos/highlights-sunshine-coast-homepage.jpg"/>
                <VideoPlayer src="/videos/highlights-sunshine-coast-events.mp4" poster="/videos/highlights-sunshine-coast-events.jpg"/>
              </div>
              <Caption content="The homepage highlights the design's complex visual layering and icon work; the events page demo showcases a fully functional calendar integrated into the events widget." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://experienceglendaleaz.com/" target="_blank" rel="noopener noreferrer">Experience Glendale</a></h5>
              <p>This project focused on using immersive photography to define the user experience. Several custom slider configurations were implemented to highlight key attractions and events dynamically.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-glendale-homepage.mp4" poster="/videos/highlights-glendale-homepage.jpg"/>
                <VideoPlayer src="/videos/highlights-glendale-sliders.mp4" poster="/videos/highlights-glendale-sliders.jpg"/>
              </div>
              <Caption content="Fading sliders emphasize seamless transitions and the fluid motion of custom galleries built to handle rich imagery gracefully." />
            </li>
            <li>
              <h5 className="subtitle"><a href="https://www.thisiscooperstown.com/" target="_blank" rel="noopener noreferrer">This Is Cooperstown</a></h5>
              <p>A stylized, character-driven site celebrating Cooperstown’s heritage and baseball history. Custom SVG layers and themed graphics create a unique dimensional feel while tying into the destination’s brand identity.</p>
              <div className="mosaic mosaic-2 asset-caption">
                <VideoPlayer src="/videos/highlights-cooperstown-homepage.mp4" poster="/videos/highlights-cooperstown-homepage.jpg"/>
                <VideoPlayer src="/videos/highlights-cooperstown-booking.mp4" poster="/videos/highlights-cooperstown-booking.jpg"/>
              </div>
              <Caption content="The homepage components and hotel booking widgets demonstrate the interplay of layered visuals and functional integrations built for the visitor experience." />
            </li>

          </ul>

        </article>
      </>
    ),
    short_description: "A selection of additional sites highlighting my leadership across complex builds, custom integrations, and visually distinctive destination designs.",
    techIds: ["simpleview-cms", "cloudinary", "vanilla-js", "vue", "cheerio", "async", "lodash", "mongodb", "scroll-magic", "git", "github", "adobe-xd", "figma"],
    dates: "2019 - 2025",
  }
}