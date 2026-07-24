# Backup & Rollback Operational Standard

**Site:** EnergyBillLab.com  
**Document:** `docs/operations/backup-and-rollback.md`  
**Status:** Active Operations Standard  
**Last Updated:** July 24, 2026

---

## 1. Database Backup & Point-In-Time Recovery (Neon PostgreSQL)

- **Automated Backups:** Neon PostgreSQL manages continuous WAL archiving and automated daily snapshots.
- **Point-in-Time Recovery (PITR):** In the event of data corruption during EIA imports or migration failures, Neon allows restoring database state to any timestamp within the retention window via the Neon console or CLI.
- **Preservation of Last-Known-Good Data:** The EIA sync process is non-destructive; imported monthly records are appended into `electricity_retail_sales_monthly`. If an EIA sync run fails, existing historical rows remain intact and active.

---

## 2. Frontend Rollback Procedures (Vercel)

If a deployment flaw or hydration error is detected on production web:

1. Log into the Vercel Dashboard for `energybilllab`.
2. Navigate to **Deployments**.
3. Select the previous stable deployment.
4. Click **Instant Rollback** to restore production traffic immediately without rebuild delay.

---

## 3. API & Scheduled Service Rollback (Render)

If a NestJS API deployment or sync job fails on Render:

1. Log into the Render Dashboard.
2. Select the `@energy-bill-lab/api` service.
3. Navigate to **Events & Deployments**.
4. Roll back to the last successful image build.

---

## 4. Post-Rollback Verification

After executing any rollback:

1. Verify `https://energybilllab.com/` returns HTTP 200.
2. Run `/api/health` check.
3. Confirm state rate tables display correct historical EIA records.
4. Validate that `sitemap.xml` and `ads.txt` remain accessible.
