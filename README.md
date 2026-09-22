# 🛡️ Open-SOC — Simulateur d'Entraînement aux Shifts SOC

**Open-SOC** est une application web open-source et interactive conçue pour entraîner les futurs et actuels analystes SOC (Security Operations Center) à travers des scénarios d'investigation réalistes.

---

## 🎯 Scénarios Inclus (7 Scénarios Pratiques)

| Scénario | Catégorie | Difficulté | Techniques MITRE |
|---|---|---|---|
| **Détection de Brute Force RDP** | Analyse d'Alertes SIEM | Facile | `T1078` |
| **Phishing — Fraude au CEO** | Analyse d'Emails de Phishing | Facile | `T1566.002` |
| **Détection de C2 Beaconing** | Analyse de Trafic Réseau | Moyen | `T1071.001` |
| **Réponse à Incident Ransomware** | Enquête sur Incidents | Difficile | `T1486`, `T1059` |
| **Analyse de Trojan Bancaire** | Analyse de Malware | Moyen | `T1055` |
| **Création de Règles SIGMA** | Règles SIGMA & Détection | Moyen | `T1059.001` |
| **Attribution APT & Threat Intel** | Threat Intelligence | Difficile | `T1190`, `T1071` |

---

## 🚀 Lancement Rapide

Dans le dossier `Open-SOC` :

```bash
# Lancer le serveur de développement (Vite)
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

---

## 🌟 Fonctionnalités

- 🌐 **Bilingue (i18n)** : Français et Anglais avec bascule instantanée.
- 🌙 **Mode Sombre & Thème Cyber** : Interface pensée pour les analystes SOC.
- 🔍 **Visualiseur d'Évidences Multi-Format** : Alertes SIEM, logs bruts JSON, en-têtes emails (SPF/DKIM/DMARC), flux réseau.
- ⏱️ **Chronomètre de Shift** : Mesure du temps passé par scénario.
- 📊 **Système de Scoring & Évaluation** : Note (A+, A, B, C, D, F), feedback détaillé et explications pour chaque question.
- 🗺️ **Mapping MITRE ATT&CK** : Corrélation des détections avec le framework MITRE.
- 💾 **Persistance Locale** : Sauvegarde automatique de la progression et des scores dans le navigateur (`localStorage`).
