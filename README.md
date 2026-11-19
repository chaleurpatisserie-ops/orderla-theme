# orderla-theme

Chaleur Atelier's Orderla store look: brand theme, W1 Christmas waves, snow and sleigh, the béret host and Feuille the gardener, and the build-your-own box builder.

Each Orderla form's **Analytics Script** only holds a short loader that pulls these files in through jsDelivr. Each form also keeps its own voucher check block, which is not in this repo.

| Folder | Used by |
|---|---|
| `test/` | TESTING SITE (form 25591). Changes go here first. |
| `live/` | HQ, Jiran and KnockKnock, only after Alfred approves. |

Files:
- `ca-theme.js`: theme, mascots, box builder
- `ca-xmas.js`: Christmas banner, snow, sleigh, tree

After pushing a change, purge the jsDelivr cache for the changed file so stores pick it up within minutes:
`https://purge.jsdelivr.net/gh/chaleurpatisserie-ops/orderla-theme@main/test/ca-theme.js`

If jsDelivr or GitHub is ever down, the stores keep taking orders. They just show the plain Orderla look until the files load again.
