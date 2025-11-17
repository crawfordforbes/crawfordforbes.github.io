import Badge from "@/components/global/Badge";
import { techData } from "@/data/projects/techs";
import type { TechType } from "@/data/projects/techs";

import './styles/favoriteTechs.css';

function FavoriteTechs() {
  // Filter techs where favorite is true
  const favoriteTechs: TechType[] = Object.values(techData).filter(tech => tech.favorite === true).sort((a, b) => a.title < b.title ? -1 : 1);

  if (favoriteTechs.length === 0) {
    return null;
  }

  return (
    <article className="constrained-content">
      <div className="favorite-techs">
        <ul className="tech-list" role="list" aria-label="Favorite technologies">
          {favoriteTechs.map((tech, idx) => (
            <li key={tech.id}>
              <Badge
                iconClass={tech.iconClass}
                title={tech.title}
                link={tech.link}
                extraClass={`pill ${idx % 4 === 0 ? 'primary' : idx % 4 === 1 ? 'secondary' : idx % 4 === 2 ? 'tertiary' : 'quaternary'} tech-badge`}
              />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default FavoriteTechs;
