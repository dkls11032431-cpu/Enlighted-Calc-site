# Enlighted Calc — Hybrid Engineering Platform Redesign

**Status:** Audit and implementation plan  
**Decision:** Hybrid engineering knowledge + corporate technology platform  
**Scope:** Full visual and experience transformation; preserve existing content, routes, SEO equity and working tools  
**Repository:** `dkls11032431-cpu/Enlighted-Calc-site`  
**Production branch:** `main` (no changes made to it)

## 1. Product direction

Enlighted Calc should become a distinctive engineering decision platform under the Enlighted Technologies brand. It should combine:

- Corporate credibility and a clear company identity.
- Practical engineering calculators and decision-support tools.
- Field-oriented troubleshooting and technical explainers.
- Solar, electrical, energy-management, backup-power and industrial-IoT knowledge.
- Carefully disclosed, relevant equipment recommendations.

**Proposed positioning:**  
**Understand. Calculate. Diagnose. Improve.**  
Practical engineering intelligence for homes, facilities and industry.

The experience must not look like a generic blog, a generic SaaS dashboard, or a company brochure. The brand should feel technically credible, modern, useful and recognisably Enlighted.

## 2. Repository baseline reviewed

The current site is a static, multi-page HTML website hosted from GitHub Pages. It uses:

- Root-level `index.html` and topic folders with `index.html` pages.
- Shared stylesheet at `assets/css/style.css`.
- Shared navigation/breadcrumb/year script at `assets/js/main.js`.
- Existing logo asset at `assets/images/enlighted-logo.jpg`.
- Inline page-specific calculator markup and JavaScript in `calculators/index.html`.
- A sitemap containing the current public routes.
- Existing SEO metadata, canonical URLs, Open Graph metadata on reviewed pages, structured data on selected pages, skip links, and a mobile navigation.
- GitHub Actions workflows for site checks and a homepage visual preview.

The current homepage already has a navy/blue/teal identity, Manrope and DM Sans typography, category cards, an engineering-toolkit section, principles and a footer. The redesign should evolve this foundation, not discard it without reason.

## 3. Audit findings

### Strengths to retain

1. Clear subject taxonomy: Electrical, Solar, Energy Management, Backup Power, IoT & Automation, Reviews and Calculators.
2. Existing static-site architecture is lightweight and compatible with GitHub Pages.
3. Shared CSS and JavaScript provide a workable base for consistent components.
4. Existing calculator set gives visitors an immediate practical reason to use the site.
5. Existing policy pages and affiliate disclosure create a foundation for trust and monetisation.
6. Existing accessibility foundations include skip links, focus-visible styling and responsive navigation.
7. Existing canonical metadata and sitemap provide an SEO baseline.

### Gaps to address

1. **Distinctive product proposition:** The current homepage explains the subject areas, but the first screen does not yet demonstrate a signature tool or a compelling return-visit reason.
2. **Experience hierarchy:** Tools, diagnostic content, knowledge articles and company information need clearer roles and a more intentional discovery journey.
3. **Tool depth:** The current calculator page contains five core calculators (solar sizing, electricity cost, voltage drop, DG fuel and UPS runtime) plus a SIP calculator link. Results need stronger explanation, assumptions, limitations and next-step guidance.
4. **Troubleshooting experience:** The current category content is mainly explanatory. A structured symptom → checks → possible causes → safe next step format can make it more actionable.
5. **Trust and authorship:** Strengthen author/reviewer attribution only where real details are available; surface source references, review dates, calculation methods and correction routes.
6. **Consistency:** Standardise page headers, breadcrumbs, article metadata, callouts, tables, tool cards, related resources and affiliate modules.
7. **Accessibility and motion:** Add reduced-motion handling, keyboard testing, visible labels, contrast checks, error announcements and robust mobile interaction.
8. **Performance:** Review font loading, image dimensions/formats, layout shifts, script loading and third-party advertising impact.
9. **Measurement:** Define analytics events for calculator use, result generation, guide navigation and outbound affiliate clicks without collecting unnecessary personal data.

### Specific technical observations

- `assets/css/style.css` currently contains repeated refinement/override blocks. Consolidate tokens and component rules during implementation rather than stacking another layer of overrides.
- The stylesheet has responsive breakpoints but no detected `prefers-reduced-motion` or `prefers-color-scheme` handling.
- The homepage currently uses a CSS-drawn engineering motif and generic category cards; replace/upgrade only where a genuine product demonstration or useful visual will improve comprehension.
- The calculator page uses inline JavaScript and direct DOM access. Preserve its working calculations while progressively extracting reusable logic and adding validation/testing.
- Existing content includes affiliate search links. Keep recommendations contextual, clearly disclosed and secondary to the technical answer.
- The About page currently describes the initiative but does not establish named authors, qualifications or independently verifiable project credentials. Do not invent these.

## 4. Target information architecture

Keep all current URLs. Improve the navigation and internal linking around these experience areas:

### A. Engineering Decision Studio
A central tools index with filters or grouped entry points:
- Electrical and power calculations.
- Solar sizing and economics.
- Backup power and UPS runtime.
- Energy consumption and cost.
- Industrial/IoT utilities as they are developed.

Each tool should show inputs, units, formula/method, assumptions, result, interpretation, limitations and a relevant next step. Save/share/export features are later enhancements and must not be promised until implemented and tested.

### B. Electrical Troubleshooting Centre
A structured library organised around real symptoms:
- Voltage imbalance and abnormal readings.
- Neutral and earthing faults.
- Protective-device trips.
- High consumption and power factor.
- Metering and CT polarity issues.

Each diagnostic guide should distinguish safe observations from work requiring a qualified electrician. Never instruct unqualified visitors to work on live equipment.

### C. Energy Intelligence
A practical destination for:
- Electricity-bill interpretation.
- Appliance and load analysis.
- Energy-efficiency opportunities.
- Solar feasibility and consumption matching.
- Demand, power factor and submetering.

### D. Industrial Automation Lab
A focused destination for:
- Modbus RTU/TCP concepts and troubleshooting.
- RS-485 wiring and communication diagnostics.
- PLC, gateway and IoT integration.
- Monitoring and dashboard architecture.
- Practical examples, configuration references and tools.

### E. Corporate / Company layer
Retain About, Contact, Editorial Policy, Affiliate Disclosure, Privacy and Terms. Make the corporate relationship to Enlighted Technologies clear without turning every page into a sales page.

## 5. Homepage experience blueprint

1. **Header:** Existing logo, compact category navigation, prominent Tools entry and a clear About/Company path. Mobile navigation must remain keyboard accessible.
2. **Hero:** Strong product proposition, short supporting copy and two clear actions: open tools and explore troubleshooting/knowledge.
3. **Quick-start task launcher:** Visitors choose what they want to do (calculate, troubleshoot, understand, compare) rather than having to understand the site taxonomy first.
4. **Featured tools:** Show real calculators with example use cases and concise input/output descriptions.
5. **Troubleshooting spotlight:** Highlight a few high-intent practical problems.
6. **Knowledge pathways:** Electrical, Solar, Energy, Backup Power and Industrial Automation.
7. **Field notes / recently reviewed:** Only show real, dated content with honest review metadata.
8. **Trust block:** Editorial method, calculation transparency, safety policy and contact route.
9. **Relevant equipment recommendations:** Limited, contextual and visibly disclosed.
10. **Corporate footer:** Consistent company identity, policies, contact and navigation.

## 6. Visual and interaction system

### Brand
- Retain the Enlighted logo and navy/blue/teal foundation.
- Use a restrained technical palette with accessible contrast; reserve accent colours for meaningful status and data.
- Keep Manrope for display/headings and DM Sans for body/UI unless performance or rendering tests justify a change.
- Use consistent spacing, radii, border, shadow, typography and content-width tokens.
- Prefer original diagrams, simplified system schematics and real interface previews over decorative stock imagery.

### Components to standardise
- Header/navigation and breadcrumb.
- Hero and page intro.
- Tool cards and calculator panels.
- Result summary and formula/method panel.
- Safety, assumptions, source and limitation callouts.
- Article metadata and table of contents.
- Related guides and next-step links.
- Affiliate recommendation module.
- Footer and policy navigation.

### Interaction principles
- Mobile-first, thumb-friendly controls.
- No essential information hidden behind hover.
- Clear validation messages and empty/error states.
- Keyboard-operable menus and controls.
- Respect `prefers-reduced-motion`.
- No autoplay, intrusive popups or artificial urgency.
- Avoid dark patterns and excessive ad density.

## 7. Full redesign implementation plan

Implement in reviewable stages on feature branches. This plan PR does not itself change the production site.

### Phase 0 — Baseline and safety net
- Record current route inventory from the sitemap and repository.
- Capture baseline screenshots at mobile, tablet and desktop widths.
- Run link, HTML, accessibility and calculator regression checks.
- Add or improve automated checks for required routes, canonical URLs, metadata, sitemap entries and broken local links.
- Confirm GitHub Pages deployment workflow and preview workflow behaviour.

**Acceptance:** Baseline is documented; all current routes and calculator behaviours are captured before visual changes.

### Phase 1 — Design system and shared shell
- Consolidate CSS design tokens and remove duplicate override blocks safely.
- Refine shared header, navigation, footer, page container, breadcrumbs and focus states.
- Establish reusable page and component patterns in the existing static architecture.
- Add reduced-motion support and verify responsive/keyboard behaviour.

**Acceptance:** Shared shell is consistent on all page types; no existing route or page content is lost.

### Phase 2 — Homepage transformation
- Build the new hybrid platform homepage using the blueprint above.
- Add task-based entry points and featured tools using only existing, working destinations.
- Strengthen the company/brand relationship and trust messaging.
- Keep existing homepage SEO title, description, canonical and structured data accurate.

**Acceptance:** Visitors can identify what the platform does and reach a useful tool or guide quickly on mobile and desktop.

### Phase 3 — Engineering Decision Studio
- Redesign calculator index and individual calculator presentation.
- Preserve formulas unless a calculation is independently verified before modification.
- Add units, example inputs, assumptions, interpretation and limitations.
- Add robust validation, accessible result announcements and test cases.
- Do not add financial or engineering claims that are not supported by the calculation method.

**Acceptance:** Existing calculator outputs match baseline test cases; invalid inputs are handled; each result explains what it means and what it does not mean.

### Phase 4 — Knowledge and troubleshooting experience
- Standardise topic landing pages and article templates.
- Introduce symptom-led troubleshooting pages and cross-links to relevant calculators.
- Add source lists, author/reviewer fields and reviewed dates only when verifiable.
- Preserve all current article text and improve structure without silently changing technical meaning.

**Acceptance:** Existing guides remain accessible at their current URLs; related content is discoverable; safety boundaries are explicit.

### Phase 5 — Industrial Automation Lab and Energy Intelligence
- Improve Modbus/IoT and energy-management pathways.
- Add practical diagrams, reference tables and tools where supported by reliable source material.
- Prioritise high-value utilities based on actual user demand rather than adding empty category pages.

**Acceptance:** Each new feature is functional, tested and tied to a real engineering use case.

### Phase 6 — Trust, SEO, monetisation and performance
- Audit titles, descriptions, canonical URLs, headings, internal links, structured data and sitemap.
- Maintain AdSense and Amazon Associates disclosures and policy pages.
- Keep affiliate links relevant, accurately described and clearly secondary to independent technical guidance.
- Add privacy-conscious analytics events if analytics is configured and consent/legal requirements are satisfied.
- Optimise images, font loading, script loading, layout stability and Core Web Vitals.

**Acceptance:** No duplicate canonical routes, broken internal links, missing affiliate disclosures or unverified product claims.

### Phase 7 — Release and post-release review
- Test every route and navigation path.
- Test calculator cases and mobile layouts.
- Check accessibility, keyboard navigation, contrast, reduced motion and error states.
- Review GitHub Actions and GitHub Pages deployment.
- Publish only after explicit owner approval of the pull request.
- Monitor Search Console, analytics and Associates reports after release.

**Acceptance:** Release checklist is complete and owner approves the PR. No automatic merge.

## 8. URL, content and deployment safeguards

These are non-negotiable:

1. Do not rename, delete or move existing public routes.
2. Keep trailing-slash URL conventions and update internal links consistently.
3. Preserve existing canonical URLs, sitemap coverage, robots.txt, CNAME, ads.txt and Google verification file.
4. Do not remove AdSense or Amazon Associates integration.
5. Preserve existing articles and calculator functionality; technical changes require verification.
6. Do not fabricate authors, qualifications, customer testimonials, project references, certifications, statistics or product test results.
7. Do not introduce a framework/build system migration unless a demonstrated need outweighs GitHub Pages simplicity.
8. Do not commit redesign work directly to `main`.
9. Use feature branches and pull requests with preview/test evidence.
10. Do not merge any redesign PR without the owner's explicit approval.

## 9. Test and review matrix

| Area | Required checks |
|---|---|
| Routes | Every current sitemap URL resolves; no unintended redirects/404s |
| Navigation | Desktop, mobile, keyboard and current-page state |
| Content | No missing sections, broken anchors or lost articles |
| Calculators | Baseline examples, boundary values, invalid/empty inputs |
| Accessibility | Labels, focus order, contrast, landmarks, reduced motion, result announcements |
| SEO | Titles, descriptions, canonicals, headings, sitemap, robots, structured data |
| Affiliate | Correct tracking tag, disclosure, sponsored/nofollow attributes, relevant destination |
| Performance | Image sizing, font loading, layout shifts, script impact |
| Deployment | GitHub Actions checks, Pages build and post-deploy smoke test |

## 10. Success measures

Establish a baseline before setting targets. Track:
- Tool engagement and completed calculations.
- Visits from a tool result to a related guide.
- Repeat visitors and return sessions.
- Organic impressions/clicks and landing-page engagement.
- Internal search/navigation use if search is implemented.
- Affiliate outbound clicks and reported qualifying orders separately.
- Mobile usability, accessibility defects and page performance.

Do not use raw page views as the only success measure. A useful platform should help visitors complete an engineering task and find the next relevant resource.

## 11. Immediate next implementation PR

After the owner reviews this plan, the first implementation PR should be deliberately limited to **Phase 1 shared design system + homepage transformation**. It should include:
- Before/after screenshots at agreed viewport sizes.
- A list of files changed and rationale.
- Route/metadata preservation checks.
- Mobile and keyboard test results.
- GitHub Actions results.
- A preview URL if the existing preview workflow supports it.

Calculator and article redesigns should follow in separate PRs so regressions are easier to isolate and review.

---

**Current decision record:** Hybrid engineering knowledge + corporate technology platform; full transformation; existing routes and content retained; feature-branch/PR workflow; production merge requires explicit owner approval.
