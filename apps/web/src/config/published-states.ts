export type StateSource = {
  organization: string;
  title: string;
  url: string;
  supportedTopic: string;
  name?: string;
};

export type PublishedStateConfig = {
  code: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  marketType:
    | 'Regulated Utility Market'
    | 'Retail Choice / Deregulated Market'
    | 'Retail supplier choice with regulated distribution'
    | 'Mixed municipal, cooperative, and investor-owned structure'
    | 'Hybrid Market';
  isPublished: boolean;
  keyFactors: Array<{
    title: string;
    description: string;
  }>;
  sources: StateSource[];
  relatedStateSlugs: string[];
};

export type FirstTenStateConfig = PublishedStateConfig;

export const PUBLISHED_STATES: Record<string, PublishedStateConfig> = {
  california: {
    code: 'CA',
    slug: 'california',
    name: 'California',
    metaTitle: 'California Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'View California residential electricity rates, average monthly household bills, EIA historical trends, and climate-driven energy drivers.',
    overview:
      'California residential electricity rates rank among the highest in the contiguous United States. Rates are driven by aggressive renewable energy procurement goals, wildfire mitigation infrastructure investments, grid modernization initiatives, and high peak summer cooling demand.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Renewable Mandates & Grid Transition',
        description:
          'California clean energy legislation accelerates solar and utility-scale battery storage investments that influence baseline residential delivery rates.',
      },
      {
        title: 'Tiered & Time-of-Use Rate Structures',
        description:
          'Investor-owned utilities (PG&E, SCE, SDG&E) heavily utilize mandatory Time-of-Use (TOU) rates where electricity costs peak during late afternoon and evening hours (4 p.m. to 9 p.m.).',
      },
      {
        title: 'Wildfire Mitigation & Reliability Surcharges',
        description:
          'Public Utilities Commission (CPUC) approved capital expenditures for undergrounding power lines and vegetation management contribute to non-fuel fixed delivery costs.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential electricity sales and retail revenue',
      },
      {
        organization: 'California Public Utilities Commission (CPUC)',
        title: 'California Electric Utility Regulation & Rate Cases',
        name: 'California Public Utilities Commission (CPUC)',
        url: 'https://www.cpuc.ca.gov/',
        supportedTopic: 'Utility rate structure and wildfire mitigation surcharges',
      },
    ],
    relatedStateSlugs: ['texas', 'washington', 'arizona', 'oregon'],
  },
  texas: {
    code: 'TX',
    slug: 'texas',
    name: 'Texas',
    metaTitle: 'Texas Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Explore Texas average residential electricity rates, monthly power costs, ERCOT grid context, and retail choice price benchmarks.',
    overview:
      'Texas operates the largest deregulated ERCOT electricity market in North America. While competitive retail providers offer fixed and variable plans, residential rates reflect natural gas generation pricing, rapid wind and solar expansion, and extreme summer air conditioning demand.',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'ERCOT Grid & Market Structure',
        description:
          'The Electric Reliability Council of Texas (ERCOT) manages the grid for 90% of Texas residents. High summer temperatures drive peak demand, influencing wholesale generation costs.',
      },
      {
        title: 'Retail Choice & Transmission Charges',
        description:
          'In deregulated areas, households select Retail Electric Providers (REPs) for energy supply while regulated Transmission and Distribution Utilities (TDUs like CenterPoint and Oncor) assess fixed delivery fees.',
      },
      {
        title: 'Natural Gas & Renewable Supply Mix',
        description:
          'Natural gas generation sets marginal energy prices, though Texas leads the nation in total wind energy production and utility-scale solar buildouts.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential rate metrics',
      },
      {
        organization: 'Public Utility Commission of Texas (PUCT)',
        title: 'Texas Retail Electric Provider Oversight & Power to Choose',
        name: 'Public Utility Commission of Texas (PUCT)',
        url: 'https://www.puc.texas.gov/',
        supportedTopic: 'Retail market restructuring and TDU delivery charges',
      },
    ],
    relatedStateSlugs: ['california', 'florida', 'illinois', 'louisiana'],
  },
  florida: {
    code: 'FL',
    slug: 'florida',
    name: 'Florida',
    metaTitle: 'Florida Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Analyze Florida residential electricity rates, average monthly AC energy bills, utility fuel adjustments, and EIA rate trends.',
    overview:
      'Florida residential electricity usage is dominated by year-round air conditioning and heat pump operation. Rates are regulated by the Florida Public Service Commission and closely linked to natural gas import costs and storm hardening infrastructure projects.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Year-Round Air Conditioning Demand',
        description:
          'Florida households average higher total annual electricity consumption than the national average due to prolonged summer cooling and high humidity levels.',
      },
      {
        title: 'Natural Gas Fuel Dependence',
        description:
          'A major share of Florida net electricity generation comes from natural gas plants, making monthly utility fuel clause adjustments sensitive to natural gas commodity spot prices.',
      },
      {
        title: 'Storm Hardening & Undergrounding',
        description:
          'Major investor-owned utilities (FPL, Duke Energy Florida, Tampa Electric) pass approved hurricane resilience and undergrounding costs to residential retail tariffs.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential revenue and kWh sales',
      },
      {
        organization: 'Florida Public Service Commission (PSC)',
        title: 'Florida Electric Utility Rate Filings & Fuel Adjustments',
        name: 'Florida Public Service Commission (PSC)',
        url: 'https://www.psc.state.fl.us/',
        supportedTopic: 'Utility fuel adjustment clauses and storm hardening riders',
      },
    ],
    relatedStateSlugs: ['georgia', 'texas', 'north-carolina', 'alabama'],
  },
  'new-york': {
    code: 'NY',
    slug: 'new-york',
    name: 'New York',
    metaTitle: 'New York Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Discover New York residential electricity rates, NYC vs Upstate cost drivers, EIA monthly benchmarks, and delivery charge breakdowns.',
    overview:
      'New York residential electricity rates reflect significant regional variations between New York City / Long Island (high transmission congestion and delivery costs) and Upstate New York (hydroelectric and nuclear generation supply).',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Upstate vs. Downstate Congestion',
        description:
          'Limited transmission line capacity between abundant Upstate hydro/nuclear capacity and high Downstate load centers creates regional price separation within the NYISO market.',
      },
      {
        title: 'Clean Energy Mandates',
        description:
          'New York state climate policy targets ambitious renewable electricity goals, funding offshore wind, solar, and grid upgrades.',
      },
      {
        title: 'Regulated Delivery vs. Energy Supply',
        description:
          'Consumers can choose Energy Services Companies (ESCOs) for supply while local utilities (Con Edison, National Grid, NYSEG) maintain monopoly delivery networks.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'New York Public Service Commission (NYPSC)',
        title: 'New York Utility Tariffs & Clean Energy Mandates',
        name: 'New York Public Service Commission (NYPSC)',
        url: 'https://www.dps.ny.gov/',
        supportedTopic: 'Regional transmission congestion and clean energy rules',
      },
    ],
    relatedStateSlugs: ['pennsylvania', 'massachusetts', 'new-jersey', 'connecticut'],
  },
  pennsylvania: {
    code: 'PA',
    slug: 'pennsylvania',
    name: 'Pennsylvania',
    metaTitle: 'Pennsylvania Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Compare Pennsylvania residential electricity rates, PAPUC Shop for Power benchmarks, PJM market context, and monthly cost averages.',
    overview:
      'Pennsylvania is a major energy exporter within the PJM Interconnection grid. With a fully restructured retail market, residents can shop for competitive electricity suppliers or receive default service (Price to Compare) from regulated utilities.',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'PJM Grid & Energy Production',
        description:
          'Pennsylvania ranks among the top states for net electricity generation, drawing from natural gas, nuclear power, and coal.',
      },
      {
        title: 'PAPUC "Price to Compare" Benchmark',
        description:
          'Regulated distribution utilities (PECO, PPL, Duquesne Light, Met-Ed) adjust their default supply rate quarterly or bi-annually, serving as a shopping baseline.',
      },
      {
        title: 'Dual Heating Demand',
        description:
          'Pennsylvania households experience substantial winter space heating loads alongside summer cooling, influencing seasonal electricity usage spikes.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide electricity pricing statistics',
      },
      {
        organization: 'Pennsylvania Public Utility Commission (PAPUC)',
        title: 'Pennsylvania Electric Choice & Price to Compare',
        name: 'Pennsylvania Public Utility Commission (PAPUC)',
        url: 'https://www.puc.pa.gov/',
        supportedTopic: 'Default supply Price to Compare and PJM generation context',
      },
    ],
    relatedStateSlugs: ['ohio', 'new-york', 'illinois', 'maryland'],
  },
  illinois: {
    code: 'IL',
    slug: 'illinois',
    name: 'Illinois',
    metaTitle: 'Illinois Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Examine Illinois residential electricity rates, ComEd and Ameren supply charges, CEJA clean energy legislation, and monthly power costs.',
    overview:
      'Illinois features a retail choice market split between the PJM region (northern Illinois / ComEd) and MISO region (central & southern Illinois / Ameren). High nuclear power capacity provides baseline zero-carbon generation.',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Nuclear Power Generation Capacity',
        description:
          'Illinois generates substantial nuclear power, providing over half of the state’s electricity and stabilizing wholesale carbon-free energy supply.',
      },
      {
        title: 'Climate and Equitable Jobs Act (CEJA)',
        description:
          'Enacted in 2021, CEJA sets clean energy targets by supporting renewable development and funding nuclear plant preservation.',
      },
      {
        title: 'Regional RTO Price Variance',
        description:
          'Wholesale electricity prices differ between the ComEd zone in PJM and the Ameren zone in MISO based on regional transmission capacity and capacity auction clears.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential rate statistics',
      },
      {
        organization: 'Illinois Commerce Commission (ICC)',
        title: 'Illinois Utility Rate Structure & CEJA Oversight',
        name: 'Illinois Commerce Commission (ICC)',
        url: 'https://www.icc.illinois.gov/',
        supportedTopic: 'Nuclear baseload regulation and CEJA clean energy rules',
      },
    ],
    relatedStateSlugs: ['ohio', 'michigan', 'pennsylvania', 'indiana'],
  },
  ohio: {
    code: 'OH',
    slug: 'ohio',
    name: 'Ohio',
    metaTitle: 'Ohio Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Find Ohio residential electricity rates, PUCO Choice benchmarks, PJM regional power costs, and average household utility estimates.',
    overview:
      'Ohio residential customers operate within a deregulated retail electric choice market served by PJM. Households can choose an independent Certified Retail Electric Service (CRES) provider or default to local utility Standard Service Offer (SSO) rates.',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'PUCO Standard Service Auctions',
        description:
          'Local distribution companies (AEP Ohio, Duke Energy Ohio, FirstEnergy utilities, AES Ohio) procure default supply via competitive auctions supervised by PUCO.',
      },
      {
        title: 'Natural Gas & Coal Generation Shift',
        description:
          'Ohio’s generation portfolio has transitioned from coal to natural gas combined-cycle power plants, linking baseline energy rates to natural gas markets.',
      },
      {
        title: 'Municipal Aggregation Programs',
        description:
          'Many Ohio cities and townships organize opt-out municipal aggregation programs, negotiating bulk electricity supply contracts for local residents.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail electricity data',
      },
      {
        organization: 'Public Utilities Commission of Ohio (PUCO)',
        title: 'Ohio Standard Service Offer (SSO) & CRES Rules',
        name: 'Public Utilities Commission of Ohio (PUCO)',
        url: 'https://puco.ohio.gov/',
        supportedTopic: 'SSO auction oversight and municipal aggregation rules',
      },
    ],
    relatedStateSlugs: ['pennsylvania', 'illinois', 'michigan', 'kentucky'],
  },
  georgia: {
    code: 'GA',
    slug: 'georgia',
    name: 'Georgia',
    metaTitle: 'Georgia Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Review Georgia residential electricity rates, Georgia Power baseline tariffs, Plant Vogtle nuclear impact, and monthly usage costs.',
    overview:
      'Georgia residential electricity is provided under a traditionally regulated market framework dominated by Georgia Power, municipal utilities (MEAG), and Electric Membership Corporations (EMCs). Baseline rates reflect major nuclear expansion and warm climate cooling loads.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Plant Vogtle Nuclear Expansion',
        description:
          'The completion of new nuclear reactors at Plant Vogtle expands zero-emission baseload capacity while rate adjustments reflect long-term capital construction recovery.',
      },
      {
        title: 'High Summer Cooling Intensity',
        description:
          'Hot, humid summer weather drives heavy central air conditioning usage, resulting in peak seasonal electricity consumption across Georgia households.',
      },
      {
        title: 'Georgia PSC Rate Regulation',
        description:
          'The elected Georgia Public Service Commission determines base rate returns, environmental compliance riders, and fuel cost adjustments for investor-owned utilities.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales metrics',
      },
      {
        organization: 'Georgia Public Service Commission (PSC)',
        title: 'Georgia Utility Base Rate Orders & Plant Vogtle Filings',
        name: 'Georgia Public Service Commission (PSC)',
        url: 'https://psc.ga.gov/',
        supportedTopic: 'Plant Vogtle nuclear expansion recovery and summer cooling tariffs',
      },
    ],
    relatedStateSlugs: ['florida', 'north-carolina', 'alabama', 'south-carolina'],
  },
  'north-carolina': {
    code: 'NC',
    slug: 'north-carolina',
    name: 'North Carolina',
    metaTitle: 'North Carolina Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Learn about North Carolina residential electricity rates, Duke Energy regulated tariffs, solar generation growth, and average bill drivers.',
    overview:
      'North Carolina operates a regulated electricity market with service primarily provided by Duke Energy Carolinas and Duke Energy Progress. Rates are competitively priced compared to national benchmarks, supported by nuclear baseload and rapid utility solar growth.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Duke Energy System Integration',
        description:
          'Duke Energy serves the majority of North Carolina households under multi-year rate plans approved by the North Carolina Utilities Commission (NCUC).',
      },
      {
        title: 'Utility Solar Leadership',
        description:
          'North Carolina ranks among national leaders in utility-scale solar capacity, which complements nuclear power and natural gas in the state generation mix.',
      },
      {
        title: 'Electric Heat Pump Adoption',
        description:
          'High adoption rates of electric heat pumps for winter space heating create moderate dual seasonal usage peaks in both winter and summer.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential rate data',
      },
      {
        organization: 'North Carolina Utilities Commission (NCUC)',
        title: 'North Carolina Multi-Year Rate Plans & Carbon Plan',
        name: 'North Carolina Utilities Commission (NCUC)',
        url: 'https://www.ncuc.gov/',
        supportedTopic: 'Duke Energy regulated tariffs and utility solar growth',
      },
    ],
    relatedStateSlugs: ['georgia', 'virginia', 'south-carolina', 'florida'],
  },
  michigan: {
    code: 'MI',
    slug: 'michigan',
    name: 'Michigan',
    metaTitle: 'Michigan Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Understand Michigan residential electricity rates, DTE Energy and Consumers Energy delivery tariffs, winter heating, and EIA rate trends.',
    overview:
      'Michigan residential electricity rates reflect significant infrastructure modernization programs, coal plant retirements, and heavy winter weather conditions. Primary investor-owned utilities DTE Energy and Consumers Energy operate under MPSC oversight.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'MPSC Clean Energy Plan Mandates',
        description:
          'Michigan clean energy legislation targets progressive clean energy goals, accelerating solar, wind, and storage grid investments.',
      },
      {
        title: 'Grid Reliability & Vegetation Management',
        description:
          'Frequent severe winter ice storms and high tree canopy coverage require elevated tree-trimming and line hardening expenditures funded via retail rates.',
      },
      {
        title: 'Limited Statutory Electric Choice Cap',
        description:
          'Michigan maintains a strict statutory cap on retail electric choice, meaning the vast majority of residential homes receive full bundled utility service.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential electricity metrics',
      },
      {
        organization: 'Michigan Public Service Commission (MPSC)',
        title: 'Michigan Clean Energy Plan Orders & Reliability Surcharges',
        name: 'Michigan Public Service Commission (MPSC)',
        url: 'https://www.michigan.gov/mpsc',
        supportedTopic: 'MPSC clean energy mandates and statutory choice cap',
      },
    ],
    relatedStateSlugs: ['illinois', 'ohio', 'wisconsin', 'pennsylvania'],
  },
  arizona: {
    code: 'AZ',
    slug: 'arizona',
    name: 'Arizona',
    metaTitle: 'Arizona Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'View Arizona residential electricity rates, average monthly AC bills, ACC regulatory tariffs, and solar energy context.',
    overview:
      'Arizona residential electricity consumption is driven heavily by extreme summer cooling demand. Regulated by the Arizona Corporation Commission (ACC), major utilities like Arizona Public Service (APS) and Salt River Project (SRP) utilize time-of-use (TOU) rates and demand charges during summer peak hours.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Extreme Summer Air Conditioning Load',
        description:
          'Summer temperatures exceeding 110°F drive continuous AC compressor operation, creating dramatic summer usage spikes across Arizona households.',
      },
      {
        title: 'Mandatory & Optional TOU Tariffs',
        description:
          'APS and SRP offer structured Time-of-Use plans with high super-peak rates during hot weekday afternoon hours (3 p.m. to 7 p.m. or 4 p.m. to 7 p.m.).',
      },
      {
        title: 'Solar & Palo Verde Nuclear Generation',
        description:
          'Arizona generates substantial carbon-free power from rooftop/utility solar and the Palo Verde Nuclear Generating Station, the nation’s largest nuclear plant by net generation.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail electricity data',
      },
      {
        organization: 'Arizona Corporation Commission (ACC)',
        title: 'Arizona TOU Tariff Rates & Palo Verde Nuclear Oversight',
        name: 'Arizona Corporation Commission (ACC)',
        url: 'https://www.azcc.gov/',
        supportedTopic: 'Time-of-use pricing and Palo Verde nuclear generation context',
      },
    ],
    relatedStateSlugs: ['california', 'texas', 'nevada', 'utah'],
  },
  virginia: {
    code: 'VA',
    slug: 'virginia',
    name: 'Virginia',
    metaTitle: 'Virginia Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Analyze Virginia residential electricity rates, Dominion Energy tariffs, VCEA clean energy goals, and monthly power bills.',
    overview:
      'Virginia operates a regulated electricity market dominated by Dominion Energy Virginia and Appalachian Power. Rates reflect rapid data center growth in Northern Virginia, offshore wind buildouts, and the Virginia Clean Economy Act (VCEA) decarbonization targets.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Data Center Demand Impact',
        description:
          'Northern Virginia hosts a major concentration of data centers, driving significant overall grid transmission investment and regional capacity load.',
      },
      {
        title: 'Virginia Clean Economy Act (VCEA)',
        description:
          'Enacted in 2020, VCEA mandates carbon-free electricity goals for Dominion Virginia, accelerating offshore wind and solar buildouts.',
      },
      {
        title: 'Dual Seasonal HVAC Peaks',
        description:
          'High heat pump penetration creates winter heating peaks alongside summer AC demand, influencing year-round residential consumption.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential electricity metrics',
      },
      {
        organization: 'Virginia State Corporation Commission (SCC)',
        title: 'Virginia Rate Filings & VCEA Decarbonization Rules',
        name: 'Virginia State Corporation Commission (SCC)',
        url: 'https://scc.virginia.gov/',
        supportedTopic: 'Data center load impact and VCEA decarbonization goals',
      },
    ],
    relatedStateSlugs: ['north-carolina', 'maryland', 'pennsylvania', 'georgia'],
  },
  washington: {
    code: 'WA',
    slug: 'washington',
    name: 'Washington',
    metaTitle: 'Washington Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Explore Washington residential electricity rates, abundant hydroelectric power benchmarks, BPA regional supply, and CETA clean energy rules.',
    overview:
      'Washington state benefits from abundant hydroelectric power along the Columbia River basin, resulting in residential electricity rates that rank among the lowest in the United States. Regulated by the UTC, rates are influenced by seasonal snowpack levels and the Clean Energy Transformation Act (CETA).',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Hydroelectric Power Advantage',
        description:
          'Hydroelectric dams provide the majority of Washington’s electricity generation, supplying low-cost, zero-carbon power via the Bonneville Power Administration (BPA).',
      },
      {
        title: 'Clean Energy Transformation Act (CETA)',
        description:
          'CETA requires Washington utilities to transition to clean electricity, phasing out coal-fired power imports.',
      },
      {
        title: 'Winter Space & Water Heating',
        description:
          'Because electricity rates are relatively low, electric heat pumps and resistance water heaters are widely used, creating peak winter demand.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'Washington Utilities and Transportation Commission (UTC)',
        title: 'Washington Utility Regulation & CETA Compliance',
        name: 'Washington Utilities and Transportation Commission (UTC)',
        url: 'https://www.utc.wa.gov/',
        supportedTopic: 'Hydroelectric supply advantage and CETA clean mandate',
      },
    ],
    relatedStateSlugs: ['california', 'oregon', 'idaho', 'montana'],
  },
  'new-jersey': {
    code: 'NJ',
    slug: 'new-jersey',
    name: 'New Jersey',
    metaTitle: 'New Jersey Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Compare New Jersey residential electricity rates, BGC basic generation service auctions, BPU regulations, and PJM market trends.',
    overview:
      'New Jersey operates a restructured retail electric choice market within the PJM Interconnection. Regulated distribution utilities (PSE&G, JCP&L, Atlantic City Electric, Rockland Electric) procure default generation supply through annual BGS state auctions.',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Basic Generation Service (BGS) Auctions',
        description:
          'New Jersey BPU supervises annual competitive BGS auctions that determine default supply rates for households that do not choose a third-party supplier.',
      },
      {
        title: 'Energy Master Plan & Clean Energy Goals',
        description:
          'State policy targets progressive clean energy goals, funding offshore wind procurement, community solar projects, and nuclear ZEC preservation.',
      },
      {
        title: 'Dense Transmission & Population Center',
        description:
          'High population density and regional PJM congestion charges contribute to higher baseline transmission and distribution delivery rates.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential rate statistics',
      },
      {
        organization: 'New Jersey Board of Public Utilities (NJBPU)',
        title: 'New Jersey BGS Auction Oversight & Energy Master Plan',
        name: 'New Jersey Board of Public Utilities (NJBPU)',
        url: 'https://www.nj.gov/bpu/',
        supportedTopic: 'BGS basic generation service auctions and offshore wind goals',
      },
    ],
    relatedStateSlugs: ['new-york', 'pennsylvania', 'maryland', 'massachusetts'],
  },
  massachusetts: {
    code: 'MA',
    slug: 'massachusetts',
    name: 'Massachusetts',
    metaTitle: 'Massachusetts Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Discover Massachusetts residential electricity rates, ISO New England market drivers, DPU tariffs, and winter energy supply spikes.',
    overview:
      'Massachusetts residential electricity rates rank among the highest in the nation due to ISO New England natural gas pipeline constraints, regional capacity pricing, and ambitious clean energy mandates. Consumers can select competitive suppliers or default basic service.',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'ISO New England Winter Pipeline Bottlenecks',
        description:
          'Winter natural gas pipeline constraints in New England force dual-fuel generators onto pricier LNG imports or oil, driving seasonal supply rate spikes.',
      },
      {
        title: 'Municipal Aggregation Programs',
        description:
          'Many Massachusetts cities and towns operate opt-out municipal aggregation programs, contracting bulk green supply for residents.',
      },
      {
        title: 'Decarbonization Roadmap',
        description:
          'State policy targets deep greenhouse gas emission reductions, accelerating heat pump adoption and offshore wind transmission investments.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail sales metrics',
      },
      {
        organization: 'Massachusetts Department of Public Utilities (DPU)',
        title: 'Massachusetts Basic Service & Municipal Aggregation Filings',
        name: 'Massachusetts Department of Public Utilities (DPU)',
        url: 'https://www.mass.gov/orgs/department-of-public-utilities',
        supportedTopic: 'ISO New England winter supply spikes and municipal aggregation',
      },
    ],
    relatedStateSlugs: ['new-york', 'new-jersey', 'connecticut', 'rhode-island'],
  },
  tennessee: {
    code: 'TN',
    slug: 'tennessee',
    name: 'Tennessee',
    metaTitle: 'Tennessee Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Review Tennessee residential electricity rates, TVA wholesale power benchmarks, local power company distribution, and seasonal trends.',
    overview:
      'Tennessee operates under a unique public power structure anchored by the Tennessee Valley Authority (TVA), a federally owned corporation. Local municipal systems and electric cooperatives distribute TVA power to residential customers across the state.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Tennessee Valley Authority (TVA) Federal Power',
        description:
          'TVA generates wholesale power from a balanced portfolio of nuclear plants, hydroelectric dams, natural gas, and solar, supplying local distributors.',
      },
      {
        title: 'Low Wholesale Base Rates',
        description:
          'Public power regulation helps keep Tennessee residential electricity rates below national averages, supporting regional industrial and residential growth.',
      },
      {
        title: 'High Winter Heat Pump & Space Heating Demand',
        description:
          'Widespread adoption of electric resistance and heat pump space heating creates strong winter morning usage peaks during cold snaps.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential rate statistics',
      },
      {
        organization: 'Tennessee Valley Authority (TVA)',
        title: 'TVA Wholesale Power Tariffs & Generation Portfolio',
        name: 'Tennessee Valley Authority (TVA)',
        url: 'https://www.tva.com/',
        supportedTopic: 'Federal public power model and wholesale baseload generation',
      },
    ],
    relatedStateSlugs: ['georgia', 'north-carolina', 'kentucky', 'alabama'],
  },
  indiana: {
    code: 'IN',
    slug: 'indiana',
    name: 'Indiana',
    metaTitle: 'Indiana Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Understand Indiana residential electricity rates, IURC utility regulation, coal-to-gas generation shifts, and monthly household energy costs.',
    overview:
      'Indiana residential electricity is provided under a traditional regulated utility framework overseen by the Indiana Utility Regulatory Commission (IURC). Major utilities (AES Indiana, CenterPoint, Duke Energy Indiana, NIPSCO, Indiana Michigan Power) operate integrated generation and distribution.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Coal-to-Gas Generation Transition',
        description:
          'Indiana historically relied heavily on coal; utilities are actively retiring aging coal plants and transitioning to natural gas, solar, and wind capacity.',
      },
      {
        title: 'MISO & PJM Regional Grid Membership',
        description:
          'Indiana utilities participate in MISO and PJM wholesale markets, balancing industrial demand center loads with residential consumption.',
      },
      {
        title: 'IURC Rate Case Recovery',
        description:
          'Multi-year rate cases submitted to the IURC reflect capital investments in environmental compliance, grid modernizations, and generation replacement.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales benchmarks',
      },
      {
        organization: 'Indiana Utility Regulatory Commission (IURC)',
        title: 'Indiana Electric Rate Cases & IURC Base Orders',
        name: 'Indiana Utility Regulatory Commission (IURC)',
        url: 'https://www.in.gov/iurc/',
        supportedTopic: 'Coal plant retirement recovery and IURC utility rate regulation',
      },
    ],
    relatedStateSlugs: ['illinois', 'ohio', 'michigan', 'kentucky'],
  },
  missouri: {
    code: 'MO',
    slug: 'missouri',
    name: 'Missouri',
    metaTitle: 'Missouri Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Examine Missouri residential electricity rates, Ameren Missouri and Evergy tariffs, MPSC regulation, and seasonal energy trends.',
    overview:
      'Missouri operates a regulated electricity market with primary service provided by Ameren Missouri and Evergy. Overseen by the Missouri Public Service Commission (MPSC), rates are supported by nuclear power (Callaway Plant), coal, and natural gas generation.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Callaway Nuclear & Coal Base Generation',
        description:
          'Ameren’s Callaway Nuclear Plant provides reliable baseload power, while coal and natural gas generation supply peak residential cooling and heating demand.',
      },
      {
        title: 'Significant Seasonal Temperature Swings',
        description:
          'Missouri experiences hot, humid summers requiring heavy AC cooling alongside cold Midwestern winters driving space heating consumption.',
      },
      {
        title: 'MPSC Rate Case & Renewable Mandates',
        description:
          'Missouri’s Renewable Energy Standard requires investor-owned utilities to acquire electricity from renewable resources.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential rate data',
      },
      {
        organization: 'Missouri Public Service Commission (MPSC)',
        title: 'Missouri Utility Rate Cases & Renewable Standard',
        name: 'Missouri Public Service Commission (MPSC)',
        url: 'https://psc.mo.gov/',
        supportedTopic: 'Callaway nuclear plant baseload and MPSC rate regulation',
      },
    ],
    relatedStateSlugs: ['illinois', 'kansas', 'iowa', 'tennessee'],
  },
  maryland: {
    code: 'MD',
    slug: 'maryland',
    name: 'Maryland',
    metaTitle: 'Maryland Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Find Maryland residential electricity rates, Maryland PSC choice benchmarks, EmPOWER efficiency programs, and PJM grid context.',
    overview:
      'Maryland is a deregulated retail electric choice state within the PJM Interconnection. Households can choose a competitive supplier or receive default Standard Offer Service (SOS) from regulated utilities like BGE, Pepco, Delmarva Power, and Potomac Edison.',
    marketType: 'Retail Choice / Deregulated Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Standard Offer Service (SOS) Auctions',
        description:
          'The Maryland PSC oversees semi-annual wholesale auctions that establish default supply rates for utility customers who do not choose a third-party supplier.',
      },
      {
        title: 'EmPOWER Maryland Energy Efficiency Act',
        description:
          'State efficiency programs fund rebate initiatives and grid upgrades through small monthly customer utility statement surcharges.',
      },
      {
        title: 'PJM Grid & Regional Transmission Charges',
        description:
          'Wholesale pricing reflects PJM capacity auction results, regional transmission congestion, and Mid-Atlantic clean energy procurement rules.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential rate metrics',
      },
      {
        organization: 'Maryland Public Service Commission (PSC)',
        title: 'Maryland Standard Offer Service (SOS) Auctions & EmPOWER',
        name: 'Maryland Public Service Commission (PSC)',
        url: 'https://www.psc.state.md.us/',
        supportedTopic: 'SOS default supply auctions and EmPOWER efficiency surcharges',
      },
    ],
    relatedStateSlugs: ['virginia', 'pennsylvania', 'new-jersey', 'delaware'],
  },
  wisconsin: {
    code: 'WI',
    slug: 'wisconsin',
    name: 'Wisconsin',
    metaTitle: 'Wisconsin Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Learn about Wisconsin residential electricity rates, PSCW regulated tariffs, We Energies benchmarks, and winter heating loads.',
    overview:
      'Wisconsin operates a traditionally regulated utility market supervised by the Public Service Commission of Wisconsin (PSCW). Major utilities (We Energies, Wisconsin Public Service, Alliant Energy, Xcel Energy) operate bundled generation, transmission, and distribution networks.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'PSCW Quadrennial & Biennial Rate Reviews',
        description:
          'The PSCW conducts strict rate reviews, setting authorized utility return on equity (ROE) and capital recovery for grid reliability investments.',
      },
      {
        title: 'Severe Upper Midwest Winter Climate',
        description:
          'Long, cold winters drive heavy space heating, water heating, and engine block heater electrical loads across Wisconsin homes.',
      },
      {
        title: 'Point Beach Nuclear & Renewable Buildouts',
        description:
          'Point Beach Nuclear Plant provides zero-carbon baseload power while utilities expand solar and wind farms to meet state carbon-reduction targets.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'Public Service Commission of Wisconsin (PSCW)',
        title: 'Wisconsin Electric Utility Rate Decisions',
        name: 'Public Service Commission of Wisconsin (PSCW)',
        url: 'https://psc.wi.gov/',
        supportedTopic: 'PSCW rate regulation and Point Beach nuclear baseload',
      },
    ],
    relatedStateSlugs: ['illinois', 'michigan', 'minnesota', 'iowa'],
  },
  // BATCH 3 PUBLISHED STATES
  colorado: {
    code: 'CO',
    slug: 'colorado',
    name: 'Colorado',
    metaTitle: 'Colorado Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'View Colorado residential electricity rates, average monthly household bills, Colorado PUC utility regulation, and clean energy transition drivers.',
    overview:
      'Colorado operates a regulated electric utility structure overseen by the Colorado Public Utilities Commission (Colorado PUC). Investor-owned Xcel Energy (Public Service Company of Colorado) and Black Hills Energy serve major population centers, alongside municipal systems and electric co-ops. Rates reflect Colorado’s clean energy transition goals, wind and solar expansion, and high winter space heating demand.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Colorado PUC Clean Energy Plans',
        description:
          'State utility regulation and clean energy filings accelerate renewable generation capital investments across major investor-owned utilities.',
      },
      {
        title: 'Wind & Solar Grid Expansion',
        description:
          'Colorado ranks among leading Western states in onshore wind generation and utility-scale solar across the Front Range, balancing baseline power delivery with renewable integration.',
      },
      {
        title: 'Mountain Climate & Winter Heating Load',
        description:
          'Cold winter temperatures across high-elevation regions create significant winter heating and natural gas cost interdependencies.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential electricity sales and retail revenue',
      },
      {
        organization: 'Colorado Public Utilities Commission (Colorado PUC)',
        title: 'Colorado Utility Regulation & Clean Energy Filings',
        name: 'Colorado Public Utilities Commission (Colorado PUC)',
        url: 'https://puc.colorado.gov/',
        supportedTopic: 'Utility rate structure and clean energy transition targets',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Colorado State Energy Profile & Data Overview',
        name: 'EIA Colorado State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=CO',
        supportedTopic: 'Colorado net electricity generation mix and energy profile',
      },
    ],
    relatedStateSlugs: ['wyoming', 'utah', 'new-mexico', 'kansas'],
  },
  minnesota: {
    code: 'MN',
    slug: 'minnesota',
    name: 'Minnesota',
    metaTitle: 'Minnesota Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Explore Minnesota average residential electricity rates, monthly bills, MPUC tariffs, and clean energy transition goals.',
    overview:
      'Minnesota operates a regulated utility market under the oversight of the Minnesota Public Utilities Commission (MPUC). Investor-owned utilities like Xcel Energy and Minnesota Power serve residential homes alongside strong electric co-ops. Rates reflect MISO grid integration, severe cold-weather heating load, and statutory clean energy goals.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Clean Energy Legislation & Decarbonization Targets',
        description:
          'Minnesota state policies mandate clean electricity goals, accelerating coal plant retirements and renewable energy buildouts.',
      },
      {
        title: 'Severe Cold-Weather Heating Load',
        description:
          'Sub-zero winter temperatures drive heavy electric space and water heating demand across Minnesota homes during peak winter months.',
      },
      {
        title: 'MISO Regional Grid & Wind Integration',
        description:
          'A substantial share of Minnesota electricity comes from wind power, integrated via the Midcontinent Independent System Operator (MISO).',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'Minnesota Public Utilities Commission (MPUC)',
        title: 'Minnesota Electric Utility Decisions & Clean Energy Standard',
        name: 'Minnesota Public Utilities Commission (MPUC)',
        url: 'https://mn.gov/puc/',
        supportedTopic: 'MPUC rate regulation and clean energy decarbonization goals',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Minnesota State Energy Profile & Data Overview',
        name: 'EIA Minnesota State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=MN',
        supportedTopic: 'Minnesota wind energy share and generation profile',
      },
    ],
    relatedStateSlugs: ['wisconsin', 'iowa', 'north-dakota', 'south-dakota'],
  },
  'south-carolina': {
    code: 'SC',
    slug: 'south-carolina',
    name: 'South Carolina',
    metaTitle: 'South Carolina Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Analyze South Carolina residential electricity rates, Dominion and Duke Energy tariffs, PSC regulation, and nuclear baseload data.',
    overview:
      'South Carolina operates a regulated electricity market framework supervised by the South Carolina Public Service Commission (PSC). Dominant investor-owned utilities Dominion Energy South Carolina and Duke Energy Carolinas/Progress serve residential households alongside Santee Cooper and electric cooperatives. Rates reflect high summer air conditioning usage and heavy nuclear baseload generation.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'High Nuclear Baseload Capacity',
        description:
          'Nuclear power provides a major share of South Carolina net electricity generation, supplying low-carbon baseline energy across the state.',
      },
      {
        title: 'Intense Summer Cooling Demand',
        description:
          'Hot, humid coastal summers drive high air conditioning utilization and peak seasonal monthly consumption across South Carolina households.',
      },
      {
        title: 'SC PSC Rate & Capital Expenditure Regulation',
        description:
          'Multi-year utility rate cases reflect grid resilience, storm recovery, and solar integration investments approved by state regulators.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail electricity rate metrics',
      },
      {
        organization: 'South Carolina Public Service Commission (PSC)',
        title: 'South Carolina Electric Utility Base Rate Filings',
        name: 'South Carolina Public Service Commission (PSC)',
        url: 'https://psc.sc.gov/',
        supportedTopic: 'Nuclear baseload regulation and summer cooling demand tariffs',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'South Carolina State Energy Profile & Data Overview',
        name: 'EIA South Carolina State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=SC',
        supportedTopic: 'South Carolina nuclear generation share and energy profile',
      },
    ],
    relatedStateSlugs: ['north-carolina', 'georgia', 'florida', 'tennessee'],
  },
  alabama: {
    code: 'AL',
    slug: 'alabama',
    name: 'Alabama',
    metaTitle: 'Alabama Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Review Alabama residential electricity rates, Alabama Power tariffs, APSC rate stabilization mechanisms, and summer cooling demand.',
    overview:
      'Alabama operates a traditionally regulated utility market led by Alabama Power (a Southern Company subsidiary) alongside municipal systems and rural electric cooperatives. Supervised by the Alabama Public Service Commission (APSC), residential rates are supported by a diverse generation mix of natural gas, nuclear power, coal, and hydroelectric facilities.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Natural Gas & Nuclear Generation Portfolio',
        description:
          'Natural gas and nuclear plants provide the primary baseload power generation for Alabama, stabilizing grid capacity.',
      },
      {
        title: 'Deep South Summer Air Conditioning Load',
        description:
          'Prolonged summer heat and humidity require extensive air conditioning usage across residential homes during summer months.',
      },
      {
        title: 'APSC Rate Stabilization & Equalization (RSE)',
        description:
          'Formulaic Rate Stabilization & Equalization (RSE) mechanisms regulate utility returns and fuel adjustment clauses for retail customers.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'Alabama Public Service Commission (APSC)',
        title: 'Alabama Power Rate Stabilization & Equalization Oversight',
        name: 'Alabama Public Service Commission (APSC)',
        url: 'https://psc.alabama.gov/',
        supportedTopic: 'APSC Rate Stabilization & Equalization and nuclear generation',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Alabama State Energy Profile & Data Overview',
        name: 'EIA Alabama State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=AL',
        supportedTopic: 'Alabama net electricity generation mix',
      },
    ],
    relatedStateSlugs: ['georgia', 'florida', 'tennessee', 'mississippi'],
  },
  louisiana: {
    code: 'LA',
    slug: 'louisiana',
    name: 'Louisiana',
    metaTitle: 'Louisiana Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Examine Louisiana residential electricity rates, Entergy tariffs, LPSC regulation, natural gas generation, and storm recovery riders.',
    overview:
      'Louisiana operates a regulated electricity market framework supervised by the Louisiana Public Service Commission (LPSC) and the New Orleans City Council. Entergy Louisiana, Entergy New Orleans, and Cleco Power serve the majority of residential customers. Rates reflect natural gas generation reliance, industrial load balances, and severe weather storm recovery riders.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Natural Gas Fuel Generation Reliance',
        description:
          'Natural gas power plants generate the majority of Louisiana net electricity, tying retail rates closely to natural gas spot market pricing.',
      },
      {
        title: 'Hurricane Restoration & Grid Hardening Riders',
        description:
          'Approved cost recovery riders for major tropical storm and hurricane transmission repairs influence monthly retail delivery rates.',
      },
      {
        title: 'Gulf Coast Cooling Intensity',
        description:
          'Subtropical climate creates prolonged high-humidity summer cooling demand across homes throughout southern Louisiana.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential electricity metrics',
      },
      {
        organization: 'Louisiana Public Service Commission (LPSC)',
        title: 'Louisiana Utility Tariff Orders & Storm Securitization',
        name: 'Louisiana Public Service Commission (LPSC)',
        url: 'https://lpsc.louisiana.gov/',
        supportedTopic: 'Natural gas generation reliance and hurricane recovery riders',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Louisiana State Energy Profile & Data Overview',
        name: 'EIA Louisiana State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=LA',
        supportedTopic: 'Louisiana natural gas electricity generation share',
      },
    ],
    relatedStateSlugs: ['texas', 'arkansas', 'mississippi', 'alabama'],
  },
  kentucky: {
    code: 'KY',
    slug: 'kentucky',
    name: 'Kentucky',
    metaTitle: 'Kentucky Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Discover Kentucky residential electricity rates, KPSC utility regulation, coal-to-gas transition drivers, and average power costs.',
    overview:
      'Kentucky operates a regulated electric utility structure overseen by the Kentucky Public Service Commission (KPSC). Major investor-owned utilities LG&E, KU, and Duke Energy Kentucky serve households alongside TVA distributors and rural electric co-ops. Rates reflect a historically coal-heavy generation fleet transitioning to natural gas and solar.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Coal-to-Gas Generation Transition',
        description:
          'Utilities are retiring legacy coal units under KPSC approval, replacing capacity with natural gas combined-cycle and utility solar.',
      },
      {
        title: 'Competitive Industrial & Residential Baseline Rates',
        description:
          'Electricity rates in Kentucky historically rank below national averages due to regional fuel access and baseload power infrastructure.',
      },
      {
        title: 'Dual Heating & Cooling Seasonal Spikes',
        description:
          'Humid summers and cold winters drive both summer air conditioning and winter heat pump electrical loads across Kentucky households.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales benchmarks',
      },
      {
        organization: 'Kentucky Public Service Commission (KPSC)',
        title: 'Kentucky Electric Utility Rate Orders & Generation Plans',
        name: 'Kentucky Public Service Commission (KPSC)',
        url: 'https://psc.ky.gov/',
        supportedTopic: 'Coal-to-gas generation transition and KPSC utility regulation',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Kentucky State Energy Profile & Data Overview',
        name: 'EIA Kentucky State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=KY',
        supportedTopic: 'Kentucky generation mix transition and fuel profile',
      },
    ],
    relatedStateSlugs: ['tennessee', 'indiana', 'ohio', 'missouri'],
  },
  oregon: {
    code: 'OR',
    slug: 'oregon',
    name: 'Oregon',
    metaTitle: 'Oregon Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Learn about Oregon residential electricity rates, OPUC regulated tariffs, PGE and PacifiCorp benchmarks, and Columbia River hydro supply.',
    overview:
      'Oregon residential electricity is served by investor-owned utilities Portland General Electric (PGE) and PacifiCorp (Pacific Power) under Oregon Public Utility Commission (OPUC) regulation, alongside consumer-owned PUDs and co-ops. Rates reflect abundant Columbia River basin hydroelectric power, state clean energy targets, and wildfire mitigation costs.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Hydroelectric Generation Base',
        description:
          'Hydroelectric facilities supply a major portion of Oregon electricity, backed by Bonneville Power Administration (BPA) wholesale power.',
      },
      {
        title: 'Clean Energy Policy Targets',
        description:
          'State legislation requires investor-owned utilities to systematically reduce greenhouse gas emissions below baseline levels.',
      },
      {
        title: 'Wildfire Mitigation & Grid Resilience Investments',
        description:
          'OPUC-approved vegetation management and line hardening expenditures support grid safety during high-wind summer periods.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential rate statistics',
      },
      {
        organization: 'Oregon Public Utility Commission (OPUC)',
        title: 'Oregon Utility Regulation & Clean Energy Targets',
        name: 'Oregon Public Utility Commission (OPUC)',
        url: 'https://www.oregon.gov/puc',
        supportedTopic: 'Hydroelectric generation advantage and clean energy decarbonization goals',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Oregon State Energy Profile & Data Overview',
        name: 'EIA Oregon State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=OR',
        supportedTopic: 'Oregon hydroelectric generation share',
      },
    ],
    relatedStateSlugs: ['washington', 'california', 'idaho', 'nevada'],
  },
  oklahoma: {
    code: 'OK',
    slug: 'oklahoma',
    name: 'Oklahoma',
    metaTitle: 'Oklahoma Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Compare Oklahoma residential electricity rates, OG&E and PSO tariffs, OCC regulation, and wind power generation context.',
    overview:
      'Oklahoma operates a regulated electric utility market overseen by the Oklahoma Corporation Commission (OCC). Primary investor-owned utilities Oklahoma Gas and Electric (OG&E) and Public Service Company of Oklahoma (PSO/AEP) serve residential load alongside rural electric cooperatives. Rates are supported by abundant wind energy generation and natural gas plants.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Wind Energy Generation Leadership',
        description:
          'Oklahoma produces a major portion of its total electricity from wind turbines, ranking among top U.S. states for wind power.',
      },
      {
        title: 'Natural Gas Marginal Pricing',
        description:
          'Natural gas power plants balance wind variability and set marginal prices in the Southwest Power Pool (SPP) regional grid.',
      },
      {
        title: 'Extreme Weather & Storm Restoration',
        description:
          'Tornadoes and severe ice storms require periodic utility infrastructure restoration cost recovery approved by state regulators.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail sales benchmarks',
      },
      {
        organization: 'Oklahoma Corporation Commission (OCC)',
        title: 'Oklahoma Public Utility Rate Cases & SPP Grid Oversight',
        name: 'Oklahoma Corporation Commission (OCC)',
        url: 'https://oklahoma.gov/occ.html',
        supportedTopic: 'Wind energy generation leadership and OCC rate regulation',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Oklahoma State Energy Profile & Data Overview',
        name: 'EIA Oklahoma State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=OK',
        supportedTopic: 'Oklahoma wind power production rank and energy mix',
      },
    ],
    relatedStateSlugs: ['texas', 'kansas', 'missouri', 'arkansas'],
  },
  connecticut: {
    code: 'CT',
    slug: 'connecticut',
    name: 'Connecticut',
    metaTitle: 'Connecticut Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Analyze Connecticut residential electricity rates, PURA Choice benchmarks, Eversource and UI tariffs, and ISO New England winter trends.',
    overview:
      'Connecticut operates under a retail supplier choice framework with regulated distribution utilities Eversource (CL&P) and United Illuminating (UI) handling power delivery, while customers can select competitive retail suppliers or receive default Standard Service rates. Rates reflect ISO New England winter gas pipeline bottlenecks and regional transmission costs.',
    marketType: 'Retail supplier choice with regulated distribution',
    isPublished: true,
    keyFactors: [
      {
        title: 'PURA Standard Service Generation Auctions',
        description:
          'The Connecticut Public Utilities Regulatory Authority (PURA) supervises bi-annual supply procurements for default utility customers.',
      },
      {
        title: 'ISO New England Winter Fuel Constraints',
        description:
          'Regional natural gas pipeline bottlenecks during cold snaps influence seasonal electricity supply price spikes.',
      },
      {
        title: 'High Regional Transmission & Distribution Tariffs',
        description:
          'Densely populated coastal delivery networks contribute to higher baseline residential delivery fees across Connecticut.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'Connecticut Public Utilities Regulatory Authority (PURA)',
        title: 'Connecticut Electric Choice & PURA Rate Decisions',
        name: 'Connecticut Public Utilities Regulatory Authority (PURA)',
        url: 'https://portal.ct.gov/pura',
        supportedTopic: 'PURA Standard Service auctions and ISO New England winter constraints',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Connecticut State Energy Profile & Data Overview',
        name: 'EIA Connecticut State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=CT',
        supportedTopic: 'Connecticut retail choice and ISO New England grid context',
      },
    ],
    relatedStateSlugs: ['massachusetts', 'new-york', 'rhode-island', 'vermont'],
  },
  iowa: {
    code: 'IA',
    slug: 'iowa',
    name: 'Iowa',
    metaTitle: 'Iowa Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Review Iowa residential electricity rates, IUC regulation, MidAmerican and Alliant Energy tariffs, and nation-leading wind energy generation.',
    overview:
      'Iowa operates a regulated electric utility market supervised by the Iowa Utilities Commission (IUC). Investor-owned MidAmerican Energy and Alliant Energy (Interstate Power and Light) serve major urban centers, flanked by consumer-owned municipal systems and rural electric co-ops. Iowa leads the nation in wind power reliance, generating a major share of its electricity from wind energy.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Nation-Leading Wind Energy Reliance',
        description:
          'Iowa produces a dominant share of net electricity generation from wind power, stabilizing long-term energy supply costs across the state.',
      },
      {
        title: 'MISO Grid Integration & Agricultural Load',
        description:
          'Utilities participate in the MISO regional grid, serving heavy grain drying and agricultural manufacturing demand.',
      },
      {
        title: 'Severe Winter & Summer Seasonal Extreme Loads',
        description:
          'Cold Midwestern winters and hot summer cooling periods drive seasonal residential consumption spikes across Iowa homes.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail electricity rate metrics',
      },
      {
        organization: 'Iowa Utilities Commission (IUC)',
        title: 'Iowa Electric Rate Filings & Wind Capacity Oversight',
        name: 'Iowa Utilities Commission (IUC)',
        url: 'https://iuc.iowa.gov/',
        supportedTopic: 'Wind energy generation reliance and IUC rate regulation',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Iowa State Energy Profile & Data Overview',
        name: 'EIA Iowa State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=IA',
        supportedTopic: 'Iowa wind generation share and state energy profile',
      },
    ],
    relatedStateSlugs: ['minnesota', 'wisconsin', 'illinois', 'missouri'],
  },
  // BATCH 4 NEWLY PUBLISHED STATES
  nevada: {
    code: 'NV',
    slug: 'nevada',
    name: 'Nevada',
    metaTitle: 'Nevada Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'View Nevada residential electricity rates, average monthly household bills, PUCN utility regulation, solar generation, and desert cooling drivers.',
    overview:
      'Nevada operates a regulated electric utility structure under the Public Utilities Commission of Nevada (PUCN). NV Energy (operating as Nevada Power in southern Nevada and Sierra Pacific Power in northern Nevada) serves the vast majority of residential households. Rates reflect high summer air conditioning loads in desert climates, utility-scale solar generation expansion, and Western grid power transfers.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Desert Climate Cooling Demand',
        description:
          'Prolonged summer heat waves in Southern Nevada drive intense air conditioning usage, creating sharp seasonal consumption spikes.',
      },
      {
        title: 'Utility Solar & Storage Buildout',
        description:
          'Nevada features extensive utility-scale solar installations across desert basins, backed by battery storage to support evening peak demand.',
      },
      {
        title: 'PUCN Regulatory & Rate Oversight',
        description:
          'Multi-year general rate cases and energy efficiency surcharges approved by the Public Utilities Commission of Nevada regulate utility delivery tariffs.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly residential electricity sales and retail revenue',
      },
      {
        organization: 'Public Utilities Commission of Nevada (PUCN)',
        title: 'Nevada Electric Utility Rate Filings & Energy Rules',
        name: 'Public Utilities Commission of Nevada (PUCN)',
        url: 'https://puc.nv.gov/',
        supportedTopic: 'PUCN rate regulation and utility solar rules',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Nevada State Energy Profile & Data Overview',
        name: 'EIA Nevada State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=NV',
        supportedTopic: 'Nevada solar energy production and generation profile',
      },
    ],
    relatedStateSlugs: ['california', 'arizona', 'utah', 'idaho'],
  },
  arkansas: {
    code: 'AR',
    slug: 'arkansas',
    name: 'Arkansas',
    metaTitle: 'Arkansas Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Explore Arkansas residential electricity rates, Entergy Arkansas tariffs, APSC regulation, and seasonal energy bill benchmarks.',
    overview:
      'Arkansas operates a traditionally regulated electric utility market overseen by the Arkansas Public Service Commission (APSC). Investor-owned Entergy Arkansas serves the majority of residential homes alongside Southwestern Electric Power Company (SWEPCO), Oklahoma Gas & Electric (OG&E), and electric cooperatives. Rates reflect natural gas, nuclear, and hydroelectric generation portfolios.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Natural Gas & Nuclear Baseload Portfolio',
        description:
          'Natural gas combined-cycle facilities and nuclear power (Arkansas Nuclear One) supply reliable baseline electricity across the state.',
      },
      {
        title: 'Humid Subtropical Summer Cooling Load',
        description:
          'High summer heat and humidity require extensive air conditioning usage across residential households throughout central and southern Arkansas.',
      },
      {
        title: 'APSC Rate & Formula Regulatory Filings',
        description:
          'Formula rate plan reviews and fuel cost adjustment clauses supervised by state regulators govern retail electricity tariffs.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'Arkansas Public Service Commission (APSC)',
        title: 'Arkansas Utility Base Orders & Rate Plan Oversight',
        name: 'Arkansas Public Service Commission (APSC)',
        url: 'https://apsc.arkansas.gov/',
        supportedTopic: 'APSC utility regulation and formula rate plans',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Arkansas State Energy Profile & Data Overview',
        name: 'EIA Arkansas State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=AR',
        supportedTopic: 'Arkansas generation mix and nuclear baseload context',
      },
    ],
    relatedStateSlugs: ['louisiana', 'mississippi', 'oklahoma', 'missouri'],
  },
  mississippi: {
    code: 'MS',
    slug: 'mississippi',
    name: 'Mississippi',
    metaTitle: 'Mississippi Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Analyze Mississippi residential electricity rates, Entergy Mississippi tariffs, MPSC regulation, natural gas reliance, and cooling loads.',
    overview:
      'Mississippi operates a regulated utility framework supervised by the Mississippi Public Service Commission (MPSC). Primary investor-owned utilities Entergy Mississippi and Mississippi Power serve residential load alongside municipal distribution systems and rural electric cooperatives. Rates reflect heavy summer cooling loads and reliance on natural gas and nuclear generation.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Natural Gas Fuel Generation Reliance',
        description:
          'Natural gas power plants supply the major portion of Mississippi net electricity, tying utility fuel adjustments to wholesale gas market trends.',
      },
      {
        title: 'Deep South Cooling Intensity',
        description:
          'High humidity and extended summer heatwaves require prolonged air conditioning usage throughout residential households.',
      },
      {
        title: 'MPSC Rate Formula & Grid Hardening Surcharges',
        description:
          'Formula rate adjustments and storm recovery riders approved by the Mississippi PSC govern distribution charges and infrastructure investments.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail electricity metrics',
      },
      {
        organization: 'Mississippi Public Service Commission (MPSC)',
        title: 'Mississippi Electric Utility Regulation & Tariff Orders',
        name: 'Mississippi Public Service Commission (MPSC)',
        url: 'https://www.psc.ms.gov/',
        supportedTopic: 'MPSC rate formula oversight and storm riders',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Mississippi State Energy Profile & Data Overview',
        name: 'EIA Mississippi State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=MS',
        supportedTopic: 'Mississippi natural gas generation share',
      },
    ],
    relatedStateSlugs: ['alabama', 'louisiana', 'tennessee', 'arkansas'],
  },
  kansas: {
    code: 'KS',
    slug: 'kansas',
    name: 'Kansas',
    metaTitle: 'Kansas Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Review Kansas residential electricity rates, Evergy regulated tariffs, KCC regulation, SPP wind power, and seasonal energy trends.',
    overview:
      'Kansas operates a regulated electric utility structure overseen by the Kansas Corporation Commission (KCC). Evergy (formed by the merger of Westar Energy and KCP&L) serves the major metropolitan centers alongside electric cooperatives and municipal utilities. Rates are supported by strong wind power generation, SPP regional grid integration, and dual seasonal climate demands.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Abundant Wind Generation Capacity',
        description:
          'Kansas ranks among leading U.S. states in wind power generation, integrating utility-scale wind farms into the regional SPP grid.',
      },
      {
        title: 'SPP Regional Grid Integration',
        description:
          'Southwest Power Pool transmission networks balance variable wind generation with natural gas and nuclear baseload power.',
      },
      {
        title: 'Extreme Seasonal Temperature Range',
        description:
          'Cold Midwestern winter temperatures and hot summer cooling periods drive seasonal residential electricity consumption spikes.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales benchmarks',
      },
      {
        organization: 'Kansas Corporation Commission (KCC)',
        title: 'Kansas Electric Utility Rate Cases & SPP Filings',
        name: 'Kansas Corporation Commission (KCC)',
        url: 'https://kcc.ks.gov/',
        supportedTopic: 'KCC rate regulation and SPP grid integration',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Kansas State Energy Profile & Data Overview',
        name: 'EIA Kansas State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=KS',
        supportedTopic: 'Kansas wind power production rank and energy mix',
      },
    ],
    relatedStateSlugs: ['oklahoma', 'missouri', 'nebraska', 'colorado'],
  },
  utah: {
    code: 'UT',
    slug: 'utah',
    name: 'Utah',
    metaTitle: 'Utah Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Discover Utah residential electricity rates, Rocky Mountain Power tariffs, UPSC regulation, and regional energy transition benchmarks.',
    overview:
      'Utah operates a regulated electric utility market supervised by the Utah Public Service Commission (UPSC). Rocky Mountain Power (a division of PacifiCorp) provides service to the majority of residential households alongside municipal power systems. Rates reflect a historically coal-supported fleet transitioning toward utility solar, natural gas, and regional grid resources.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Generation Mix & Resource Transition',
        description:
          'PacifiCorp integrated resource plans transition capacity from coal units toward expanded solar installations, wind, and battery storage.',
      },
      {
        title: 'Wasatch Front Cooling & Winter Space Heating',
        description:
          'Rapid population growth along the Wasatch Front increases summer peak cooling demand alongside cold mountain winter space heating loads.',
      },
      {
        title: 'UPSC Multi-Year Rate Regulation',
        description:
          'The Utah PSC supervises general rate cases, grid hardening investments, and net metering tariffs for residential customers.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential rate statistics',
      },
      {
        organization: 'Utah Public Service Commission (UPSC)',
        title: 'Utah Rate Case Orders & PacifiCorp IRP Oversight',
        name: 'Utah Public Service Commission (UPSC)',
        url: 'https://psc.utah.gov/',
        supportedTopic: 'UPSC rate regulation and resource transition plans',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Utah State Energy Profile & Data Overview',
        name: 'EIA Utah State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=UT',
        supportedTopic: 'Utah generation mix and solar expansion profile',
      },
    ],
    relatedStateSlugs: ['colorado', 'nevada', 'idaho', 'arizona'],
  },
  nebraska: {
    code: 'NE',
    slug: 'nebraska',
    name: 'Nebraska',
    metaTitle: 'Nebraska Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Learn about Nebraska public power residential electricity rates, NPPD and OPPD benchmarks, and public power district cost structures.',
    overview:
      'Nebraska is unique as the only state served entirely by public power entities, including public power districts (such as Nebraska Public Power District and Omaha Public Power District), municipal utilities, and rural electric cooperatives. Overseen by local elected boards and the Nebraska Power Review Board, rates reflect non-profit public service, nuclear baseload generation, and wind integration.',
    marketType: 'Mixed municipal, cooperative, and investor-owned structure',
    isPublished: true,
    keyFactors: [
      {
        title: 'Public Power Non-Profit Structure',
        description:
          'Public power districts operate on a cost-of-service basis without shareholder returns, historically keeping residential baseline rates competitive.',
      },
      {
        title: 'Nuclear & Wind Generation Base',
        description:
          'Baseload nuclear generation (Cooper Nuclear Station) combined with growing wind power capacity supplies reliable low-carbon electricity.',
      },
      {
        title: 'Agricultural & Seasonal Climate Demands',
        description:
          'Severe Midwestern winter cold and hot summer weather drive residential climate conditioning loads alongside agricultural irrigation power demand.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail sales metrics',
      },
      {
        organization: 'Nebraska Power Review Board',
        title: 'Nebraska Public Power District Oversight & Annual Reports',
        name: 'Nebraska Power Review Board',
        url: 'https://prb.nebraska.gov/',
        supportedTopic: 'Public power non-profit model and utility oversight',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Nebraska State Energy Profile & Data Overview',
        name: 'EIA Nebraska State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=NE',
        supportedTopic: 'Nebraska public power structure and nuclear baseload',
      },
    ],
    relatedStateSlugs: ['iowa', 'kansas', 'south-dakota', 'colorado'],
  },
  'new-mexico': {
    code: 'NM',
    slug: 'new-mexico',
    name: 'New Mexico',
    metaTitle: 'New Mexico Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Compare New Mexico residential electricity rates, PNM tariffs, NMPRC regulation, solar/wind growth, and desert climate energy costs.',
    overview:
      'New Mexico operates a regulated electricity market framework supervised by the New Mexico Public Regulation Commission (NMPRC). Public Service Company of New Mexico (PNM) and Southwestern Public Service (SPS/Xcel Energy) serve primary population centers alongside electric co-ops. Rates reflect transition away from coal toward expanded utility solar, wind generation, and desert cooling loads.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Solar & Wind Resource Expansion',
        description:
          'High solar irradiance across high-desert regions accelerates utility-scale photovoltaic solar development and battery storage projects.',
      },
      {
        title: 'Energy Transition Act Decarbonization Targets',
        description:
          'State clean energy legislation targets progressive clean power goals, supporting coal plant closures and renewable replacement capacity.',
      },
      {
        title: 'High-Desert Cooling & Heating Demands',
        description:
          'Desert summer heat drives residential air conditioning loads, while cold mountain winter nights require significant space heating.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales data',
      },
      {
        organization: 'New Mexico Public Regulation Commission (NMPRC)',
        title: 'New Mexico Utility Rate Cases & Clean Energy Mandates',
        name: 'New Mexico Public Regulation Commission (NMPRC)',
        url: 'https://www.nm-prc.org/',
        supportedTopic: 'NMPRC rate regulation and Energy Transition Act compliance',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'New Mexico State Energy Profile & Data Overview',
        name: 'EIA New Mexico State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=NM',
        supportedTopic: 'New Mexico solar generation growth and high-desert profile',
      },
    ],
    relatedStateSlugs: ['arizona', 'colorado', 'texas', 'utah'],
  },
  'west-virginia': {
    code: 'WV',
    slug: 'west-virginia',
    name: 'West Virginia',
    metaTitle: 'West Virginia Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Examine West Virginia residential electricity rates, Appalachian Power and Mon Power tariffs, WVPSC regulation, and coal generation context.',
    overview:
      'West Virginia operates a traditional regulated electric utility market overseen by the Public Service Commission of West Virginia (WVPSC). Service is provided primarily by Appalachian Power, Wheeling Power (AEP), Monongahela Power, and Potomac Edison (FirstEnergy). Rates reflect a historically coal-dominant generation fleet, mountain terrain delivery costs, and grid reliability upgrades.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Coal Baseload Generation Dominance',
        description:
          'Coal power plants generate the majority of West Virginia net electricity, providing firm baseline energy while facing environmental compliance costs.',
      },
      {
        title: 'Appalachian Mountain Winter Heating Load',
        description:
          'Rugged terrain and severe mountain winter temperatures drive heavy electric space heating consumption across West Virginia homes.',
      },
      {
        title: 'WVPSC Utility Rate & Infrastructure Regulation',
        description:
          'Base rate proceedings, vegetation management surcharges, and transmission modernization programs influence monthly residential delivery fees.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Monthly retail electricity rate metrics',
      },
      {
        organization: 'Public Service Commission of West Virginia (WVPSC)',
        title: 'West Virginia Utility Rate Filings & Tariff Orders',
        name: 'Public Service Commission of West Virginia (WVPSC)',
        url: 'https://www.psc.state.wv.us/',
        supportedTopic: 'WVPSC rate regulation and infrastructure surcharges',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'West Virginia State Energy Profile & Data Overview',
        name: 'EIA West Virginia State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=WV',
        supportedTopic: 'West Virginia coal generation share and mountain grid profile',
      },
    ],
    relatedStateSlugs: ['virginia', 'pennsylvania', 'ohio', 'kentucky'],
  },
  idaho: {
    code: 'ID',
    slug: 'idaho',
    name: 'Idaho',
    metaTitle: 'Idaho Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Find Idaho residential electricity rates, Idaho Power benchmarks, IPUC regulation, Snake River hydro generation, and seasonal bill drivers.',
    overview:
      'Idaho operates a regulated electric utility structure supervised by the Idaho Public Utilities Commission (IPUC). Investor-owned Idaho Power, Avista Utilities, and Rocky Mountain Power serve residential homes alongside consumer-owned utilities. Rates benefit from low-cost Snake River basin hydroelectric generation, balanced by growing agricultural and summer cooling loads.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Hydroelectric Generation Base',
        description:
          'Snake River dams supply a major share of low-cost, zero-carbon hydroelectric power, supporting competitive residential rates.',
      },
      {
        title: 'Agricultural Irrigation & Summer Peak Demand',
        description:
          'Summer irrigation pumping load combined with residential AC cooling creates sharp seasonal peak demand across Southern Idaho.',
      },
      {
        title: 'IPUC Rate Oversight & Clean Energy Goals',
        description:
          'Multi-year rate cases and clean energy transition filings approved by the Idaho PUC guide transmission expansion and grid reliability.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales benchmarks',
      },
      {
        organization: 'Idaho Public Utilities Commission (IPUC)',
        title: 'Idaho Rate Orders & Idaho Power IRP Oversight',
        name: 'Idaho Public Utilities Commission (IPUC)',
        url: 'https://puc.idaho.gov/',
        supportedTopic: 'IPUC rate regulation and hydroelectric grid oversight',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Idaho State Energy Profile & Data Overview',
        name: 'EIA Idaho State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=ID',
        supportedTopic: 'Idaho Snake River hydroelectric generation share',
      },
    ],
    relatedStateSlugs: ['washington', 'oregon', 'utah', 'nevada'],
  },
  hawaii: {
    code: 'HI',
    slug: 'hawaii',
    name: 'Hawaii',
    metaTitle: 'Hawaii Residential Electricity Rates & Monthly Cost',
    metaDescription:
      'Understand Hawaii residential electricity rates, HECO tariffs, HPUC regulation, island grid oil fuel costs, and rooftop solar adoption.',
    overview:
      'Hawaii operates isolated island electric grids regulated by the Hawaii Public Utilities Commission (HPUC). Hawaiian Electric Companies (HECO, MECO, HELCO) serve Oahu, Maui, and Hawaii Island, while Kauai Island Utility Cooperative (KIUC) serves Kauai. Because island grids rely historically on imported petroleum fuel, Hawaii residential electricity rates rank highest in the nation.',
    marketType: 'Regulated Utility Market',
    isPublished: true,
    keyFactors: [
      {
        title: 'Isolated Island Grids & Fuel Import Dependency',
        description:
          'Isolated electrical systems cannot import power from neighboring regions, making baseline rates highly sensitive to global oil pricing.',
      },
      {
        title: 'Nation-Leading Rooftop Solar Adoption',
        description:
          'High electricity rates drive widespread residential rooftop solar and battery storage adoption across all Hawaiian islands.',
      },
      {
        title: 'Statutory 100% Clean Energy Mandate',
        description:
          'State climate legislation mandates 100% renewable electricity supply, accelerating utility-scale solar, geothermal, and wind grid integration.',
      },
    ],
    sources: [
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Form EIA-861M Monthly Retail Sales',
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
        supportedTopic: 'Statewide residential sales statistics',
      },
      {
        organization: 'Hawaii Public Utilities Commission (HPUC)',
        title: 'Hawaii HECO Base Orders & Clean Energy Mandates',
        name: 'Hawaii Public Utilities Commission (HPUC)',
        url: 'https://puc.hawaii.gov/',
        supportedTopic: 'HPUC rate regulation and 100% renewable mandate',
      },
      {
        organization: 'U.S. Energy Information Administration (EIA)',
        title: 'Hawaii State Energy Profile & Data Overview',
        name: 'EIA Hawaii State Energy Profile',
        url: 'https://www.eia.gov/state/?sid=HI',
        supportedTopic: 'Hawaii isolated island grid and high electricity cost profile',
      },
    ],
    relatedStateSlugs: ['california', 'washington', 'oregon', 'arizona'],
  },
};

export const FIRST_TEN_STATES = PUBLISHED_STATES;

export const PUBLISHED_STATE_CONFIGS = Object.values(PUBLISHED_STATES).filter(
  (state) => state.isPublished,
);

export const APPROVED_STATE_SLUGS = PUBLISHED_STATE_CONFIGS.map((state) => state.slug);

export const PUBLISHED_STATE_ROUTES = PUBLISHED_STATE_CONFIGS.map(
  (state) => `/electricity-rates/${state.slug}` as const,
);

export function isApprovedStateSlug(slug: string): boolean {
  return APPROVED_STATE_SLUGS.includes(slug.toLowerCase());
}

export function getPublishedStateConfig(slug: string): PublishedStateConfig | null {
  return PUBLISHED_STATES[slug.toLowerCase()] || null;
}

export const getFirstTenStateConfig = getPublishedStateConfig;
