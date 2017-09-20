// Star Wars Fight Simulator 2017
// By: Aaron Michael McNulty
// Monkey Stomp Games 2017
//
// All rights reserved
if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    var $titleScreen = $("#titleScreen");
    var $gameScreen = $("#gameScreen");
    var $characterSection = $("#characterSection");
    var $enemiesSection = $("#enemiesSection");
    var $fightButton = $("#fightButton");
    var $resetButton = $("#resetButton");
    var $defenderSection = $("#defenderSection");
    var $battleError = $("#battleError");
    var $playerAttackInfo = $("#playerAttackInfo");
    var $opponentAttackInfo = $("#opponentAttackInfo");
    var obiWan = new Character("obi-Wan Kenobi", "assets/images/obi-wan.jpg", 120, 8, 10, "choose character", 1);
    var lukeSkywalker = new Character("Luke Skywalker", "assets/images/luke-skywalker.jpg", 100, 12, 5, "choose character", 1);
    var darthSidious = new Character("Darth Sidious", "assets/images/darth-sidious.jpg", 150, 8, 20, "choose character", 1);
    var darthMaul = new Character("Darth Maul", "assets/images/darth-maul.jpg", 180, 4, 25, "choose character", 1);
    var characters = [obiWan, lukeSkywalker, darthSidious, darthMaul];
    
    var game = {
        readyToBattle: false,
        currentOpponent: null,
        playerCharacter: null,
        
        setOpponent: function(character) {
            this.currentOpponent = character;
            readyToBattle = true;
        },

        setPlayerCharacter: function(character) {
            this.playerCharacter = character;
        },

        fightRound: function() {
            this.currentOpponent.hp -= this.playerCharacter.atkPower * this.playerCharacter.powerUp;
            this.currentOpponent.$hp.text(this.currentOpponent.hp);
            this.playerCharacter.increasePower();
            if (this.currentOpponent.hp > 0) {
                this.playerCharacter.hp -= this.currentOpponent.counterAtkPower;
                this.playerCharacter.$hp.text(this.playerCharacter.hp);
                this.displayBattleStats("you have attacked " + this.currentOpponent.name + " for " + this.playerCharacter.atkPower * (this.playerCharacter.powerUp - 1) + " damage.", this.currentOpponent.name + " attacked you back for " + this.currentOpponent.counterAtkPower + " damage.")
                if (this.playerCharacter.hp <= 0) {
                    this.displayBattleStats("game over", "");
                    this.playerCharacter.status = "defeated";
                }
            }
            else {
                this.displayBattleStats("you have defeated your opponent", "");
                this.currentOpponent.status = "defeated";
                this.readyToBattle = false;
                this.clearBattleArea();
            }
        },

        displayBattleStats: function(line1, line2) {
            $battleError.text("");
            $playerAttackInfo.text(line1);
            $opponentAttackInfo.text(line2);
        },

        displayErrorMessage: function(error) {
            $battleError.text(error);
            $playerAttackInfo.text("");
            $opponentAttackInfo.text("");
        },

        clearBattleArea: function() {
            $defenderSection.empty();
        },
        
        resetGame: function() {
            this.currentOpponent = null;
            this.playerCharacter = null;
            this.readyToBattle = false;
            this.displayErrorMessage("");
        }
    }

    
    function Character(name, image, hp, atkPower, counterAtkPower, status, powerUp) {
        this.name = name;
        this.image = image;
        this.hp = hp;
        this.atkPower = atkPower;
        this.counterAtkPower = counterAtkPower;
        this.status = status;
        this.powerUp = powerUp;
        this.$div = $("<div></div>");
        this.$hp = $("<p></p>");
        this.$name = $("<p></p>");
        this.$img = $("<img></img>");
        this.opponent = function() {
            if (noOpponent()) {
                this.$div.attr("class", "character red");
                this.status = "current opponent";
                $defenderSection.append(this.$div);
                game.setOpponent(this);
                game.displayErrorMessage("");
                game.readyToBattle = true;
            }
        }
        function noOpponent() {
            var noOpponent = true;
            for (var i = 0; i < characters.length; i++) {
                if (characters[i].status === "current opponent") noOpponent = false;
            }
            return noOpponent;
        }
    }
    
    Character.prototype.gameCharacter = function() {
        this.$div.attr("class", "character green");
        this.status = "game character";
        game.setPlayerCharacter(this);
    }
    
    
    Character.prototype.red = function() {
        this.$div.attr("class", "character red selectable");
        $enemiesSection.append(this.$div);
        this.status = "choose opponent";
    }
    
    Character.prototype.createElement = function() {
        this.$div.attr("class", "character green selectable");
        this.$name.text(this.name);
        this.$name.attr("class", "charName");
        this.$img.attr("src", this.image);
        this.$img.attr("class", "charPic");
        this.$hp.text(this.hp);
        this.$hp.attr("class", "charHP");
        this.$div.append(this.$name, this.$img, this.$hp);
        $characterSection.append(this.$div);
        this.$div.on("click", function(e) {
            console.log(getCharacter(this).status);
            if (getCharacter(this).status === "choose character") {
                for (var i = 0; i < characters.length; i++) {
                    if (e.currentTarget.children[0].innerHTML === characters[i].name) {
                        characters[i].gameCharacter();
                    }
                    else characters[i].red();
                }
            }
            else if (getCharacter(this).status === "choose opponent") {
                for (var i = 0; i < characters.length; i++) {
                    if(e.currentTarget.children[0].innerHTML === characters[i].name) {
                        characters[i].opponent();
                    }
                }
            }
        })
    }
    
    Character.prototype.increasePower = function() {
        this.powerUp++;
    }
    
    function getCharacter(div) {
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].name === div.children[0].innerHTML) return characters[i];
        }
    }
    
    (function() {
        characters[0].createElement();
        characters[1].createElement();
        characters[2].createElement();
        characters[3].createElement();
    })();
    
    $fightButton.on("click", function() {
        if (game.readyToBattle && game.playerCharacter.status != "defeated") {
            game.fightRound();
        }
        else if (game.readyToBattle && game.playerCharacter.status === "defeated") {
            game.displayBattleStats("your player has been defeated", "");
        }
        else {
            game.displayErrorMessage("no enemy selected!");
        }
    })
    
    $resetButton.on("click", function() {
        game.resetGame();
        characters[0].hp = 120;
        characters[1].hp = 100;
        characters[2].hp = 150;
        characters[3].hp = 180;
        for (var i = 0; i < characters.length; i++) {
            characters[i].status = "choose character";
            characters[i].powerUp = 1;
            characters[i].createElement();
        }
    })
    
    $("#crawl").on("animationend", function() {
        $titleScreen.css({display: "none"});
        $gameScreen.css({display: "block"});
    })
    $gameScreen.css({display: "none"});
}