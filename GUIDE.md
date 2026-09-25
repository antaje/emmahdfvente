# EmmaHdfVente : mise en ligne gratuite (≈ 30 minutes)

L'application est une **PWA** (application web installable). Un seul code fonctionne à la fois comme site web, sur Android et sur iPhone. Il n'y a pas de store à payer.

Deux services gratuits sont utilisés :

- **Firebase** (Google), en plan gratuit *Spark*, sans carte bancaire. Il gère les comptes (identifiant + mot de passe) et la base de données synchronisée entre téléphones.
- **GitHub Pages**, gratuit, pour héberger le site.

Seul **l'administrateur** (toi) a besoin d'un compte Google et d'un compte GitHub pour la mise en place. Les bénévoles, eux, se connectent uniquement avec l'identifiant et le mot de passe de l'association, sans aucune adresse e-mail.

---

## 1. Créer le projet Firebase

1. Va sur <https://console.firebase.google.com> et connecte-toi avec un compte Google.
2. Clique sur **Créer un projet**, nomme-le `emmahdfvente`, puis désactive Google Analytics (inutile).
3. Reste sur le plan **Spark (gratuit)**. N'ajoute pas de carte bancaire.

## 2. Activer la connexion par identifiant

1. Dans le menu de gauche, va dans **Créer (Build) → Authentication → Commencer**.
2. Dans l'onglet **Mode de connexion**, active **Adresse e-mail/Mot de passe** (le premier interrupteur seulement), puis enregistre.

> Pourquoi « e-mail » ? En interne, l'application transforme l'identifiant `emmahdf` en `emmahdf@emmahdfvente.app`. Ce n'est pas une vraie adresse : aucun e-mail n'est jamais demandé ni envoyé.

## 3. Créer la base de données

1. Va dans **Créer → Firestore Database → Créer une base de données**.
2. Choisis l'emplacement **eur3 (Europe)** ou **europe-west1 (Belgique)**. Ce choix est définitif.
3. Démarre en **mode production**.

## 4. Protéger les données (règles)

1. Dans Firestore, ouvre l'onglet **Règles**.
2. Remplace tout le contenu par celui du fichier `firestore.rules` fourni, puis clique sur **Publier**.

Avec ces règles, chaque compte ne voit que ses propres données. Même si quelqu'un trouve l'adresse du site et crée son propre compte, il ne pourra pas voir les ventes de l'association.

## 5. Relier l'application à Firebase

1. Clique sur la **roue dentée → Paramètres du projet**.
2. En bas, dans **Vos applications**, clique sur l'icône **`</>`** (Web). Nomme l'application `EmmaHdfVente`, et ne coche pas « Firebase Hosting ».
3. Firebase affiche un bloc `const firebaseConfig = { apiKey: "...", ... }`.
4. Ouvre le fichier `firebase-config.js` et remplace les valeurs par les tiennes : `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId` et `appId`.

Ces valeurs ne sont pas secrètes : elles peuvent être visibles publiquement. La sécurité vient des règles de l'étape 4.

## 6. Mettre le site en ligne (GitHub Pages)

1. Crée un compte sur <https://github.com>.
2. Clique sur **New repository**, nomme-le `emmahdfvente`, choisis **Public**, puis crée-le.
3. Clique sur **uploading an existing file** et glisse **tout le contenu** du dossier : `index.html`, `manifest.webmanifest`, `sw.js`, `firebase-config.js`, `firestore.rules`, `GUIDE.md` et le dossier `icons`. Valide avec **Commit changes**.
4. Va dans **Settings → Pages**. Dans « Source », choisis **Deploy from a branch**, puis la branche **main** et le dossier **/ (root)**. Enregistre.
5. Au bout d'une ou deux minutes, le site est en ligne à l'adresse `https://TON-PSEUDO.github.io/emmahdfvente/`.

## 7. Autoriser l'adresse du site dans Firebase

Dans Firebase, va dans **Authentication → Paramètres → Domaines autorisés → Ajouter un domaine**, puis ajoute `TON-PSEUDO.github.io`.

## 8. Créer le compte de l'association

1. Ouvre le site et choisis l'onglet **Créer un compte**.
2. Saisis un identifiant, par exemple `emmahdf`, et un mot de passe solide. Note-les.
3. Ajoute tes produits une seule fois : ils sont enregistrés dans le compte.
4. Donne l'identifiant et le mot de passe aux bénévoles. Chacun se connecte sur son téléphone, retrouve **automatiquement** les produits, les commandes et le journal, et peut indiquer son prénom pour apparaître dans le journal.

## 9. Installer l'application sur les téléphones

- **Android (Chrome)** : ouvre le site, puis menu **⋮ → Installer l'application** (ou « Ajouter à l'écran d'accueil »). Un bandeau « Installer » apparaît aussi dans l'appli.
- **iPhone (Safari)** : ouvre le site, appuie sur **Partager** (carré avec une flèche vers le haut), puis **Sur l'écran d'accueil**.
- **Ordinateur (Chrome ou Edge)** : clique sur l'icône d'installation dans la barre d'adresse. Le site reste aussi utilisable directement dans le navigateur.

---

## Bon à savoir

**Sans réseau.** Une fois connecté, un téléphone continue d'enregistrer les ventes même hors ligne. Tout est envoyé automatiquement au retour du réseau. La **première** connexion sur un téléphone demande internet.

**Limites du plan gratuit.** Firestore permet 50 000 lectures et 20 000 écritures par jour. C'est largement suffisant pour une vente associative. Si un quota est atteint, l'application se remet à fonctionner le lendemain, et **aucune facture n'est possible** sur le plan Spark.

**Mot de passe oublié.** Il n'y a pas d'e-mail de récupération. Procède ainsi :

1. Dans Firebase, va dans **Authentication → Utilisateurs**.
2. Supprime l'utilisateur `emmahdf@emmahdfvente.app`.
3. Recrée le compte dans l'appli avec **le même identifiant** et un nouveau mot de passe.

Les données sont conservées, car elles sont rangées par identifiant. Tu peux aussi changer le mot de passe depuis l'appli (bouton **Compte**).

**Mettre à jour l'appli.** Si tu modifies un fichier, change aussi `emmahdf-v1` en `emmahdf-v2` dans `sw.js`, puis réimporte les fichiers sur GitHub. Les téléphones récupèrent la nouvelle version à la prochaine ouverture avec du réseau.

**Sauvegarde.** Après chaque événement, fais **Exporter les commandes** et **Exporter le journal**. Les fichiers CSV s'ouvrent dans Excel. Garde-les avec les comptes de l'association.

**Logo.** Le logo fourni fait 200 × 200 pixels. Pour des icônes plus nettes, remplace les images du dossier `icons` par des versions en meilleure qualité, avec les mêmes noms et les mêmes tailles.

**Plus tard, sur les stores (facultatif et payant).** Une PWA peut être emballée pour le Google Play Store avec <https://www.pwabuilder.com>. Il faut alors compter 25 $ une fois pour le compte développeur Google, et 99 $ par an pour l'App Store d'Apple. Ce n'est pas nécessaire : l'installation depuis le navigateur suffit.
