# Static pages

Served from the landing bucket at extensionless paths, outside the Vite build.

- `data-deletion.html` → `gs://kortexagent-landing/data-deletion` (Meta app "Data deletion instructions URL").

```
gcloud storage cp static-pages/data-deletion.html gs://kortexagent-landing/data-deletion --content-type="text/html; charset=utf-8" --cache-control="no-cache"
```
