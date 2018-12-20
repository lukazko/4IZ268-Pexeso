var gameField = document.querySelector("#game-field");
var pointsContainer = document.querySelector("#points");

var cities = [
  "London",
  "Berlin",
  "Prague",
  "Vienna",
  "Florence",
  "Rome",
  "Manchester",
  "Paris",
  "Barcelona",
  "Oslo"
];
cities = cities.concat(cities);
cities.sort(function() {
  return 0.5 - Math.random();
});

var points = 0;
var firstCard = "";
var secondCard = "";
var nCards = cities.length;
var nRevealedCards = 0;

var chooseCard = function(card) {
  card.addEventListener("click", function() {
    if ((secondCard && firstCard) || card.classList.contains("revealed")) {
      return false;
    }

    card.classList.add("revealed");

    if (firstCard === "") {
      firstCard = card;
      return false;
    }

    secondCard = card;
    getPoints();
    isEnd();
  });
};

var getPoints = function() {
  if (firstCard.innerText === secondCard.innerText) {
    points++;
    nRevealedCards += 2;
    firstCard = "";
    secondCard = "";
  } else {
    if (points > 0) {
      points--;
    }
    setTimeout(function() {
      firstCard.classList.remove("revealed");
      secondCard.classList.remove("revealed");
      firstCard = "";
      secondCard = "";
    }, 1000);
  }

  pointsContainer.innerText = points;
};

var isEnd = function() {
  if (nRevealedCards === nCards) {
    if (points <= 5) {
      alert("Nic moc, získal jsi: " + points + "/" + nCards / 2 + " bodů");
    } else
      alert("Dobrá práce, získal jsi: " + points + "/" + nCards / 2 + " bodů");
  }
};

var createCard = function(city) {
  var card = document.createElement("div");
  card.classList.add("card");
  card.innerText = city;
  gameField.appendChild(card);
  chooseCard(card);
};

cities.forEach(function(city) {
  createCard(city);
});
