# Manuel d'utilisation

Présentation
============

Ce manuel d'utilisation décrit le fonctionnement de **Apocalyptic Bowling** 🎳, développée par [H&W of the Apocalypse](https://github.com/Horsemen-and-Women-of-the-Apocalypse/bowling).



L'application fonctionne comme sur un écran d'une salle de bowling. Les règles traditionnelles du bowling sont appliquées. Indiquez les **scores** des joueurs à chaque tour et consultez le **tableau des scores** en temps réel !



L'application est accessible sur le lien suivant : [http://tomansion.fr:9000/](http://tomansion.fr:9000/)

Sommaire
========

- [Manuel d'utilisation](#manuel-dutilisation)
- [Présentation](#présentation)
- [Sommaire](#sommaire)
- [1\. Rappel des règles du bowling 🎳](#1-rappel-des-règles-du-bowling-)
  - [Comment est calculé le score ?](#comment-est-calculé-le-score-)
    - [Strike](#strike)
    - [Spare](#spare)
  - [Dernier tour](#dernier-tour)
- [2\. Préparation d'une partie ⚙️](#2-préparation-dune-partie-️)
  - [Nombre de tours et nombre de quilles](#nombre-de-tours-et-nombre-de-quilles)
  - [Joueurs 👨‍👧](#joueurs-)
- [3\. Déroulement d'une partie 🎳](#3-déroulement-dune-partie-)
  - [Organisation](#organisation)
  - [Scénario général](#scénario-général)
  - [Rappel des règles du bowling](#rappel-des-règles-du-bowling)
  - [Rectifier un lancer](#rectifier-un-lancer)
  - [Tableau des scores](#tableau-des-scores)
    - [Organisation du tableau](#organisation-du-tableau)
- [4\. Fin de la partie 🏆](#4-fin-de-la-partie-)

1\. Rappel des règles du bowling 🎳
===================================

Une partie de bowling est organisée en **T** carreaux/tours (10 en général).

L'installation requiert **Q** quilles (10 en général), des boules (idéalement avec des poids adaptés en fonction du joueur) et une grande piste.



Au début de chaque tour d'un joueur, il faut disposer les quilles au fond de cette piste :



![](userManual/pins.png)



Durant un tour, chaque joueur doit faire tomber un maximum de quilles en lançant une boule à une distance fixée des quilles. Pour cela, il dispose de **2** lancers maximum. Le but est d'obtenir le meilleur score de la partie.

Comment est calculé le score ?
------------------------------

1 quille = 1 point en temps général.

Mais il y a des cas spéciaux qui offrent des bonus intéressants non négligeables. Donc soignez vos lancers !

### Strike

Quand toutes les quilles ont été renversées d'un coup au **1er lancer**, on appelle cela un **strike**. Vous avez vos Q points et le score des **2 prochains lancers** comptera double.

### Spare

Quand toutes les quilles ont été renversées à l'issue des 2 lancers, c'est un **spare**. Vous avez vos Q points et le score du **prochain lancer** comptera double.

Dernier tour
------------

Le dernier tour est un peu plus spécial. Il se déroule comme un tour normal mais il y a différents cas à considérer si la chance vous sourit :



*   Strike au 1er lancer : Vous avez droit à **2 lancers bonus**.
*   Spare au bout du 2e lancer : Vous avez droit à **un lancer bonus**.

2\. Préparation d'une partie ⚙️
===============================

![](userManual/game_preparation4.gif)

Avant que la partie commence, un assistant vous demande de remplir les paramètres de la partie :

Nombre de tours et nombre de quilles
------------------------------------

Pour régler ces deux paramètres, vous pouvez soit cliquer sur les boutons "**\-**" et "**+**" ou bien saisir la valeur avec le clavier en cliquant sur la barre de saisie.

Les valeurs par défaut correspondent à celles du bowling général.

Cliquez sur le bouton **Suivant** pour passer à l'étape suivante.

Joueurs 👨‍👧
-------------

1.  Commencez par ajouter un joueur en saisissant son **nom**. Le nombre de caractères du nom est limité à **30**.
2.  Appuyez sur **Entrée** ou bien sur le bouton "**+**" pour l'ajouter.
3.  Quand vous avez ajouté au moins 2 joueurs, vous pouvez définir l'**ordre dans lequel les joueurs vont jouer**: Appuyez sur le nom d'un joueur puis tout en maintenant l'appui, déplacez-le là où vous voulez



Si vous voulez rectifier votre configuration, pas de problème ! Cliquez sur l'étape concernée sur la barre de navigation en haut.

3\. Déroulement d'une partie 🎳
===============================

Organisation
------------

1.  Numéro du tour actuel / Nombre total de tours
2.  Nom du joueur qui doit jouer
3.  Numéro du lancer
4.  Saisie du nombre de quilles tombées au lancer
5.  Bouton Suivant pour passer au lancer suivant
6.  Afficher le tableau des scores
7.  Bouton Retour à l'assistant (une fenêtre de confirmation apparaît pour éviter les appuis accidentels)

Scénario général
----------------

1.  Une animation annonce le nom du joueur qui doit jouer.

Une fois le premier lancer effectué, renseignez le **nombre de quilles tombées**.

3.  Pour confirmer le nombre de quilles, appuyez sur le bouton **Suivant**.
4.  S'il s'agit d'un strike appuyez sur le bouton **Terminer,** le tour apparaît à la place du bouton Suivant. L'application passe au joueur suivant. Sinon, faites de même pour le **deuxième lancer**.

Rappel des règles du bowling
----------------------------

Une partie est organisée en T tours.

À chaque tour,

Rectifier un lancer
-------------------

Il est possible de rectifier le nombre de quilles tombées du 1er lancer tant que le tour du joueur n'est pas encore terminé (tant que vous n'avez pas appuyé sur le bouton **Terminer**). Pour ce faire, cliquez sur le bouton **Annuler**.

Tableau des scores
------------------

Vous pouvez consulter à tout moment le tableau des scores en appuyant sur le bouton **Tableau des scores** (en bas à gauche).

Glissez avec votre doigt sur la partie des scores pour faire défiler ceux qui sont cachés.

Pour un meilleur confort, il est conseillé de passer en **mode horizontal** (en tournant son portable 🔄).

Pour fermer le tableau et retourner au jeu, appuyez sur le bouton **X** (Fermer).

### Organisation du tableau

La colonne du tour actuel est mise en surbrillance.

La case représentant un tour d'un joueur est organisé comme suit :

*   Nombre de quilles tombées au 1er lancer / Nombre de quilles tombées au 2ème lancer
*   Cumul du score



**Cas spéciaux pour le nombre de quilles renversées**



| <br>**Symbole**<br> | <br>**Signification**<br> |
| ---| --- |
| <br>/<br> | <br>Le joueur a fait un **spare**. Le score du carreau/tour est calculé quand son prochain lancer a été comptabilisé.<br> |
| <br>X<br> | <br>Le joueur a fait un **strike**. Le score du carreau/tour est calculé quand ses 2 prochains lancers ont été comptabilisés.<br> |

4\. Fin de la partie 🏆
=======================

Lorsque le nombre de tours est atteint, la partie est terminée.

Un écran de fin s'affiche. Il est composé de :

*   Un podium pour féliciter les meilleurs joueurs
*   Un tableau des scores avec le classement des joueurs

Vous pouvez rejouer une partie en appuyant sur le bouton **Rejouer**.