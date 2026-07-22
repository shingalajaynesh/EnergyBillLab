# ADR-002: Ant Design Product System

## Status

Accepted

## Context

The public product needs consistent, accessible, professional UI without mixing incompatible component systems or scattering design constants.

## Decision

Ant Design is the required UI component system. Custom CSS is allowed for layout, composition, branding, responsive behavior, and visual refinement. Shared design tokens belong in `packages/design-system`.

## Consequences

The product gets a stable component foundation and SSR-compatible styling. Teams must avoid adding competing UI frameworks or one-off visual systems.

## Rules

- Do not add another general UI component framework.
- Use Ant Design components when they fit the product need.
- Use semantic HTML and CSS Modules for product layout and composition.
- Avoid generic AI-generated visual patterns, fake metrics, and decorative clutter.
- Accessibility and semantic HTML are mandatory.
- Avoid broad Ant Design barrel imports only when focused imports are available and proven useful.
