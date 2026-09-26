export type DairyTool = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  inputs: { key: string; label: string; placeholder: string }[];
};

export const dairyTools: DairyTool[] = [
  { slug: 'buffalo-feed-calculator', title: 'Buffalo Feed Calculator', description: 'Estimate a buffalo\'s daily feed quantities from body weight and milk production inputs.', keywords: ['buffalo feed calculator', 'buffalo ration calculator', 'buffalo feeding'], inputs: [
    { key: 'weight', label: 'Body weight (kg)', placeholder: '500' }, { key: 'milk', label: 'Milk production (litres/day)', placeholder: '10' }, { key: 'dry', label: 'Dry fodder available (kg/day)', placeholder: '5' }, { key: 'green', label: 'Green fodder available (kg/day)', placeholder: '15' }
  ] },
  { slug: 'buffalo-feed-cost-calculator', title: 'Buffalo Feed Cost Calculator', description: 'Estimate daily and monthly feed cost for a buffalo using your local fodder prices.', keywords: ['buffalo feed cost calculator', 'cattle feed cost', 'dairy feed cost'], inputs: [
    { key: 'greenQty', label: 'Green fodder (kg/day)', placeholder: '15' }, { key: 'greenPrice', label: 'Green fodder price (₹/kg)', placeholder: '3' }, { key: 'dryQty', label: 'Dry fodder (kg/day)', placeholder: '5' }, { key: 'dryPrice', label: 'Dry fodder price (₹/kg)', placeholder: '7' }, { key: 'concQty', label: 'Concentrate (kg/day)', placeholder: '5' }, { key: 'concPrice', label: 'Concentrate price (₹/kg)', placeholder: '30' }
  ] },
  { slug: 'milk-profit-calculator', title: 'Milk Production Profit Calculator', description: 'Estimate dairy milk revenue, daily operating cost and monthly profit from your own inputs.', keywords: ['milk profit calculator', 'dairy profit calculator', 'buffalo milk profit'], inputs: [
    { key: 'milk', label: 'Milk sold (litres/day)', placeholder: '10' }, { key: 'milkPrice', label: 'Milk selling price (₹/litre)', placeholder: '65' }, { key: 'feed', label: 'Feed cost (₹/day)', placeholder: '180' }, { key: 'labour', label: 'Labour cost (₹/day)', placeholder: '50' }, { key: 'other', label: 'Other cost (₹/day)', placeholder: '30' }
  ] },
  { slug: 'feed-cost-per-litre-calculator', title: 'Feed Cost Per Litre of Milk Calculator', description: 'Calculate how much you spend on feed for each litre of milk produced.', keywords: ['feed cost per litre milk', 'milk feed cost', 'dairy feed efficiency'], inputs: [
    { key: 'feed', label: 'Total feed cost (₹/day)', placeholder: '250' }, { key: 'milk', label: 'Milk production (litres/day)', placeholder: '10' }
  ] },
  { slug: 'dairy-break-even-calculator', title: 'Dairy Break-Even Calculator', description: 'Estimate the milk volume needed each day to cover daily dairy costs.', keywords: ['dairy break even calculator', 'milk break even', 'dairy breakeven'], inputs: [
    { key: 'fixed', label: 'Fixed cost (₹/day)', placeholder: '500' }, { key: 'variable', label: 'Variable cost (₹/litre)', placeholder: '30' }, { key: 'price', label: 'Milk selling price (₹/litre)', placeholder: '60' }
  ] },
  { slug: 'dairy-farm-profit-calculator', title: 'Dairy Farm Profit Calculator', description: 'Estimate monthly dairy farm revenue, costs and profit for multiple animals.', keywords: ['dairy farm profit calculator', 'dairy business calculator', 'dairy ROI'], inputs: [
    { key: 'animals', label: 'Number of milking animals', placeholder: '10' }, { key: 'milk', label: 'Average milk per animal (L/day)', placeholder: '10' }, { key: 'price', label: 'Milk price (₹/L)', placeholder: '65' }, { key: 'cost', label: 'Cost per animal/day (₹)', placeholder: '250' }, { key: 'other', label: 'Other monthly costs (₹)', placeholder: '10000' }
  ] },
  { slug: 'dairy-startup-cost-calculator', title: 'Dairy Farm Startup Cost Calculator', description: 'Build a simple estimate for starting a dairy farm from animal count and setup costs.', keywords: ['dairy farm startup cost', 'dairy setup cost calculator', 'dairy farm investment'], inputs: [
    { key: 'animals', label: 'Number of animals', placeholder: '10' }, { key: 'animalCost', label: 'Average animal cost (₹)', placeholder: '80000' }, { key: 'shed', label: 'Shed/setup cost (₹)', placeholder: '300000' }, { key: 'equipment', label: 'Equipment cost (₹)', placeholder: '100000' }, { key: 'working', label: 'Initial working capital (₹)', placeholder: '100000' }
  ] },
  { slug: 'cow-vs-buffalo-profit-calculator', title: 'Cow vs Buffalo Profit Calculator', description: 'Compare estimated daily milk revenue and feeding cost for a cow and a buffalo.', keywords: ['cow vs buffalo profit', 'cow buffalo comparison', 'dairy animal comparison'], inputs: [
    { key: 'cowMilk', label: 'Cow milk (L/day)', placeholder: '8' }, { key: 'cowPrice', label: 'Cow milk price (₹/L)', placeholder: '50' }, { key: 'cowFeed', label: 'Cow feed cost (₹/day)', placeholder: '180' }, { key: 'buffMilk', label: 'Buffalo milk (L/day)', placeholder: '10' }, { key: 'buffPrice', label: 'Buffalo milk price (₹/L)', placeholder: '65' }, { key: 'buffFeed', label: 'Buffalo feed cost (₹/day)', placeholder: '220' }
  ] },
  { slug: 'dairy-loan-profit-calculator', title: 'Dairy Loan & Profit Calculator', description: 'Estimate a monthly dairy loan payment and compare it with estimated monthly operating profit.', keywords: ['dairy loan calculator', 'dairy EMI calculator', 'dairy loan profit'], inputs: [
    { key: 'loan', label: 'Loan amount (₹)', placeholder: '1000000' }, { key: 'rate', label: 'Annual interest rate (%)', placeholder: '9' }, { key: 'months', label: 'Loan term (months)', placeholder: '60' }, { key: 'profit', label: 'Estimated monthly operating profit (₹)', placeholder: '30000' }
  ] },
  { slug: 'buffalo-milk-feed-ratio-calculator', title: 'Buffalo Milk-to-Feed Ratio Calculator', description: 'Calculate milk output relative to daily feed cost as a simple farm-efficiency indicator.', keywords: ['milk feed ratio', 'buffalo feed efficiency', 'dairy efficiency calculator'], inputs: [
    { key: 'milk', label: 'Milk production (litres/day)', placeholder: '10' }, { key: 'feed', label: 'Feed cost (₹/day)', placeholder: '250' }
  ] }
];
