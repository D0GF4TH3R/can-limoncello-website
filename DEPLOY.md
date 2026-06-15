# Deployment — Can Limoncello → Hostpoint

Statische Seite. Deploy läuft automatisch über GitHub Actions: **Push auf `main` → FTPS-Upload in den
Hostpoint-Webroot**. Definiert in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

---

## 1. Die 3 GitHub-Secrets

In GitHub: **Repo → Settings → Secrets and variables → Actions → „New repository secret"**.
Genau diese drei Namen anlegen (sie werden vom Workflow erwartet):

| Secret-Name    | Inhalt                                  |
|----------------|------------------------------------------|
| `FTP_SERVER`   | FTP-Host von Hostpoint (z. B. `ftp.canlimoncello.com` oder der in Hostpoint angezeigte Server) |
| `FTP_USERNAME` | FTP-Benutzername                         |
| `FTP_PASSWORD` | FTP-Passwort                             |

> Niemals Zugangsdaten ins Repo committen — nur als Secrets hinterlegen.

## 2. Wo die Daten in Hostpoint stehen

Hostpoint **Control Panel** → Hosting **„irodoved"** → Bereich **FTP-/SFTP-Zugänge** (bzw.
„FTP-Accounts"). Dort findest du:

- **FTP-Host/Server** → `FTP_SERVER`
- **Benutzername** → `FTP_USERNAME`
- **Passwort** → `FTP_PASSWORD` (ggf. neu setzen, falls unbekannt)
- **Webroot/Verzeichnis**: Der Pfad, in dem die Website liegt. Hostpoint-Standard ist **`/www/`**.
  Im Workflow ist `server-dir: /www/` gesetzt — **bitte im Panel verifizieren** und in
  [.github/workflows/deploy.yml](.github/workflows/deploy.yml) anpassen, falls dein Webroot anders heißt
  (z. B. ein Unterordner). Der Wert muss auf `/` enden.

## 3. Deploy auslösen

- **Automatisch:** Commit auf `main` pushen → Action „Deploy to Hostpoint (FTP)" läuft und lädt hoch.
- **Manuell:** GitHub → Tab **Actions** → Workflow „Deploy to Hostpoint (FTP)" → **„Run workflow"** → `main`.
- Status/Logs: Tab **Actions** (grün = erfolgreich hochgeladen).

### Protokoll-Hinweis
Der Workflow nutzt `protocol: ftps` (FTP über TLS, Port 21). Falls dein Hostpoint-Zugang nur reines FTP
erlaubt, in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) `protocol: ftps` → `protocol: ftp`
ändern (weniger sicher; FTPS bevorzugen).

## 4. Manueller FTP-Upload (Fallback)

Falls die Action mal nicht läuft, mit einem FTP-Client (z. B. FileZilla/Cyberduck), **FTPS, Port 21**,
mit denselben Zugangsdaten verbinden und in den Webroot (`/www/`) hochladen:

**Hochladen:**
- `index.html`, `impressum.html`, `datenschutz.html`
- gesamter Ordner `assets/` (css, js, img, video)

**NICHT hochladen:**
- `.git/`, `.github/`, `README.md`, `CLAUDE.md`, `DEPLOY.md`, `.gitignore`, `.DS_Store`

---

## Repo anlegen & pushen (einmalig)

Die GitHub CLI (`gh`) ist auf diesem Rechner **nicht eingeloggt**. Zwei Wege:

**A — mit gh (empfohlen):**
```bash
gh auth login
gh repo create can-limoncello-website --private --source=. --remote=origin --push
```

**B — über github.com:**
1. Auf github.com ein **privates, leeres** Repo anlegen (ohne README/.gitignore).
2. Im Projektordner:
   ```bash
   git remote add origin git@github.com:<DEIN-USER>/can-limoncello-website.git
   git push -u origin main
   ```
