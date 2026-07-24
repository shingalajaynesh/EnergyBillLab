export type FirstTenStateConfig = {
  code: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  marketType: 'Regulated Utility Market' | 'Retail Choice / Deregulated Market' | 'Hybrid Market';
  keyFactors: Array<{
    title: string;
    description: string;
  }>;
  sources: Array<{
    name: string;
    url: string;
  }>;
  relatedStateSlugs: string[];
};

export const FIRST_TEN_STATES: Record<string, FirstTenStateConfig> = {
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
    keyFactors: [
      {
        title: 'Renewable Mandates & Grid Transition',
        description:
          'California SB 100 mandates 100% clean electricity by 2045, accelerating solar and utility-scale battery storage investments that influence baseline residential delivery rates.',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'California Public Utilities Commission (CPUC)',
        url: 'https://www.cpuc.ca.gov/',
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
    keyFactors: [
      {
        title: 'ERCOT Grid & Market Structure',
        description:
          'The Electric Reliability Council of Texas (ERCOT) manages the grid for 90% of Texas residents. High summer temperatures drive peak demand above 85,000 MW, influencing wholesale generation costs.',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Public Utility Commission of Texas (PUCT)',
        url: 'https://www.puc.texas.gov/',
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
    keyFactors: [
      {
        title: 'Year-Round Air Conditioning Demand',
        description:
          'Florida households average higher total annual electricity consumption than the national average due to prolonged summer cooling and high humidity levels.',
      },
      {
        title: 'Natural Gas Fuel Dependence',
        description:
          'Over 70% of Florida net electricity generation comes from natural gas plants, making monthly utility fuel clause adjustments sensitive to natural gas commodity spot prices.',
      },
      {
        title: 'Storm Hardening & Undergrounding',
        description:
          'Major investor-owned utilities (FPL, Duke Energy Florida, Tampa Electric) pass approved hurricane resilience and undergrounding costs to residential retail tariffs.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Florida Public Service Commission (PSC)',
        url: 'https://www.psc.state.fl.us/',
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
    keyFactors: [
      {
        title: 'Upstate vs. Downstate Congestion',
        description:
          'Limited transmission line capacity between abundant Upstate hydro/nuclear capacity and high Downstate load centers creates regional price separation within the NYISO market.',
      },
      {
        title: 'CLCPA Clean Energy Mandates',
        description:
          'New York Climate Leadership and Community Protection Act targets 70% renewable electricity by 2030, funding offshore wind, solar, and grid upgrades.',
      },
      {
        title: 'Regulated Delivery vs. Energy Supply',
        description:
          'Consumers can choose Energy Services Companies (ESCOs) for supply while local utilities (Con Edison, National Grid, NYSEG) maintain monopoly delivery networks.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'New York Public Service Commission (NYPSC)',
        url: 'https://www.dps.ny.gov/',
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
    keyFactors: [
      {
        title: 'PJM Grid & Energy Production',
        description:
          'Pennsylvania ranks among the top states for net electricity generation, drawing from natural gas (Marcellus Shale), nuclear power, and coal.',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Pennsylvania Public Utility Commission (PAPUC)',
        url: 'https://www.puc.pa.gov/',
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
    keyFactors: [
      {
        title: 'Nuclear Power Generation Capacity',
        description:
          'Illinois generates more nuclear power than any other U.S. state, providing over 50% of the state’s electricity and stabilizing wholesale carbon-free energy supply.',
      },
      {
        title: 'Climate and Equitable Jobs Act (CEJA)',
        description:
          'Enacted in 2021, CEJA sets a 100% clean energy goal by 2050, supporting renewable development and funding nuclear plant preservation.',
      },
      {
        title: 'Regional RTO Price Variance',
        description:
          'Wholesale electricity prices differ between the ComEd zone in PJM and the Ameren zone in MISO based on regional transmission capacity and capacity auction clears.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Illinois Commerce Commission (ICC)',
        url: 'https://www.icc.illinois.gov/',
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
    keyFactors: [
      {
        title: 'PUCO Standard Service Auctions',
        description:
          'Local distribution companies (AEP Ohio, Duke Energy Ohio, FirstEnergy utilities, AES Ohio) procure default supply via competitive auctions supervised by PUCO.',
      },
      {
        title: 'Natural Gas & Coal Generation Shift',
        description:
          'Ohio’s generation portfolio has transitioned rapidly from coal to natural gas combined-cycle power plants, linking baseline energy rates to natural gas markets.',
      },
      {
        title: 'Municipal Aggregation Programs',
        description:
          'Many Ohio cities and townships organize opt-out municipal aggregation programs, negotiating bulk electricity supply contracts for local residents.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Public Utilities Commission of Ohio (PUCO)',
        url: 'https://puco.ohio.gov/',
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
    keyFactors: [
      {
        title: 'Vogtle Units 3 & 4 Nuclear Expansion',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Georgia Public Service Commission (PSC)',
        url: 'https://psc.ga.gov/',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'North Carolina Utilities Commission (NCUC)',
        url: 'https://www.ncuc.gov/',
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
    keyFactors: [
      {
        title: 'MPSC Clean Energy Plan Mandates',
        description:
          'Michigan’s 2023 clean energy legislation targets 80% clean energy by 2035 and 100% by 2040, accelerating solar, wind, and storage grid investments.',
      },
      {
        title: 'Grid Reliability & Vegetation Management',
        description:
          'Frequent severe winter ice storms and high tree canopy coverage require elevated tree-trimming and line hardening expenditures funded via retail rates.',
      },
      {
        title: 'Limited 10% Electric Choice Cap',
        description:
          'Michigan maintains a strict 10% statutory cap on retail electric choice, meaning the vast majority of residential homes receive full bundled utility service.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Michigan Public Service Commission (MPSC)',
        url: 'https://www.michigan.gov/mpsc',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Arizona Corporation Commission (ACC)',
        url: 'https://www.azcc.gov/',
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
    keyFactors: [
      {
        title: 'Data Center Demand Impact',
        description:
          'Northern Virginia hosts the world’s largest concentration of data centers, driving significant overall grid transmission investment and regional capacity load.',
      },
      {
        title: 'Virginia Clean Economy Act (VCEA)',
        description:
          'Enacted in 2020, VCEA mandates 100% carbon-free electricity by 2045 for Dominion Virginia, accelerating offshore wind and solar buildouts.',
      },
      {
        title: 'Dual Seasonal HVAC Peaks',
        description:
          'High heat pump penetration creates winter heating peaks alongside summer AC demand, influencing year-round residential consumption.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Virginia State Corporation Commission (SCC)',
        url: 'https://scc.virginia.gov/',
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
    keyFactors: [
      {
        title: 'Hydroelectric Power Advantage',
        description:
          'Hydroelectric dams provide over 60% of Washington’s electricity generation, supplying low-cost, zero-carbon power via the Bonneville Power Administration (BPA).',
      },
      {
        title: 'Clean Energy Transformation Act (CETA)',
        description:
          'CETA requires Washington utilities to transition to 100% clean electricity by 2045, phasing out coal-fired power imports by 2025.',
      },
      {
        title: 'Winter Space & Water Heating',
        description:
          'Because electricity rates are relatively low, electric heat pumps and resistance water heaters are widely used, creating peak winter demand.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Washington Utilities and Transportation Commission (UTC)',
        url: 'https://www.utc.wa.gov/',
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
    keyFactors: [
      {
        title: 'Basic Generation Service (BGS) Auctions',
        description:
          'New Jersey BPU supervises annual competitive BGS auctions that determine default supply rates for households that do not choose an third-party supplier.',
      },
      {
        title: 'Energy Master Plan & Clean Energy Goals',
        description:
          'State policy targets 100% clean energy by 2035, funding offshore wind procurement, community solar projects, and nuclear ZEC preservation.',
      },
      {
        title: 'Dense Transmission & Population Center',
        description:
          'High population density and regional PJM congestion charges contribute to higher baseline transmission and distribution delivery rates.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'New Jersey Board of Public Utilities (NJBPU)',
        url: 'https://www.nj.gov/bpu/',
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
    keyFactors: [
      {
        title: 'ISO New England Winter Pipeline Bottlenecks',
        description:
          'Winter natural gas pipeline constraints in New England force dual-fuel generators onto pricier LNG imports or oil, driving seasonal supply rate spikes.',
      },
      {
        title: 'Municipal Aggregation Programs',
        description:
          'Over 150 Massachusetts cities and towns operate opt-out municipal aggregation programs, contracting bulk green supply for residents.',
      },
      {
        title: '2050 Decarbonization Roadmap',
        description:
          'State law mandates net-zero greenhouse gas emissions by 2050, accelerating heat pump adoption and offshore wind transmission investments.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Massachusetts Department of Public Utilities (DPU)',
        url: 'https://www.mass.gov/orgs/department-of-public-utilities',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Tennessee Valley Authority (TVA)',
        url: 'https://www.tva.com/',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Indiana Utility Regulatory Commission (IURC)',
        url: 'https://www.in.gov/iurc/',
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
          'Missouri’s Renewable Energy Standard requires investor-owned utilities to acquire 15% of electricity from renewable resources.',
      },
    ],
    sources: [
      {
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Missouri Public Service Commission (MPSC)',
        url: 'https://psc.mo.gov/',
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
      'Maryland is a deregulated retail electric choice state within the PJM Interconnection. Households can choose an competitive supplier or receive default Standard Offer Service (SOS) from regulated utilities like BGE, Pepco, Delmarva Power, and Potomac Edison.',
    marketType: 'Retail Choice / Deregulated Market',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Maryland Public Service Commission (PSC)',
        url: 'https://www.psc.state.md.us/',
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
        name: 'U.S. EIA Form EIA-861M Monthly Retail Sales',
        url: 'https://www.eia.gov/electricity/monthly/',
      },
      {
        name: 'Public Service Commission of Wisconsin (PSCW)',
        url: 'https://psc.wi.gov/',
      },
    ],
    relatedStateSlugs: ['illinois', 'michigan', 'minnesota', 'iowa'],
  },
};

export const APPROVED_STATE_SLUGS = Object.keys(FIRST_TEN_STATES);

export function isApprovedStateSlug(slug: string): boolean {
  return APPROVED_STATE_SLUGS.includes(slug.toLowerCase());
}

export function getFirstTenStateConfig(slug: string): FirstTenStateConfig | null {
  return FIRST_TEN_STATES[slug.toLowerCase()] || null;
}
