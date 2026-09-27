# ZERO website

Clean editorial clothing-brand storefront for ZERO.

## Security notes
- No API keys, passwords, access tokens, or private credentials belong in this static frontend.
- No visitor email addresses are stored in localStorage or cookies.
- Search results are rendered with DOM text APIs rather than interpolating user input into HTML.
- A restrictive Content Security Policy is included in `index.html`.
- The site is static and currently has no authenticated/admin functionality.

## Future backend work
If ZERO later adds checkout, accounts, newsletter storage, analytics, or admin tools, keep secrets and authorization on a server-side backend rather than in browser JavaScript.