# 🌍 Tour-gen

> **Une façon simple d’explorer autrement, ou de trouver l’inspiration avant un voyage.**  
Tour-gen est une application web qui utilise OpenAI pour générer des idées de voyages personnalisées, discuter avec un assistant intelligent et créer vos propres tours.  

---

## ✨ Fonctionnalités

- 💬 **Chat IA** — Discutez avec un assistant intelligent pour obtenir des idées de voyage.
- 🗺️ **Création de tours assistée par IA** — Générez des itinéraires ou activités selon vos envies.
- 📌 **Sauvegarde de tours** — Conservez vos idées et consultez-les plus tard.
- 🔐 **Authentification sécurisée** — Connexion via e-mail, Google ou GitHub grâce à [Clerk](https://clerk.dev).

---

## 🛠️ Stack technique

- **[Next.js](https://nextjs.org/)** — Framework React pour le frontend et le backend.
- **[DaisyUI](https://daisyui.com/)** — Composants UI rapides et personnalisables.
- **[Clerk](https://clerk.dev/)** — Authentification sécurisée (Email, Google, GitHub).
- **[Prisma](https://www.prisma.io/)** — ORM pour la base de données.
- **[React Query](https://tanstack.com/query/latest)** — Gestion des requêtes et cache côté client.
- **[OpenAI](https://openai.com/)** — Génération de contenu et réponses IA avec GPT-4o.

---

## 🚀 Lancer le projet en local

### 1. Cloner le repo

```bash
git clone https://github.com/ton-utilisateur/tour-gen.git
cd tour-gen
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d’environnement

Créer un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
CLERK_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...
UNSPLASH_API_KEY=....
```

### 4. Lancer le serveur de développement

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## 🙌 Remerciements

Merci aux outils open-source qui rendent ce projet possible ❤️
