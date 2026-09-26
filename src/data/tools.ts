export type ToolDefinition = {
  slug: string;
  title: string;
  category: string;
  description: string;
  keywords: string[];
  inputs: { key: string; label: string; type: 'number'; placeholder?: string }[];
  calculate: (values: Record<string, number>) => string;
};

const n = (value: number) => Number.isFinite(value) ? value : 0;
const fmt = (value: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);

export const tools: ToolDefinition[] = [
  {
    slug: 'percentage-calculator', title: 'Percentage Calculator', category: 'calculators',
    description: 'Calculate what a percentage of a number is.', keywords: ['percent','percentage','calculator'],
    inputs: [{key:'percent',label:'Percentage',type:'number',placeholder:'20'},{key:'number',label:'Number',type:'number',placeholder:'250'}],
    calculate: v => `${fmt(n(v.percent) * n(v.number) / 100)}`
  },
  {
    slug: 'percentage-change-calculator', title: 'Percentage Change Calculator', category: 'calculators',
    description: 'Find the percentage increase or decrease between two values.', keywords: ['percent change','increase','decrease'],
    inputs: [{key:'old',label:'Original value',type:'number',placeholder:'100'},{key:'new',label:'New value',type:'number',placeholder:'125'}],
    calculate: v => n(v.old) === 0 ? 'Original value cannot be 0.' : `${fmt((n(v.new)-n(v.old))/Math.abs(n(v.old))*100)}%`
  },
  {
    slug: 'discount-calculator', title: 'Discount Calculator', category: 'calculators',
    description: 'Calculate discount amount and final sale price.', keywords: ['discount','sale price','shopping'],
    inputs: [{key:'price',label:'Original price',type:'number',placeholder:'1000'},{key:'discount',label:'Discount %',type:'number',placeholder:'20'}],
    calculate: v => { const d=n(v.price)*n(v.discount)/100; return `Discount: ${fmt(d)} | Final price: ${fmt(n(v.price)-d)}`; }
  },
  {
    slug: 'profit-calculator', title: 'Profit Calculator', category: 'calculators',
    description: 'Calculate profit and profit percentage from cost and selling price.', keywords: ['profit','business','selling price'],
    inputs: [{key:'cost',label:'Cost price',type:'number',placeholder:'500'},{key:'selling',label:'Selling price',type:'number',placeholder:'750'}],
    calculate: v => { const p=n(v.selling)-n(v.cost); return `Profit: ${fmt(p)} | Profit %: ${n(v.cost) ? fmt(p/n(v.cost)*100)+'%' : 'N/A'}`; }
  },
  {
    slug: 'margin-calculator', title: 'Margin Calculator', category: 'calculators',
    description: 'Calculate profit margin from revenue and cost.', keywords: ['margin','profit margin','business'],
    inputs: [{key:'revenue',label:'Revenue',type:'number',placeholder:'1000'},{key:'cost',label:'Cost',type:'number',placeholder:'600'}],
    calculate: v => n(v.revenue) === 0 ? 'Revenue cannot be 0.' : `${fmt((n(v.revenue)-n(v.cost))/n(v.revenue)*100)}% margin`
  },
  {
    slug: 'markup-calculator', title: 'Markup Calculator', category: 'calculators',
    description: 'Calculate markup percentage and selling price from cost.', keywords: ['markup','pricing','business'],
    inputs: [{key:'cost',label:'Cost',type:'number',placeholder:'500'},{key:'markup',label:'Markup %',type:'number',placeholder:'40'}],
    calculate: v => { const m=n(v.cost)*n(v.markup)/100; return `Markup: ${fmt(m)} | Selling price: ${fmt(n(v.cost)+m)}`; }
  },
  {
    slug: 'ratio-calculator', title: 'Ratio Calculator', category: 'calculators',
    description: 'Simplify a ratio and calculate proportional values.', keywords: ['ratio','simplify ratio','proportion'],
    inputs: [{key:'a',label:'First value',type:'number',placeholder:'24'},{key:'b',label:'Second value',type:'number',placeholder:'36'}],
    calculate: v => { const a=Math.abs(n(v.a)), b=Math.abs(n(v.b)); let x=a,y=b; while(y){const t=x%y;x=y;y=t;} return x ? `${fmt(a/x)} : ${fmt(b/x)}` : 'Enter non-zero values.'; }
  },
  {
    slug: 'average-calculator', title: 'Average Calculator', category: 'calculators',
    description: 'Calculate the arithmetic mean of up to five numbers.', keywords: ['average','mean','math'],
    inputs: [{key:'a',label:'Number 1',type:'number',placeholder:'10'},{key:'b',label:'Number 2',type:'number',placeholder:'20'},{key:'c',label:'Number 3',type:'number',placeholder:'30'},{key:'d',label:'Number 4',type:'number',placeholder:'40'},{key:'e',label:'Number 5',type:'number',placeholder:'50'}],
    calculate: v => { const values=Object.values(v).filter(x=>Number.isFinite(x)); return values.length ? fmt(values.reduce((a,b)=>a+b,0)/values.length) : 'Enter values.'; }
  },
  {
    slug: 'fraction-calculator', title: 'Fraction Calculator', category: 'calculators',
    description: 'Add two fractions and get the decimal result.', keywords: ['fraction','fractions','math'],
    inputs: [{key:'a',label:'Numerator 1',type:'number',placeholder:'1'},{key:'b',label:'Denominator 1',type:'number',placeholder:'2'},{key:'c',label:'Numerator 2',type:'number',placeholder:'1'},{key:'d',label:'Denominator 2',type:'number',placeholder:'4'}],
    calculate: v => { const b=n(v.b),d=n(v.d); if(!b||!d)return 'Denominators cannot be 0.'; const num=n(v.a)*d+n(v.c)*b, den=b*d; return `${fmt(num)} / ${fmt(den)} = ${fmt(num/den)}`; }
  },
  {
    slug: 'tip-calculator', title: 'Tip Calculator', category: 'calculators',
    description: 'Calculate tip amount and total bill.', keywords: ['tip','gratuity','restaurant'],
    inputs: [{key:'bill',label:'Bill amount',type:'number',placeholder:'1000'},{key:'tip',label:'Tip %',type:'number',placeholder:'10'}],
    calculate: v => { const tip=n(v.bill)*n(v.tip)/100; return `Tip: ${fmt(tip)} | Total: ${fmt(n(v.bill)+tip)}`; }
  }
];

export const categories = [...new Set(tools.map(t => t.category))];
export const getTool = (slug: string) => tools.find(t => t.slug === slug);
