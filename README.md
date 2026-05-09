# Dum Tak — Website Redesign

A static, multi-page redesign of dumtak.org. Drop-in handoff: pure HTML/CSS/JS with no build step. Open `index.html` in a browser and the whole site works.

## Files

```
dumtak/
├── index.html       Homepage
├── science.html     The science (long-form explainer)
├── work.html        Our work (four programs detailed)
├── about.html       About / origin story
├── contact.html     Contact, donate, host, newsletter
├── styles.css       All site styles
├── script.js        Nav toggle, scroll reveal, "Dum… Tak" audio
└── README.md        This file
```

## Design system

- **Type**: Fraunces (display serif, italic accents) + Inter Tight (UI sans). Both via Google Fonts.
- **Palette**: warm cream/coral/rust on bone background. Primary accent is a deep coral (`#4a1b0c`).
- **Motif**: a literal heartbeat — pulsing dot in the hero, animated wave rings in the hero artwork, and a synthesized "Dum… Tak" audio button.
- **Tone**: editorial, warm, confident. Italic emphasis ("There is the *beat*…") is a recurring device — use sparingly.

## Things to replace before launch

1. **Photography.** All decoration is currently CSS/SVG only. The hero artwork is a placeholder; replace with real session photos (musicians sitting on the floor with kids). Replace stock metaphors with documentary photography wherever possible.
2. **Copy.** All testimonials, partner counts, and program statistics are illustrative. Replace with real numbers and real quotes — get permission from the partner institution before publishing.
3. **EIN.** Replace `xx-xxxxxxx` in the footer with your actual EIN.
4. **Donation links.** The "Give once" / "Give monthly" buttons in `contact.html` link to `#`. Wire them to your payment processor (Stripe, Donorbox, Givebutter, etc.).
5. **Form handlers.** Both forms in `contact.html` show a JS alert on submit. Wire them to your backend or a service like Formspree, Basin, or Netlify Forms.
6. **Email + phone.** Update `hello@dumtak.org` and `(617) 555-0142` in `contact.html` and the contact links throughout.
7. **Founder name.** The About page is written in the founder's voice but signs off as "— The founder." Replace with the real name.
8. **Audio.** The "Hear Dum… Tak" button uses Web Audio synthesis. Consider replacing with a recording from a real session — same button, swap the JS for an `<audio>` element.

## Hosting

This is fully static. Any of these will work with zero config:
- **Netlify** or **Vercel** — drop the folder in, done. Both have free tiers and built-in form handling.
- **Cloudflare Pages** — free, fast.
- **GitHub Pages** — free, push to a repo.

## Accessibility notes

- Semantic HTML throughout (`<nav>`, `<header>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Color contrast meets WCAG AA on all text/background combinations.
- All interactive elements are reachable by keyboard.
- The audio button only plays on user click (no autoplay).
- Reduced-motion users: the hero heartbeat and wave-ring animations are decorative; consider wrapping them in `@media (prefers-reduced-motion: reduce)` if you want to be conservative.

## Browser support

Modern evergreen browsers (last two versions of Chrome, Safari, Firefox, Edge). Web Audio API used for the audio button — gracefully no-ops on unsupported browsers.
