# Environment Variables

See the root `README.md` for setup basics.

Tracked environment examples are placeholders only:

- `.env.example`
- `apps/web/.env.example`
- `apps/api/.env.example`

Real `.env` files must remain ignored.

| Variable                               | App                  |                     Required | Exposure             | Safe example                                                                     |
| -------------------------------------- | -------------------- | ---------------------------: | -------------------- | -------------------------------------------------------------------------------- |
| `NODE_ENV`                             | API/root tooling     |                          Yes | Server-only          | `development`                                                                    |
| `NEXT_PUBLIC_SITE_URL`                 | Web                  |                          Yes | Public browser value | `http://localhost:3000`                                                          |
| `NEXT_PUBLIC_CONTACT_EMAIL`            | Web                  |         Yes for contact page | Public browser value | `contact@example.com`                                                            |
| `NEXT_PUBLIC_GTM_ID`                   | Web                  |      Optional (has fallback) | Public browser value | `GTM-XXXXXXX`                                                                    |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID`        | Web                  |      Optional (has fallback) | Public browser value | `ca-pub-XXXXXXXXXXXXXXXX`                                                        |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Web                  |                     Optional | Public browser value | `google1234567890abcdef`                                                         |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | Web                  |                     Optional | Public browser value | `0123456789ABCDEF0123456789ABCDEF`                                               |
| `API_HOST`                             | API                  |                          Yes | Server-only          | `0.0.0.0`                                                                        |
| `API_PORT`                             | API                  |                          Yes | Server-only          | `4000`                                                                           |
| `DATABASE_URL`                         | API/database package |       Future database phases | Server-only          | `postgresql://user:password@localhost:5432/energy_bill_lab`                      |
| `DATABASE_URL_POOLED`                  | API/database package | Future pooled database usage | Server-only          | `postgresql://user:password@ep-xxxx-pooler.aws.neon.tech/neondb?sslmode=require` |

Variables beginning with `NEXT_PUBLIC_` are exposed to browser code. Do not place secrets in them.

The repository owner must rotate any credential that was visible to an AI coding environment.
