# Ozarbox SEO Internal-Link Map

Purpose: connect the Blogger SEO layer to the interactive calculators without creating duplicate thin pages.

## Primary clusters

### Accounting
- DSCR Calculator -> Working Capital, Current Ratio, Debt-to-Equity, Business Loan Payment, Cash Conversion Cycle
- Cash Conversion Cycle -> Working Capital, Accounts Receivable Days, Accounts Payable Days, Inventory Turnover, DSCR
- Break-Even Revenue -> Project Profit Margin, Client Profitability, Retainer Pricing
- Working Capital -> Current Ratio, Quick Ratio, Cash Conversion Cycle, Inventory Turnover, Accounts Receivable Days, Accounts Payable Days
- Current Ratio -> Working Capital, Quick Ratio, Cash Conversion Cycle
- Debt-to-Equity -> DSCR, Business Loan Payment, Working Capital

### Professional Services
- Freelancer Hourly Rate -> Billable Utilization, Consultant Day Rate, Retainer Pricing, Project Profit Margin, Client Profitability
- Consultant Day Rate -> Freelancer Hourly Rate, Billable Utilization, Retainer Pricing, Project Profit Margin
- Client Profitability -> Project Profit Margin, Retainer Pricing, Freelancer Hourly Rate, Break-Even Revenue
- Retainer Pricing -> Freelancer Hourly Rate, Consultant Day Rate, Client Profitability, Project Profit Margin
- Billable Utilization -> Freelancer Hourly Rate, Consultant Day Rate, Client Profitability, Project Profit Margin
- Project Profit Margin -> Client Profitability, Retainer Pricing, Break-Even Revenue

### Tax
- Tax Gross-Up -> Self-Employed Tax Reserve, VAT Inclusive & Exclusive
- Self-Employed Tax Reserve -> Tax Gross-Up, Freelancer Hourly Rate, Client Profitability
- VAT Inclusive & Exclusive -> Tax Gross-Up

## Linking rules

1. Each Blogger landing page links to its matching interactive calculator.
2. Each landing page should contain 3-5 contextual internal links where those pages already exist.
3. Prefer links that answer the next logical user question; do not insert links solely for keyword density.
4. Use descriptive anchor text such as "cash conversion cycle calculator" rather than "click here".
5. Keep the calculator's canonical interactive URL stable.
6. Do not create a second Blogger page targeting the exact same search intent unless there is a clearly different intent.
7. When a new tool is added, update this map and add it to one primary cluster plus any genuinely relevant secondary cluster.

## Navigation architecture

Home -> Cluster -> Blogger explanation -> Interactive calculator -> Related calculators

The Blogger layer is the explanatory/search-intent layer. GitHub Pages is the interactive-tool layer until the platform moves to a custom domain.

## Measurement

For each landing page, record after indexing:
- impressions
- clicks
- CTR
- average position
- queries
- indexed/not indexed status

Use actual Search Console data to choose expansion targets instead of assuming that every long-tail keyword is low competition.
