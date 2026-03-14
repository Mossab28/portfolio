# Portfolio Landing (Next.js)

Landing page portfolio immersive construite avec Next.js (App Router), Tailwind, Framer Motion et GSAP.

## Prerequis

- Node.js `>= 20.11.1`
- npm
- Docker + Docker Compose (prod)

## Lancer en local

```bash
npm install
npm run dev
```

## Verification avant deploy

```bash
npm run lint
npm run build
```

## Deploiement IONOS multi-app (user `lakhdar`, sans root)

### 1) DNS (IONOS)

Creer ou verifier:

- `A` `@` -> `IP_PUBLIQUE_SERVEUR`
- `A` `www` -> `IP_PUBLIQUE_SERVEUR`

Si le domaine utilise encore Cloudflare (nameservers Cloudflare), remettre les nameservers IONOS avant.

### 2) Prerequis serveur (une seule fois)

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin ufw
sudo systemctl enable --now docker
sudo usermod -aG docker lakhdar
```

Puis se reconnecter en SSH avec `lakhdar`.

### 3) Ports firewall (une seule fois)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

### Option A (recommandee): Nginx deja actif sur le serveur

Deployer l'app sur `127.0.0.1:3001`:

```bash
mkdir -p /home/lakhdar/apps
cd /home/lakhdar/apps
git clone https://github.com/aminssutt/portF.git portF
cd portF
docker compose -f docker-compose.nginx.yml -p portf up -d --build
docker compose -f docker-compose.nginx.yml -p portf ps
```

Ensuite, dans Nginx, faire le `proxy_pass` de `lakhdarberache.fr` vers `http://127.0.0.1:3001`.

### Option B: Proxy global Traefik (si tu veux migrer plus tard)

Lancer Traefik une seule fois (ports `80/443`) avec:

- `infra/reverse-proxy/docker-compose.yml`
- `infra/reverse-proxy/.env.example` -> `.env`

Puis deployer ce repo avec `docker compose -p portf up -d --build`.
