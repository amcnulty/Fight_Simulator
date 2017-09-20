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
    var $defenderSection = $("#defenderSection");
    var obiWan = new Character("obi-Wan Kenobi", "assets/images/obi-wan.jpg", 200, "choose character");
    var lukeSkywalker = new Character("Luke Skywalker", "assets/images/luke-skywalker.jpg", 150, "choose character");
    var darthSidious = new Character("Darth Sidious", "assets/images/darth-sidious.jpg", 250, "choose character");
    var darthMaul = new Character("Darth Maul", "assets/images/darth-maul.jpg", 220, "choose character");
    var characters = [obiWan, lukeSkywalker, darthSidious, darthMaul];

    function Character(name, image, hp, status) {
        this.name = name;
        this.image = image;
        this.status = status;
        this.hp = hp;
        this.$div = $("<div></div>");
        this.$hp = $("<p></p>");
        this.$name = $("<p></p>");
        this.$img = $("<img></img>");
        this.opponent = function() {
            if (noOpponent()) {
                this.$div.attr("class", "character red");
                this.status = "current opponent";
                $defenderSection.append(this.$div);
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

    function getCharacter(div) {
        switch (div.children[0].innerHTML) {
            case "obi-Wan Kenobi":
                return characters[0];
            break;
            case "Luke Skywalker":
                return characters[1];
            break;
            case "Darth Sidious":
                return characters[2];
            break;
            case "Darth Maul":
                return characters[3];
            break;
        }
    }

    characters[0].createElement();
    characters[1].createElement();
    characters[2].createElement();
    characters[3].createElement();

    $("#crawl").on("animationend", function() {
        $titleScreen.css({display: "none"});
        $gameScreen.css({display: "block"});
    })
    $gameScreen.css({display: "none"});
}