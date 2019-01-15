**This README shows my original idea which has morphed considerably as I got sucked into the problem of creating a general-purpose solution to rendering gifs directly to a canvas - which naturally proved to be far more complicated than I imagined. As such my "game" is more of a framework for creating games. Here is the [Live Site](https://pokeroyale.herokuapp.com/)**

![](public/assets/images/PokeRoyaleShowcase.gif)

# Background and Overview
Total War: Pokemon (or Company of Pokemon... still working on the name... I'll probably call it PokeDots) is a real-time strategy game where circles represent pokemon and their types are represented by the circle colour (primary type) and the circle border colour (secondary type). Players are given a countdown timer with the objective of eliminating all opponent pokemon on the map before the timer runs out. As in the traditional game pokemon type combinations determine whether an attacker recieves a buff or debuff when squaring off against an enemy.

# Functionality and MVP
The player will be able to:
- [ ] Individually or by group-selection select and order pokemon to move
- [ ] Select individual pokemon to view information on its special ability
- [ ] View currently available pokemon types on the right sidebar that can be dragged and placed nearby any of the player's pokemon 
- [ ] Upgrade pokemon that have leveled up, selecting their special ability if any are available
- [ ] Pause the timer, which prevents any attacks, to survey the battlefield
- [ ] Hear pokemon attacks and see attack animations
- [ ] Hear pokemon music when not engaged in combat and pokemon battle music when engaged in combat
- [ ] Level up individual pokemon once they have enough experience selecting whether the pokemon recieves a secondary type or a new more powerful special ability
- [ ] Retain leveled up pokemon and their attributes from one level to the next
- [ ] View the attack radius of enemy pokemon where the enemy will attack if any of the user's pokemon enter's the zone of control
- [ ] View a pokemon's active modifiers (via special ability buffs/debuffs). 
- [ ] View helpful text upon hovering over any text element
- [ ] See healthbar above a pokemon (omitted from wireframe)

In addition, this project will include:
- [ ] A refresh system where pokemon types available for placement will be randomized and refresh in increments as well as a probability system where more powerful types are less frequent
- [ ] A limitation that prevents the player from having more than 6 pokemon on the field at any given time
- [ ] A level up system where pokemon gain experience based on kills that occurred nearby the pokemon. A smaller team means more experience per pokemon but also means teams cannot be split up to eliminate pokemon on different
- [ ] A timer that determines when time is up and the player loses.
- [ ] An evasion/accuracy system where each pokemon has an evasion and accuracy rate that can affect whether attacks hit or miss (some special abilities increase/decrease evasion/accuracy)

# Wireframe

This app will consist of a single screen with the battlefield canvas, pause controls, instruction modal, sidebar of pokemon the player can drag-add to the battlefield, a bottom modal for a single selected pokemon (and an indicator around a selected pokemon indicating they have been selected), a radius around enemy pokemon indicating their zone of control and finally the level countdown timer.


![alt text](https://lh3.googleusercontent.com/bAztS9KMUCFi8-4-4knLIFGB7m-fv0MPSKW70IyzAqg7ErgFoVXNlQB3KV89vojP_wEa-Ik3IX22tFsJaePsWXQGICd7F5JYk9-apiMQTpKD8-sqfEcbuTfzoHvN7MvAY1EQn9vjX7eDMeOMytEMzFPdWqpaDDrVEKumacEaxXQtXrPCPrVATDw-I5JrXkV7y5m-u161ZvBSUZNSiEQJsPZJcoFBJvm6Cwq_f8GeWY8Pi1zLgw5uYHnGvITAT4n3mBghOT1uN8mX537JanJGVp-OkRH_2OKosQj4yZ942ydnpyiUZJUTMuKuF3Siob8yzk3iIg5QG3qC5Zk1gOqjVPv0RuoBkrCJKLZ2k6Ydwd7uwmj6-6Pdrss0xwcbTBbXZlkPGAreNHypkoA_dWskvC8MahkwG4pi3Pl67YfJFHFq4hp-Mlb2Smb2aikAK6dFLVlKQQ7SdrSYoYBTTPj0G8im-d6orD-km3m6XPxH2wsovEbUifL9s9tfOQLdsS5Weo0GUF-W6ywL-9JTeShXC9dyoKtX5LMPC9tI2k07bMffbD6Vy7Zk22OLbYVJQ44I_4MbdiuRRZo5Emf0RZd4JQtMu5JLA7Gg7DTEUefwnoXPHFOqPuh7mDYyaT4nAqOsUr3CUFEi_tUT8VepT_KyD2z4mjYCQKQj9UdAGvRAYiSCDX72wnw2eP8RbsLl_VuI60ZtAMZdO4aXG4VNxG4=w1009-h612-no)


# Architecture and Technologies
- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts,
- PokeAPI to collect pokemon stat data (Since PokeAPI is down for maintenance and has been for a month this is a bonus item, stay tuned)

`board.js`: this script will handle the logic for creating and updating the necessary DOM elements.

`physics.js`: this script will house the physics logic for the pokemon. Pokemon speed can be altered by buffs/debuffs

`audio.js`: this script will handle the audio logic and the creation of AudioEvents. 

`pokemon.js`: Houses the constructor and update functions for the Pokemon objects.

`timer.js`: Houses the countdown timer for a particular level

`special_abilities.js`: Houses special ability logic that pokemon of particular type-combinations can acquire upon leveling up

# Implementation Timeline

## Day 1: 
- [x] Port over the relevant pieces of my Asteroids project
- [x] Finalize Game Proposal

## Day 2:
- [x] Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file, ticker and the bare bones of all 4 scripts outlined above.
- [x] Make a pokemon click-commandable 
- [ ] Add an enemy pokemon to the board randomly that moves up against the player's pokemon enters its zone of control and does not chase the user's pokemon if the player leaves the enemy's zone of control
- [x] Get webpack serving files and frame out index.html


## Day 3: 
- [x] Make a group of pokemon drag-commandable
- [ ] Populate Board randomly (and reasonably) with enemy pokemon
- [ ] Add pokemon information bar when selecting a single pokemon
- [ ] Add healthbar above pokemon that only appears during combat

## Day 4:
- [ ] Complete combat logic. i.e. complete pokemon.js and special_abilities.js modules (constructor, update functions, attack, type, attribute buffs/debuffs, leveling up)
- [ ] Make healthbar track pokemon HP
- [ ] Add combat animations

## Day 5:
- [ ] Create game pause function and instructions
- [ ] Add pokemon music
- [ ] Have a styled Canvas, nice looking controls and title
Over the weekend:

- [ ] Test the project for bugs
- [ ] Deploy the project on GitHub Pages

# Bonus features
- [ ] Animated Pokemon sprites for each pokemon!
- [ ] Canonical pokemon stats used to calculate pokemon attributes retrieved from PokeAPI
- [ ] Random dropped items that pokemon can pick up for additional buffs (i.e. known as "pokemon held items" in the traditional game)
- [ ] Ability for pokemon to switch out an item they are holding (which is dropped) for another
- [ ] Multiple levels
- [ ] Boss fight at the clearing of a level with a far more powerful pokemon
- [ ] Obstacles and different backgrounds for different levels
- [ ] Background variation that have battle significance (e.g. water slows movement, lava hurts non-fire types etc)
- [ ] Different themes for different clusters of enemy pokemon (e.g. water types statistically far more likely to spawn near water)
- [ ] Different AI patterns for different enemy pokemon
- [ ] Multiplayer versus (i.e. huge game logic refactor)
