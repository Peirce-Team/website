Peirce Interprets Peirce
https://peirce-team.github.io/website/


A collaborative digital humanities project dedicated to exploring the original
manuscripts of Charles S. Peirce through OCR/HTR, NLP, knowledge graphs, and
interactive visualization.


── Structure ──────────────────────────────────────────────────────────────────

  index.html          Single-page site (Jekyll template)
  _layouts/
    default.html      HTML shell: head, nav, scripts
  _data/
    team.yml          Team members (principal investigators, research team,
                      research partners)
    advisory.yml      Advisory committee
    partners.yml      Partner institution logos
    publications.yml  Publication list
  assets/
    css/style.css     Custom stylesheet
    js/graphs.js      Animated RNG graph background (hero section)
    js/site.js        Bio modals, hamburger menu, active nav tracking
  images/
    members/          Team portrait photos
    logos/            Partner institution logos
  _config.yml         Jekyll configuration


── Development ────────────────────────────────────────────────────────────────

  Prerequisites: Ruby, Bundler

  Install dependencies:
    bundle install

  Run locally:
    bundle exec jekyll serve

  The site is available at http://localhost:4000/website/


── Deployment ─────────────────────────────────────────────────────────────────

  Deployed automatically to GitHub Pages via GitHub Actions on every push to
  main. The workflow is defined in .github/workflows/jekyll.yml.

  Live site: https://peirce-team.github.io/website/


── Content updates ─────────────────────────────────────────────────────────────

  All content is managed through the YAML files in _data/:

  Add a team member      →  _data/team.yml
  Add a publication      →  _data/publications.yml
  Add an advisor         →  _data/advisory.yml
  Add a partner logo     →  _data/partners.yml + images/logos/

  Team member photos go in images/members/ and should be square, minimum
  300×300px. Reference them in team.yml using the relative path from the
  project root (e.g. images/members/filename.jpg).


── Team ───────────────────────────────────────────────────────────────────────

  Davide Picca           University of Lausanne (PI)
  Irene Mittelberg †     RWTH Aachen University (Co-PI)
  Alessandro Adamou      Bibliotheca Hertziana – Max Planck Institute (Co-PI)
  Sebastian Feil         RWTH Aachen University
  Carlo Teo Pedretti     La Sapienza University of Rome
  Lorenzo Zangari        University of Lausanne
  Dario Rodighiero       University of Groningen
  Jeffrey Schnapp        Harvard University


── License ────────────────────────────────────────────────────────────────────

  © Peirce Interprets Peirce. All rights reserved.
