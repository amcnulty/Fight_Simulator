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
        var $div = $("<div></div>");
        var $hp = $("<p></p>");

        (function createElement() {
            $div.attr("class", "character green selectable");
            var $name = $("<p></p>");
            $name.text(name);
            $name.attr("class", "charName");
            var $img = $("<img></img>");
            $img.attr("src", image);
            $img.attr("class", "charPic");
            $hp.text(hp);
            $hp.attr("class", "charHP");
            $div.append($name, $img, $hp);
            $characterSection.append($div);
        })();
        $div.on("click", function(e) {
            if (status === "choose character") {
                for (var i = 0; i < characters.length; i++) {
                    if (e.currentTarget.children[0].innerHTML === characters[i].name) {
                        setCharacter(i);
                    }
                }
            }
            else if (status === "choose opponent") {
                for (var i = 0; i < characters.length; i++) {
                    if(e.currentTarget.children[0].innerHTML === characters[i].name) {
                        opponent();
                    }
                }
            }
        })
        this.red = function() {
            $div.attr("class", "character red selectable");
            $enemiesSection.append($div);
            status = "choose opponent";
        }
        this.gameCharacter = function() {
            $div.attr("class", "character green");
            status = "game character";
        }
        function opponent() {
            if (noOpponent()) {
                $div.attr("class", "character red");
                status = "current opponent";
                $defenderSection.append($div);
            }
        }
    }

    Character.prototype.setCharacter = function() {
        this.gameCharacter();
    }

    Character.prototype.setEnemy = function() {
        this.red();
    }

    Character.prototype.setNewOpponent = function() {
        this.set;
    }

    function setCharacter(index) {
        for (var i = 0; i < characters.length; i++) {
            if (i === index) {
                characters[i].setCharacter();
            }
            else characters[i].setEnemy();
        }
    }

    function setOpponent(index) {
        for (var i = 0; i < characters.length; i++) {
            if (i === index) {
                characters[i].setCharacter();
            }
        }
    }

    function noOpponent() {
        if (document.getElementById("defenderSection").children.length === 0) return true;
        return false;
    }

    $("#crawl").on("animationend", function() {
        $titleScreen.css({display: "none"});
        $gameScreen.css({display: "block"});
    })

}