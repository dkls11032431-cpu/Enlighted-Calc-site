# Appliance catalogue data workflow

The public appliance directory must only display exact-model facts supported by a source and a checked date.

## Current official integration findings (checked 2026-11-16)

- **Amazon India:** Use the Creators API, not legacy PA-API 5.0. Amazon's documentation states that API access requires an Amazon Associates account for the target marketplace, at least 10 qualifying sales in the preceding 30 days, registration through Associates Central, and API credentials. Do not place credentials in this static repository or browser JavaScript. Use a server-side integration only after account eligibility and licence terms are confirmed.
  - https://affiliate-program.amazon.in/creatorsapi/docs/
- **Flipkart:** Registered affiliates can access product search/details and offers through Affiliate APIs using an Affiliate ID and API token. Generate/rotate tokens only in the affiliate account; keep tokens server-side. Documentation warns that only one token is active per account and generating another disables the previous one.
  - https://affiliate.flipkart.com/api-docs/af_overview.html
  - https://affiliate.flipkart.com/api-docs/af_register.html
- **Google Merchant product reviews:** This is not a public review scraping endpoint. Google's Merchant API review management requires a product-review feed, Product Ratings programme enrollment, and API allowlisting.
  - https://developers.google.com/merchant/api/guides/reviews/products
- **Amazon Associates site review:** Amazon's current India help page says the site should contain robust original content (at least 10 posts is a good rule of thumb), be public, and generate at least 3 qualifying sales in the first 180 days for application review. This is separate from the Creators API's 10-sales-in-30-days API access threshold.
  - https://affiliate-program.amazon.in/help/node/topic/G8TW5AE9XL2VX9VM

## Workflow

1. Open `/tools/appliance-catalogue/` and enter the exact brand/model and official specification source.
2. Add BEE label facts only when verified from an official BEE source, including the label period.
3. Add retailer price/rating/review-count only for the exact model/variant, with retailer URL and checked date.
4. Export JSON. The editor stores records only in the current browser session and does not upload them.
5. Review exported records, remove any unverified fields, and merge them into `data/appliance-catalogue.json` through a pull request.
6. Do not publish a record marked `pending`. Do not scrape retailer pages, copy customer review text, or use data outside the relevant provider's licence.

## Security

Never commit Amazon client secrets, Flipkart API tokens, access keys, cookies, or account credentials. API calls must be made server-side through protected secrets after the user confirms eligibility and access. Static GitHub Pages files are public and must never contain credentials.

## Record quality

Every model needs:
- exact brand and model number
- category and variant
- official specification URL and checked date
- verification status
- source URL and checked date for each time-sensitive retailer field
- official BEE source and label period if a star rating is displayed

An empty field means **not verified / not available**, not zero and not an assumed value.
