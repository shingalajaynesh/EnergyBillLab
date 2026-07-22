import type { DatabaseInstance } from '../clients/db-client';
import { US_GEOGRAPHIES } from '../constants/us-geographies';
import { electricityGeographies } from '../schema/electricity-geographies';

export async function seedGeographies(db: DatabaseInstance) {
  for (const g of US_GEOGRAPHIES) {
    await db
      .insert(electricityGeographies)
      .values({
        code: g.code,
        slug: g.slug,
        name: g.name,
        kind: g.kind,
        displayOrder: g.displayOrder,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: electricityGeographies.code,
        set: {
          slug: g.slug,
          name: g.name,
          kind: g.kind,
          displayOrder: g.displayOrder,
          updatedAt: new Date(),
        },
      });
  }
}
