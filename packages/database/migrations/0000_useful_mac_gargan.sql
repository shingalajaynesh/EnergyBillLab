CREATE TABLE "data_import_runs" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"source" varchar(20) NOT NULL,
	"dataset" varchar(100) NOT NULL,
	"import_type" varchar(30) NOT NULL,
	"status" varchar(20) NOT NULL,
	"requested_start_period" date,
	"requested_end_period" date,
	"source_total_rows" integer,
	"fetched_rows" integer,
	"validated_rows" integer,
	"inserted_rows" integer,
	"updated_rows" integer,
	"unchanged_rows" integer,
	"rejected_rows" integer,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"error_code" varchar(50),
	"error_summary" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "electricity_geographies" (
	"code" varchar(10) PRIMARY KEY NOT NULL,
	"slug" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"kind" varchar(20) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"display_order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "electricity_geographies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "electricity_retail_sales_monthly" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"geography_code" varchar(10) NOT NULL,
	"period" date NOT NULL,
	"sector" varchar(10) DEFAULT 'RES' NOT NULL,
	"price_cents_per_kwh" numeric(10, 4) NOT NULL,
	"revenue_million_usd" numeric(12, 4),
	"sales_million_kwh" numeric(12, 4),
	"customers" bigint,
	"source" varchar(20) DEFAULT 'EIA' NOT NULL,
	"source_dataset" varchar(100) DEFAULT 'electricity/retail-sales' NOT NULL,
	"import_run_id" varchar(64),
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "electricity_retail_sales_monthly" ADD CONSTRAINT "electricity_retail_sales_monthly_geography_code_electricity_geographies_code_fk" FOREIGN KEY ("geography_code") REFERENCES "public"."electricity_geographies"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "geography_period_sector_unique_idx" ON "electricity_retail_sales_monthly" USING btree ("geography_code","period","sector");--> statement-breakpoint
CREATE INDEX "geography_period_idx" ON "electricity_retail_sales_monthly" USING btree ("geography_code","period");--> statement-breakpoint
CREATE INDEX "period_desc_idx" ON "electricity_retail_sales_monthly" USING btree ("period");--> statement-breakpoint
CREATE INDEX "import_run_id_idx" ON "electricity_retail_sales_monthly" USING btree ("import_run_id");