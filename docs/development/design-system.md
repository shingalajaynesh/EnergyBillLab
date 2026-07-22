# Design System Guidelines

**Package:** `packages/design-system`  
**App Integration:** `apps/web`  
**Document:** `docs/development/design-system.md`

---

## 1. Ant Design Authority

As mandated by ADR-002, **Ant Design** is the sole UI component framework for Energy Bill Lab.

- **Tokens:** Centralized in `packages/design-system/src/theme.ts`.
- **Primary Palette:** Deep energy green (`#176b5b` brand, `#104c41` brand strong, `#e8f5e9` soft surface).
- **Typography:** `Inter`, system UI font stack with high readability.
- **SSR Registry:** `@ant-design/nextjs-registry` (`AntdRegistry`) wraps `AppThemeProvider` in `apps/web/src/app/layout.tsx`.

---

## 2. Visual Rules (No AI Slop)

1. **No Startup Purple Gradients:** Use restrained energy & data-utility colors.
2. **No Neon Glow or Glassmorphism:** Clean, flat, subtle border-based layout design (`#eaecf0` borders).
3. **Card Discipline:** Cards are used only for meaningful content grouping, not nested inside cards.
4. **No Fake Elements:** No fake testimonials, fake counters, fake security seals, or fake live numbers.
5. **Icon Rules:** Decorative icons are hidden from screen readers (`aria-hidden="true"`). Ant Design icons (`@ant-design/icons`) are used consistently.
