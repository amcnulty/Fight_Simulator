// Star Wars Fight Simulator 2017
// By: Aaron Michael McNulty
// Monkey Stomp Games 2017
//
// All rights reserved
if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    /** The opening title screen. */
    var $titleScreen = $("#titleScreen");
    /** The div that shows all of the game content. */
    var $gameScreen = $("#gameScreen");
    /** The div that holds all of the characters when user is choosing character. */
    var $characterSection = $("#characterSection");
    /** The div that hold the enemy characters after user chooses character. */
    var $enemiesSection = $("#enemiesSection");
    /** The fight button. */
    var $fightButton = $("#fightButton");
    /** The reset button (resets game). */
    var $resetButton = $("#resetButton");
    /** The div that holds the current opponent the player is attacking. */
    var $defenderSection = $("#defenderSection");
    /** An h2 element for displaying error messages to the user. */
    var $battleError = $("#battleError");
    /** An h2 element for displaying player attack info. */
    var $playerAttackInfo = $("#playerAttackInfo");
    /** An h2 element for displaying opponent attack info. */
    var $opponentAttackInfo = $("#opponentAttackInfo");
    /** Instance of the Character object for Obi-Wan Kenobi character. */
    var obiWan = new Character("obi-Wan Kenobi", "assets/images/obi-wan.jpg", 120, 8, 10, "choose character", 1);
    /** Instance of the Character object for Luke Skywalker character. */
    var lukeSkywalker = new Character("Luke Skywalker", "assets/images/luke-skywalker.jpg", 100, 12, 5, "choose character", 1);
    /** Instance of the Character object for Darth Sidious character. */
    var darthSidious = new Character("Darth Sidious", "assets/images/darth-sidious.jpg", 150, 8, 20, "choose character", 1);
    /** Instance of the Character object for Darth Maul character. */
    var darthMaul = new Character("Darth Maul", "assets/images/darth-maul.jpg", 180, 4, 25, "choose character", 1);
    /** An array holding all of the Character instances. */
    var characters = [obiWan, lukeSkywalker, darthSidious, darthMaul];
    /**
     * The game object controls several aspects of the game mechanics.
     */
    var game = {
        /** Checked after fight button is pressed to determine appropriate action. */
        readyToBattle: false,
        /** This field gets set to the Character instance of the current opponent. */
        currentOpponent: null,
        /** This field gets set to the Character instance of the player's selected character. */
        playerCharacter: null,
        /**
         * Sets the currentOpponent field to the Character instance passed to this method. Also sets readyToBattle boolean to true.
         * @param {Character} character
         * The Character instance to set the currentOpponent field to.
         */
        setOpponent: function(character) {
            this.currentOpponent = character;
            readyToBattle = true;
        },
        /**
         * Sets the playerCharacter field to the Character instance passed to this method.
         * @param {Character} character
         * The Character instance to set the playerCharacter field to.
         */
        setPlayerCharacter: function(character) {
            this.playerCharacter = character;
        },
        /**
         * Starts next round of fighting. This method displays new hp values to the screen, checks for game over and enemy defeats, and displays messages for the player attack info and opponent attack info.
         */
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
        /**
         * Displays the player attack info and the opponent attack info messages. Also clears error message.
         * @param {String} line1
         * The message for player attack info.
         * @param {String} line2
         * The message for opponent attack info.
         */
        displayBattleStats: function(line1, line2) {
            $battleError.text("");
            $playerAttackInfo.text(line1);
            $opponentAttackInfo.text(line2);
        },
        /**
         * Displays an error message to the user. Also clears the player and opponent attack info messages.
         * @param {String} error
         * The error message to display to the user.
         */
        displayErrorMessage: function(error) {
            $battleError.text(error);
            $playerAttackInfo.text("");
            $opponentAttackInfo.text("");
        },
        /**
         * Removes the opponent from the defender area.
         */
        clearBattleArea: function() {
            $defenderSection.empty();
        },
        /**
         * Is called when the reset button is pressed. Sets game related variables to initial values and clears all attack and error messages.
         */
        resetGame: function() {
            this.currentOpponent = null;
            this.playerCharacter = null;
            this.readyToBattle = false;
            this.displayErrorMessage("");
        }
    }
    /**
     * The constructor for the Character object.
     * @param {String} name 
     * The name of the character.
     * @param {String} image 
     * Path to the image of the character.
     * @param {Number} hp 
     * The starting health points of the character.
     * @param {Number} atkPower 
     * The base attack power of the character.
     * @param {Number} counterAtkPower 
     * The counter attack power of the character.
     * @param {String} status 
     * The current status of the character.
     * @param {Number} powerUp 
     * The current multiplier of the character's attack.
     */
    function Character(name, image, hp, atkPower, counterAtkPower, status, powerUp) {
        /** The name of the character. */
        this.name = name;
        /** Path to the image of the character. */
        this.image = image;
        /** The starting health points of the character. */
        this.hp = hp;
        /** The base attack power of the character. */
        this.atkPower = atkPower;
        /** The counter attack power of the character. */
        this.counterAtkPower = counterAtkPower;
        /** The current status of the character. */
        this.status = status;
        /** The current multiplier of the character's attack. */
        this.powerUp = powerUp;
        /** The div element used to display the character info. */
        this.$div = $("<div></div>");
        /** The p element used to display the character's name. */
        this.$name = $("<p></p>");
        /** The p element used to display the character's health points. */
        this.$hp = $("<p></p>");
        /** The img element used to display the character's image. */
        this.$img = $("<img></img>");
        /**
         * When this method is called this character is set as an opponent if there is currently no other opponent.
         */
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
        /**
         * This function is called by the Character.opponent method to determine if there is a current opponent.
         * @return {Boolean} noOpponent
         * Returns true if there is no current opponent. Returns false if there is a current opponent.
         */
        function noOpponent() {
            var noOpponent = true;
            for (var i = 0; i < characters.length; i++) {
                if (characters[i].status === "current opponent") noOpponent = false;
            }
            return noOpponent;
        }
    }
    /**
     * This method sets the character as the players character for the rest of the game.
     */
    Character.prototype.gameCharacter = function() {
        this.$div.attr("class", "character green");
        this.status = "game character";
        game.setPlayerCharacter(this);
    }
    /**
     * This method sets character as non-player character. These characters are ready to be choosen to defend against the player character's attacks.
     */
    Character.prototype.red = function() {
        this.$div.attr("class", "character red selectable");
        $enemiesSection.append(this.$div);
        this.status = "choose opponent";
    }
    /**
     * This method fills in data to the character's html elements for display to the screen. This method also establishes a click event for the character's display element.
     */
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
    /**
     * Increases the powerUp multiplier by 1.
     */
    Character.prototype.increasePower = function() {
        this.powerUp++;
    }
    /**
     * Accepts a HTMLDivElement and returns the Character instance that is associated with the div.
     * @param {HTMLDivElement} div 
     * @return {Character}
     * Returns the Character instance that is associated with the div passed to this method.
     */
    function getCharacter(div) {
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].name === div.children[0].innerHTML) return characters[i];
        }
    }
    /**
     * Self-Invoking function to create the game character's elements to be displayed to the screen.
     */
    (function() {
        characters[0].createElement();
        characters[1].createElement();
        characters[2].createElement();
        characters[3].createElement();
    })();
    /** Event listener for click events on the fight button. */
    $fightButton.on("click", function() {
        if (game.readyToBattle && game.playerCharacter.status != "defeated") {
            game.fightRound();
        }
        else if (game.readyToBattle && game.playerCharacter.status === "defeated") {
            game.displayErrorMessage("your player has been defeated");
        }
        else {
            game.displayErrorMessage("no enemy selected!");
        }
    })
    /** Event listener for click events on the reset button. */
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
    /** Event listener for the animation end of the title screen text crawl. */
    $("#crawl").on("animationend", function() {
        $titleScreen.css({display: "none"});
        $gameScreen.css({display: "block"});
    })
    /** Event listener for the space button to continue to game. */
    $(window).on("keyup", function(e) {
        if (String.fromCharCode(e.keyCode).toLowerCase() === " ") {
            $titleScreen.css({display: "none"});
            $gameScreen.css({display: "block"});
        }
    })
    // Set the game display to not be shown at startup.
    $gameScreen.css({display: "none"});
}