# Portfolio — Amir Soilihi

Portfolio professionnel en dark mode, développé avec Angular 18 + Tailwind CSS.
Direction visuelle inspirée des interfaces développeur (GitHub, outils SaaS) : fond
sombre, surfaces subtilement différenciées, vert utilisé uniquement en accent.

## Démarrer en local

```bash
npm install
npm start
```
Puis ouvrir http://localhost:4200

## Build de production

```bash
npm run build
```
Le résultat est généré dans `dist/portfolio-amir/browser`.

## Architecture

```
src/app/
├── core/
│   ├── models/        Interfaces TypeScript (Project, Skill, Experience, Interest, SocialLink, Profile)
│   └── services/       PortfolioService — point d'entrée unique utilisé par tous les composants
│
├── data/               Contenu local actuel (une seule source à modifier)
│   ├── portfolio.data.ts   → identité, hero, à propos, contact, réseaux sociaux
│   ├── projects.data.ts
│   ├── skills.data.ts
│   ├── journey.data.ts
│   └── interests.data.ts
│
└── features/            Un dossier par section, composants standalone
    ├── navbar/
    ├── hero/
    │   └── hero-visual/     Composant indépendant pour le visuel du Hero (remplaçable)
    ├── about/
    ├── skills/
    ├── projects/
    │   └── project-card/    Composant réutilisable — un seul pour tous les projets
    ├── journey/
    ├── interests/
    ├── contact/
    └── footer/
```

### Comment ajouter / modifier du contenu

Tout passe par `src/app/data/*.ts`. Aucun composant n'a besoin d'être modifié :

- **Ajouter un projet** → ajouter une entrée dans `projects.data.ts`. `ProjectCard` l'affichera automatiquement dans le carrousel horizontal.
- **Modifier les compétences** → éditer le tableau dans `skills.data.ts`.
- **Modifier le parcours** → éditer `journey.data.ts`.
- **Modifier les centres d'intérêt** → éditer `interests.data.ts`.
- **Modifier l'identité, le hero, le texte "à propos", le contact ou les liens sociaux** → tout est centralisé dans `portfolio.data.ts`.

### Vers une future API

`PortfolioService` (`src/app/core/services/portfolio.service.ts`) est le seul point
de contact entre les composants et les données. Chaque méthode renvoie un
`Observable`. Aujourd'hui elles résolvent depuis les fichiers `data/*.ts` ; demain,
il suffit de remplacer le corps de chaque méthode par un appel HTTP
(`this.http.get<Project[]>('/api/projects')`) vers une future API Spring Boot —
aucun composant n'a besoin d'être réécrit.

## À compléter avant mise en ligne

Rien n'a été inventé : ces informations sont laissées en placeholder explicite
dans `src/app/data/portfolio.data.ts` et `projects.data.ts` :

- `hero.visualImage` : chemin vers un vrai visuel (photo, illustration, capture).
  Tant qu'aucun fichier n'existe à ce chemin, `HeroVisualComponent` affiche
  automatiquement un placeholder sombre — rien ne casse visuellement.
- `social` (email, GitHub, LinkedIn, CV) dans `portfolio.data.ts`.
- Le champ `url` de chaque projet dans `projects.data.ts`, si vous voulez pointer vers une démo ou un repo.
- `public/assets/projects/*.svg` : à remplacer par de vraies captures d'écran (mêmes noms de fichiers, ou mettez à jour les chemins dans `projects.data.ts`).

## Notes techniques

- La section Projets utilise le scroll vertical de la page pour piloter un
  déplacement horizontal, sur toutes les tailles d'écran (desktop et mobile).
- Les polices (Space Grotesk, Inter, JetBrains Mono) sont chargées depuis Google
  Fonts dans `src/styles.css`.
- Palette dark : fond `#0D1117`, surfaces `#161B22` / `#21262D`, bordures `#30363D`,
  texte `#E6EDF3` / `#8B949E`, accent vert `#2EA043`.
