# Mobile Design Plan

## Goal

Prepare the portfolio to work reliably on phones without flattening its existing visual identity. The mobile version should keep the editorial, split-layout character of the desktop site, but shift to a single-column, touch-first experience with readable typography, stable scrolling, and predictable navigation.

## What is currently breaking mobile

### 1. The app is built around desktop-height containers

Several key pages lock themselves to `100vh` or `calc(100vh - 80px)` and hide overflow:

- `src/pages/Home.js`
- `src/components/SplitPortfolioHome.js`
- `src/subsites/media_lab/Home.js`
- `src/components/ProjectPage.js`
- `src/subsites/media_lab/projectPages/BaseProjectPage.js`

This is risky on mobile because browser chrome changes viewport height while scrolling. The result is usually clipped content, awkward double scroll, and footer/header collisions.

### 2. The site depends on hover as a primary interaction

Hover is used to reveal context or imagery in:

- `src/pages/Home.js`
- `src/components/SplitPortfolioHome.js`
- `src/components/Category.js`
- `src/pages/SubSitePage.js`

Mobile users do not have hover. Right now the desktop interaction model is being compressed rather than replaced.

### 3. The homepage and subsite homes use multi-scroll layouts

The two-column split pages currently create separate scrolling regions with:

- `overflow-y: auto` on each side
- sticky labels inside each side
- hidden overflow on the outer container

That pattern is fragile on phones. Mobile should default to one page scroll, not multiple nested scroll containers.

### 4. Project cards are sized by viewport height, not content

Cards in `Home`, `Category`, `SubSitePage`, `SplitPortfolioHome`, and `media_lab/Home` use `25vh` plus minimum heights. On small screens this forces cramped text blocks, inconsistent spacing, and unnecessary truncation pressure.

### 5. The header compresses instead of reflowing

`src/components/Header.js` keeps a fixed `80px` header with multiple horizontal regions:

- title/subtitles
- animated text
- statement
- tag filters
- buttons

On mobile, the current approach mostly shrinks font sizes and hides some content. That is not enough when the header contains multiple competing UI responsibilities.

### 6. Project pages are not touch-first yet

`src/components/ProjectPage.js` and `src/subsites/media_lab/projectPages/BaseProjectPage.js` still optimize around large embeds and centered modal overlays:

- `MediaEmbed` shifts iframes upward on mobile with `transform: translateY(-25%)`
- info panels use large fixed overlays
- page content aims for vertical centering instead of natural document flow

This is likely to feel unstable on real devices.

### 7. About page layout is especially brittle

`src/pages/AboutMe.js` uses alternating floated paragraphs and large font sizing. That may look intentional on desktop, but on mobile it will likely create uneven widths, awkward whitespace, and reading-order issues.

### 8. There is already a mobile stylesheet, but it is too shallow

`src/styles/mobile.css` is imported globally, but most of the app uses styled-components and page-specific layout logic. The stylesheet mostly tweaks font sizes and widths. It does not address the structural issues above.

## Mobile design principles for this repo

### 1. Mobile gets its own layout rules, not just smaller desktop styles

Do not treat mobile as "desktop but reduced." For this codebase, mobile should become:

- single-column
- one primary scroll container per page
- touch-first
- content-led instead of viewport-led

### 2. Preserve the tone, change the mechanics

The portfolio has a deliberate editorial feel. Keep:

- serif/sans contrast
- uppercase titling
- strong dividers
- asymmetric rhythm

But replace:

- hover-only reveals
- fixed-height sections
- multi-panel scrolling
- ultra-tight text sizing

### 3. Shared responsive primitives should drive the rewrite

Right now the responsive logic is duplicated in many files. Mobile work should begin by defining shared layout decisions and then applying them consistently.

## Proposed mobile behavior by area

### Header

On mobile, the header should become a stacked block instead of a compressed toolbar:

- Row 1: title and back/info actions
- Row 2: subtitle lines
- Row 3: filter chips when present
- Optional statement content should move below, collapsible if needed
- Animated text should be removed or disabled on small screens

Implementation target:

- Refactor `src/components/Header.js`
- Replace fixed `height: 80px` with content-based height
- Add clear mobile breakpoints around `900px`, `768px`, and `480px`
- Increase tap targets for buttons and tags to at least comfortable thumb size

### Homepage and split portfolio views

Desktop can keep the split identity. Mobile should merge the two columns into one flowing feed:

- show section labels as separators, not sticky sub-headers inside nested panels
- render one vertical list: work section, then art section
- remove independent left/right scroll containers
- replace hover image behavior with either inline thumbnails or tap-to-expand previews
- keep filters, but present them as horizontal chips that wrap cleanly

Implementation targets:

- `src/pages/Home.js`
- `src/components/SplitPortfolioHome.js`
- `src/subsites/media_lab/Home.js`

### Category and subsite listing pages

These pages should move to content-sized cards:

- remove `25vh` card heights on mobile
- let cards grow naturally based on title, description, tags, and tools
- keep strong dividers, but add more vertical padding
- avoid swapping header text based on hover on mobile

Implementation targets:

- `src/components/Category.js`
- `src/pages/SubSitePage.js`

### Project detail pages

Project pages should behave like long-form mobile editorial pages:

- content flows top to bottom
- media uses full-width responsive containers
- no upward translation hacks for embeds
- info content becomes a bottom sheet, expandable section, or inline accordion instead of a large fixed modal
- intro/context/tech sections should be readable without pinch-zoom

Implementation targets:

- `src/components/ProjectPage.js`
- `src/subsites/media_lab/projectPages/BaseProjectPage.js`
- any custom project pages that assume wide media layouts

### About page

The about page should become a readable narrative list on mobile:

- remove float-based alternating text layout
- switch to a single column
- preserve alternation through typography, divider treatment, or subtle alignment changes instead of floats
- keep paragraph width near readable measure

Implementation target:

- `src/pages/AboutMe.js`

## Technical approach

### Phase 1: Audit and responsive foundation

1. Define breakpoints in one shared location.
2. Decide a mobile spacing scale, type scale, and tap target minimum.
3. Introduce shared responsive helpers for styled-components.
4. Stop relying on the old `mobile.css` file for major layout behavior.

Notes:

- Completed on 2026-04-12.
- Added shared responsive tokens in `src/styles/responsive.js`.
- Removed the `mobile.css` import from `src/index.js` so mobile layout is no longer driven by the old global stylesheet.
- Began consolidating spacing and breakpoint usage into shared styled-component helpers.

Suggested outcome:

- a small shared file for breakpoints and spacing tokens
- fewer ad hoc `@media (max-width: 768px)` blocks scattered with different behavior

### Phase 2: Fix global layout traps

1. Remove or reduce `height: 100vh`, `calc(100vh - ...)`, and `overflow: hidden` from page shells where possible.
2. Replace viewport-height card sizing with content-based sizing.
3. Ensure `html`, `body`, and `#root` allow natural page growth.
4. Review crosshair cursor behavior from `src/index.css`; it may not be appropriate on touch devices.

Notes:

- Completed on 2026-04-12.
- Updated `src/index.css` so `html`, `body`, and `#root` can grow naturally instead of behaving like fixed-height shells.
- Disabled the crosshair cursor on touch devices.
- Replaced several mobile `100vh`/locked-height assumptions in page shells and listing layouts with natural document flow.

Success condition:

- each page can scroll naturally on a phone without clipped content or nested scroll confusion

### Phase 3: Rebuild the header for mobile

1. Make the header content wrap vertically.
2. Separate action controls from descriptive content.
3. Make tags readable and tappable.
4. Remove overflow clipping that hides wrapped text.

Notes:

- Completed on 2026-04-12.
- Refactored `src/components/Header.js` from a fixed-height horizontal bar into a wrapping, content-driven layout.
- Tags and action buttons now have larger mobile tap targets and can wrap instead of being clipped.
- Statement and control regions now reflow below the title block on smaller screens.

Success condition:

- no title/subtitle truncation disasters
- filter controls remain usable on narrow screens

### Phase 4: Convert listing pages to a mobile feed pattern

1. Refactor split home pages into mobile single-column sections.
2. Refactor category and subsite cards to auto-height layouts.
3. Replace hover-preview logic with mobile-safe alternatives.

Options for previews:

- simplest: disable floating previews on mobile
- better: show a small inline thumbnail above or beside metadata
- best: add tap-to-preview media drawer if the visual preview is important

Recommendation:

- start by disabling floating/hover preview behavior on mobile, then add a clearer touch pattern later

Notes:

- Completed on 2026-04-12.
- Refactored `src/pages/Home.js`, `src/components/SplitPortfolioHome.js`, `src/components/Category.js`, `src/pages/SubSitePage.js`, and `src/subsites/media_lab/Home.js`.
- On mobile, list items are now content-sized instead of `25vh` cards.
- Split-column pages now stack into a single-column feed instead of relying on nested scroll regions.
- Homepage floating images were restored on mobile at a reduced size/opacity so the ambient visual system remains present without overpowering the layout.
- Hover-driven reveal behavior is still disabled on touch layouts where no clear mobile trigger exists yet.

### Phase 5: Convert project pages to mobile editorial layouts

1. Remove vertical centering as the default layout strategy.
2. Let embeds sit in normal flow with predictable spacing.
3. Replace fixed overlays for info with inline expandable sections or a simpler mobile sheet.
4. Audit custom project pages for wide-grid assumptions, especially image galleries and media blocks.

Success condition:

- project pages feel like articles, not like desktop presentations squeezed into a phone

Notes:

- Completed on 2026-04-12.
- `src/components/ProjectPage.js` now uses a document-flow mobile layout and shows info content inline on mobile instead of relying on a fixed overlay.
- `src/subsites/media_lab/projectPages/BaseProjectPage.js` was tightened so shared custom project pages inherit better mobile spacing, media sizing, and content proportions.
- Patched several custom project pages with mobile alignment/layout improvements, including `src/projectPages/SpiralReflector.js`, `src/projectPages/Submirrors.js`, `src/projectPages/AssemblyLine.js`, `src/projectPages/TheBeast.js`, and their media-lab equivalents where needed.

### Phase 6: Device testing and polish

Test at minimum:

- `390x844` iPhone-class viewport
- `393x852` Android tall viewport
- `768x1024` tablet portrait
- landscape phone viewport

Check specifically:

- sticky header behavior
- filter chip wrapping
- long project titles
- modal/info interactions
- embedded video visibility
- footer/button tap comfort

## File-level priority order

### Highest priority

- `src/components/Header.js`
- `src/pages/Home.js`
- `src/components/SplitPortfolioHome.js`
- `src/components/Category.js`
- `src/components/ProjectPage.js`

### Second priority

- `src/pages/SubSitePage.js`
- `src/subsites/media_lab/Home.js`
- `src/subsites/media_lab/projectPages/BaseProjectPage.js`
- `src/pages/AboutMe.js`

### Cleanup

- `src/styles/mobile.css`
- `src/index.css`

## Concrete implementation strategy

### Option A: Fast stabilization pass

Use this if the immediate goal is "not broken on mobile."

- remove viewport-locked heights
- remove nested scroll areas
- stack header content
- disable hover-driven previews on mobile
- let cards size to content
- simplify project info overlays on mobile

This is the best first step.

### Option B: Full responsive redesign

Use this after stabilization if the goal is a polished mobile-specific experience.

- create a unified mobile feed pattern
- design a dedicated mobile media preview interaction
- redesign the about page presentation
- create shared responsive primitives used across all subsite/custom pages

This should happen after Option A, not before.

## Recommended execution order

1. Refactor `Header.js`.
2. Refactor `Home.js` and `SplitPortfolioHome.js` into mobile single-column flows.
3. Refactor `Category.js` and `SubSitePage.js` to content-sized cards.
4. Refactor `ProjectPage.js` and `BaseProjectPage.js` to document-flow layouts.
5. Refactor `AboutMe.js`.
6. Remove obsolete rules from `src/styles/mobile.css`.
7. Test on real mobile viewport sizes and adjust spacing/type.

## Definition of done

The site is ready for mobile when:

- every page has one obvious scroll behavior
- no essential interaction depends on hover
- titles, subtitles, tags, and metadata remain readable at phone widths
- project media fits without hacks or clipping
- info panels and buttons are tappable and understandable
- the site still feels like the same portfolio, not a generic template
