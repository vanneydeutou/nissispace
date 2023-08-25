docker run -d -p 80:80 -p 443:443 \
  -v $PWD/traefik.toml:/traefik.toml \
  -v $PWD/traefik_dynamic.toml:/traefik_dynamic.toml \
  -v $PWD/acme.json:/acme.json \
  --network=web \
  --name=traefik \
  traefik:v2.5
