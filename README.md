# 🎮 Arcade Games - MERN Stack

Cette application est une plateforme de jeux arcade qui inclut :
- **2048** - Le jeu de puzzle classique
- **Snake** - Le serpent gourmand
- **Pong** - Le jeu de tennis rétro
- **Flappy Bird** - L'oiseau volant

Tous les scores sont enregistrés dans une base de données MongoDB via une API Express.js.

---

## 📦 Installation

### 1. Télécharger les sources
```bash
git clone https://github.com/ttwthomas/2048-mern.git
cd 2048-mern
```

### 2. Installer les dépendances
```bash
cd server
npm install
```

### 3. Configuration de la base de données
Créez un fichier `.env` dans le dossier `server/` :
```bash
MONGO_URI=mongodb://login:password@mongohostname:27017/databasename
PORT=5000
```

Exemple pour MongoDB local :
```bash
MONGO_URI=mongodb://localhost:27017/arcade-games
PORT=5000
```

Exemple pour MongoDB Atlas :
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/arcade-games
PORT=5000
```

### 4. Lancer l'application
```bash
cd server
npm start
```

L'application est accessible sur [http://localhost:5000](http://localhost:5000)

---

## 🎯 Routes disponibles

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil avec liste des jeux |
| `/2048` | Jeu 2048 |
| `/snake` | Jeu Snake |
| `/pong` | Jeu Pong |
| `/flappybird` | Jeu Flappy Bird |
| `/leaderboard?game=<nom>` | Classement pour un jeu spécifique |
| `/api/scores` | API REST pour les scores |

---

## 🗄️ API Scores

### Récupérer les scores
```bash
# Tous les scores
GET /api/scores

# Scores d'un jeu spécifique (top 10)
GET /api/scores?game=2048
GET /api/scores?game=snake
GET /api/scores?game=pong
GET /api/scores?game=flappybird
```

### Ajouter un score
```bash
POST /api/scores
Content-Type: application/json

{
  "name": "PlayerName",
  "score": 1234,
  "game": "2048"
}
```

---

## 💾 Commandes MongoDB

### Se connecter à MongoDB
```bash
# MongoDB local
mongosh

# MongoDB distant
mongosh "mongodb://login:password@hostname:27017/databasename"
```

### Utiliser la base de données
```bash
use arcade-games
```

### Voir tous les scores
```bash
db.scores.find().pretty()
```

### Voir les scores d'un jeu spécifique
```bash
# Scores de 2048
db.scores.find({ game: "2048" }).sort({ score: -1 }).limit(10)

# Scores de Snake
db.scores.find({ game: "snake" }).sort({ score: -1 }).limit(10)

# Scores de Pong
db.scores.find({ game: "pong" }).sort({ score: -1 }).limit(10)

# Scores de Flappy Bird
db.scores.find({ game: "flappybird" }).sort({ score: -1 }).limit(10)
```

### Ajouter un score manuellement
```bash
db.scores.insertOne({
  name: "TestPlayer",
  score: 5000,
  game: "2048",
  date: new Date()
})
```

### Supprimer un score spécifique
```bash
# Par ID
db.scores.deleteOne({ _id: ObjectId("votre_id_ici") })

# Par nom et jeu
db.scores.deleteOne({ name: "PlayerName", game: "2048" })

# Supprimer tous les scores d'un joueur
db.scores.deleteMany({ name: "PlayerName" })
```

### Supprimer tous les scores d'un jeu
```bash
db.scores.deleteMany({ game: "2048" })
db.scores.deleteMany({ game: "snake" })
```

### Supprimer TOUS les scores (⚠️ Attention)
```bash
db.scores.deleteMany({})
```

### Mettre à jour un score
```bash
db.scores.updateOne(
  { _id: ObjectId("votre_id_ici") },
  { $set: { score: 9999 } }
)
```

### Compter les scores par jeu
```bash
db.scores.aggregate([
  { $group: { _id: "$game", count: { $sum: 1 } } }
])
```

---

## 🔄 Migration des anciens scores

Si vous avez des anciens scores de 2048 sans champ `game`, lancez le script de migration :

```bash
cd server
node migrate-scores.js
```

Cela ajoutera automatiquement `game: "2048"` à tous les anciens scores.

---

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Monitoring** : Prometheus (express-prom-bundle)

---

## 👨‍💻 Auteur

Modifié par cocadmin 😎

Jeu 2048 original créé par [Gabriele Cirulli](http://gabrielecirulli.com)
