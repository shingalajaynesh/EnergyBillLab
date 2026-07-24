# Active Task

## Current Task

- Phase: Five Source-Reviewed Appliance Energy Guides
- Status: Completed (Created 5 production appliance guides supporting the 5 appliance expansion calculators — No active implementation task)
- Verified Routes:
  - `/guides/how-much-electricity-does-a-refrigerator-use`
  - `/guides/how-much-does-it-cost-to-run-an-electric-clothes-dryer`
  - `/guides/how-much-does-it-cost-to-run-an-electric-water-heater`
  - `/guides/how-much-does-it-cost-to-run-a-pool-pump`
  - `/guides/how-much-does-it-cost-to-run-a-dehumidifier`
- Scope & Alignment:
  - 10 total guides published across `/guides` hub (5 diagnostic + 5 appliance benchmarks).
  - Each guide links directly to its matching calculator.
  - Worked examples use pure `@energy-bill-lab/calculation-engine` functions.
  - Source attributions to U.S. DOE, U.S. EIA, ENERGY STAR, EPA, and FTC EnergyGuide.
  - Refrigerator annual mode does not double-adjust duty cycle.
  - Dryer guide covers electric dryers only (0 gas cost).
  - Water heater guide covers electric resistance only (0 heat pump model).
  - Pool pump guide uses electrical watts (0 horsepower conversion error).
  - Dehumidifier guide uses electrical wattage/duty cycle (0 pint capacity cost derivation).
  - 100% valid semantic HTML tables with `<table aria-label="...">`, `<caption>`, and `<th scope="col">`.
  - Protected files (`db-client.ts`, `apps/web/package.json`, `turbo.json`, `vercel.json`, `render.yaml`) remain 100% untouched.
- Strict Git Rules: Read-only Git commands only. All changes remain unstaged in working tree.
- Suggested Commit: `feat(guides): add five appliance energy guides`
