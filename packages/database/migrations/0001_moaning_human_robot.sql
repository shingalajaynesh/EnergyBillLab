CREATE TABLE "natural_gas_geographies" (
	"code" varchar(10) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(20) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "natural_gas_residential_prices_monthly" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"geography_code" varchar(10) NOT NULL,
	"period" date NOT NULL,
	"sector" varchar(10) DEFAULT 'RES' NOT NULL,
	"price_dollars_per_mcf" numeric(10, 4) NOT NULL,
	"price_dollars_per_therm" numeric(10, 4) NOT NULL,
	"conversion_method" varchar(50) DEFAULT 'EIA_HEAT_CONTENT_1036_BTU',
	"conversion_assumptions" varchar(255) DEFAULT '1 Mcf = 1,036,000 Btu = 10.36 therms (1036 Btu/cu ft average heat content)',
	"source" varchar(20) DEFAULT 'EIA' NOT NULL,
	"source_dataset" varchar(100) DEFAULT 'natural-gas/pri/sum' NOT NULL,
	"import_run_id" varchar(64),
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "natural_gas_residential_prices_monthly" ADD CONSTRAINT "natural_gas_residential_prices_monthly_geography_code_natural_gas_geographies_code_fk" FOREIGN KEY ("geography_code") REFERENCES "public"."natural_gas_geographies"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ng_geography_period_sector_unique_idx" ON "natural_gas_residential_prices_monthly" USING btree ("geography_code","period","sector");--> statement-breakpoint
CREATE INDEX "ng_geography_period_idx" ON "natural_gas_residential_prices_monthly" USING btree ("geography_code","period");--> statement-breakpoint
CREATE INDEX "ng_period_desc_idx" ON "natural_gas_residential_prices_monthly" USING btree ("period");--> statement-breakpoint
CREATE INDEX "ng_import_run_id_idx" ON "natural_gas_residential_prices_monthly" USING btree ("import_run_id");