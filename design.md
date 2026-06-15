---
version: alpha
name: Saweria Playful Mono
description: A bright, friendly creator-support system mixing playful illustration with monospaced structure.
colors:
  primary: "#1A202C"
  secondary: "#FAAE2B"
  tertiary: "#F2F7F5"
  neutral: "#FFFFFF"
  surface: "#F2F7F5"
  on-surface: "#1A202C"
  background: "#FFFFFF"
  error: "#E45C5C"
  accent: "#000000"
typography:
  headline-display:
    fontFamily: Comfortaa
    fontSize: 48px
    fontWeight: 300
    lineHeight: 57.6px
    letterSpacing: 0px
  headline-lg:
    fontFamily: Comfortaa
    fontSize: 36px
    fontWeight: 300
    lineHeight: 43px
    letterSpacing: 0px
  headline-md:
    fontFamily: Comfortaa
    fontSize: 28px
    fontWeight: 300
    lineHeight: 36px
    letterSpacing: 0px
  headline-sm:
    fontFamily: IBM Plex Mono
    fontSize: 21px
    fontWeight: 300
    lineHeight: 25px
    letterSpacing: 0px
  body-lg:
    fontFamily: IBM Plex Mono
    fontSize: 18px
    fontWeight: 300
    lineHeight: 28px
    letterSpacing: 0px
  body-md:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: 300
    lineHeight: 24px
    letterSpacing: 0px
  body-sm:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: 300
    lineHeight: 20px
    letterSpacing: 0px
  label-lg:
    fontFamily: IBM Plex Mono
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0px
  label-md:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
  caption:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 300
    lineHeight: 16px
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 20px
  lg: 32px
  xl: 76px
  gutter: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    size: "120px"
    height: "40px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "12px 12px 16px"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  chip:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
---

# Saweria Playful Mono

## Overview
Saweria feels cheerful, approachable, and creator-first, with a light editorial structure underneath the playful mascot-driven art. The interface is intentionally spacious and low-stress, using a bright white canvas, bold accent color, and simple framed cards to keep the experience easy to scan. It targets creators and supporters who need a trustworthy payment/support flow that still feels warm and fun.

## Colors
- **Primary (#1A202C):** A deep charcoal-ink used for body text, outlines, button fills, and the core sense of structure.
- **Secondary (#FAAE2B):** A lively golden orange that acts as the brand’s energetic highlight for top bars, key actions, and visual warmth.
- **Tertiary (#F2F7F5):** A soft mint-tinted off-white used for cards and content panels, giving the interface a gentle paper-like surface.
- **Neutral (#FFFFFF):** Clean white background space that keeps the page airy and makes illustrations and cards pop.
- **Surface (#F2F7F5):** The main panel background for containers and cards; it reinforces the handcrafted, note-card feel.
- **On-surface (#1A202C):** The readable ink color for content placed on cards and panels.
- **Background (#FFFFFF):** The page backdrop, kept neutral and uncluttered to emphasize the central content column.
- **Error (#E45C5C):** A warm red reserved for status states and validation rather than primary brand expression.
- **Accent (#000000):** Pure black is used as a hard outline/shadow color to create the signature cutout look.

## Typography
The system combines two distinct voices: Comfortaa for big, friendly headlines and IBM Plex Mono for the functional body and labels. Comfortaa is very light in weight and rounded in feel, which supports the whimsical mascot and welcoming tone of the brand. IBM Plex Mono gives the interface a pragmatic, semi-technical rhythm for body copy, buttons, lists, and onboarding steps, with no visible uppercase tracking treatment or decorative letter spacing. Headline-display, headline-lg, and headline-md should stay soft and approachable; body and label styles should remain highly legible and slightly utilitarian.

## Layout & Spacing
The page is built around a centered, narrow content column with generous empty margins on both sides, creating a calm and focused landing experience. Vertical rhythm is loose and simple, using an 8px-based spacing scale with clear jumps at 16px, 20px, 32px, and a large 76px gap for major sections. Cards use internal padding instead of dense nested layout, and the top hero area breathes before the first action buttons appear. The overall structure favors stacked modules over complex grids, with content aligned centrally and large sections separated by whitespace.

## Elevation & Depth
Depth is created almost entirely through hard offset shadows and strong borders rather than blur or layered translucency. Cards and buttons use a crisp black shadow offset to the lower right, producing a playful cut-paper or sticker effect. The visual hierarchy comes from contrast, outline, and shadow direction, not from soft elevation gradients. This keeps the UI flat in material terms but visually punchy and tactile.

## Shapes
The shape language is modestly rounded and friendly, with 4px corners on buttons and a slightly softer 6px radius on cards. Nothing is overly pill-shaped except utility chips, so the system feels hand-made but still tidy. Avoid sharp 0px corners for primary interactive surfaces unless something is explicitly meant to read as a link or code-like element.

## Components
Buttons should feel compact, energetic, and highly legible. Use `button-primary` for the filled dark CTA with golden text, and `button-secondary` for outlined or transparent actions. Button sizing is consistent: about 120px minimum width and 40px height, with 8px 16px padding and mono text at label scale. Hover states should swap emphasis rather than add effects: `button-primary-hover` can invert toward the warm secondary tone while preserving the simple hard-edge style.

Cards use `card` styling: a soft mint surface, 1px black border, 6px rounding, 12px/12px/16px padding, and a strong offset shadow. Keep cards content-forward and text-heavy, with illustrations tucked to one side rather than centered above everything. Inputs should mirror the same soft panel logic as cards but remain simpler: light surface, black or deep-ink text, and modest 4px–6px rounding.

Chips and small tags should be compact and rounded, ideally using `chip` with a full radius to contrast with the more rectangular cards. Links should remain understated and text-only, using `button-link` or equivalent styles with no shadow and minimal chrome. Lists and onboarding steps should stay monospaced, orderly, and sparse, using simple bullet or numbered formatting without decorative separators.

## Do's and Don'ts
- Do keep the layout centered, airy, and easy to scan.
- Do preserve the hard black shadow-and-border look on cards and major buttons.
- Do use Comfortaa only for large expressive headlines.
- Do use IBM Plex Mono for body copy, buttons, lists, and utility text.
- Do keep the golden orange as the main accent for calls to action and brand warmth.
- Don't introduce soft drop shadows, gradients, or glassmorphism.
- Don't over-round buttons or cards into pills unless a chip is specifically needed.
- Don't make the interface dense; maintain generous whitespace between major blocks.