1-Nom et description du projet:
Foodie — Modern Food Ordering Website
Foodie est un site web moderne, responsive et interactif permettant aux utilisateurs de découvrir des plats, filtrer par catégorie, voir les détails des produits et gérer un panier en temps réel.  
Ce projet simule une mini-plateforme de commande en ligne avec une interface professionnelle et des animations fluides.

2-Technologies utilisées:
- HTML — Structure du site  
- CSS— Mise en page moderne et responsive  
- JavaScript — Logique du panier, filtres, interactions  
- FontAwesome — Icônes (étoiles, contact, footer…)  
- Google Fonts  
- Images personnalisées (pasta.png, burger.png, etc.)

3-Fonctionnalités principales:
Page d’accueil
- Bannière responsive avec texte + image
- Section “Why Choose Us”
- Section “Popular Dishes”
  - Filtrage dynamique par catégorie (burger, pasta, sandwich…)
  - Système See More / Show Less
  - Cartes de plats générées en JavaScript

Panier dynamique (Cart Sidebar)
- Ajouter des produits avec quantité personnalisée
- Boutons + / − sur chaque item
- Compteur dynamique dans l’icône du panier
- Calcul automatique du total
- Ouverture / fermeture du panier :  
  - clique sur l’icône  
  - bouton fermer  
  - clic sur l’overlay  

Interface utilisateur
- Menu hamburger pour mobile  
- Footer complet (liens, contact, logo)  
- UI responsive pensée pour toutes tailles d’écran  

4-Lien vers la page GitHub Pages (rendu final):
  https://ghofranearouay.github.io/projet/

5-Nouveautés explorées :
- Manipuler le  DOM avancé  : création dynamique de cartes produits
- Gestion d’un  état global (cart)  sans framework
- Développement d’un  système de filtre + pagination (See More)  
- Gestion dynamique d’événements :  
  - plusieurs boutons dans chaque carte  
  - synchronisation quantité  et panier  
- Mise en place d’un  sidebar animé pour le panier  
- Construction d’un menu hamburger mobile fluide  
- Utilisation de classes CSS dynamiques (toggle, active, open, show)
- Compréhension du pattern “render() + updateUI()”

 5-Difficultés rencontrées:
- Gestion de la mise à jour du panier en temps réel
- Synchronisation des quantités entre :
  - la carte du produit
  - le panier latéral
- Maintenir l’état lors du “See More / Show Less”
- Positionnement CSS du menu hamburger sur mobile
- Animation du cart sidebar (overlays, transitions)
- Erreurs de clic lorsque l’utilisateur ajoutait plusieurs fois un plat

6-Solutions apportées:
- Mise en place d’un **tableau `cart[]`** comme source d’état unique
- Création de fonctions dédiées :
  - `addToCart()`
  - `updateQuantity()`
  - `removeFromCart()`
  - `renderCart()`
- Ajout d’un **render global** pour garantir une interface toujours correcte
- Mise en place de conditions pour éviter les quantités négatives
- Correction des clics avec `e.target` + vérification event  
- Refonte CSS du hamburger (z-index, flex, display none/block)
- Optimisation du système de catégories avec `data-category`
- Organisation des fonctions pour une meilleure lisibilité


