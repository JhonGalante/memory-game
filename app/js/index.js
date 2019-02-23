var cards = document.querySelectorAll("[id^='card-']");
var board = document.getElementById('board');
var cont = 1;
var cartaVirada1;
var score = 0;
document.getElementById('score').innerHTML = score;


Array.from(cards).forEach(function(card){
    card.addEventListener('click', function (e) {
        if(!e.path["2"].classList.contains('--active')){
            flipCardEffect(card);
            verificarCarta(e);
        }
    })
});
    

embaralharCartas();

function verificarCarta(e) {
    if (e.path["2"].classList["0"] == 'card') {
        if (cont < 2) {
            cartaVirada1 = e;
            cont++;
        } else if (cont == 2) {
            if (cartaVirada1.path["2"].id !== e.path["2"].id) {
                if (cartaVirada1.path["2"].dataset.dog == e.path["2"].dataset.dog) {
                    score++;
                    document.getElementById('score').innerHTML = score;
                    cartaVirada1.path["2"].classList.add('--active');
                    e.path["2"].classList.add('--active');

                    if (score === 7) {
                        document.getElementById('sound-clap').play();

                        setTimeout(function () {
                            alert('Você ganhou!');
                            score = 0;
                            embaralharCartas();
                            document.getElementById('score').innerHTML = score;
                            Array.from(cards).forEach(function(card){
                                flipCardEffect(card);
                                card.classList.remove('--active');
                            })
                        }, 1000);

                    }

                } else {
                    setTimeout(function () {
                        flipCardEffect(cartaVirada1.path["2"]);
                        flipCardEffect(e.path["2"]);
                    }, 600);
                }

                cont = 1;

            }
        }
    }
}


function embaralharCartas() {
    Array.from(cards).forEach(function(card){
        card.style.order = (Math.round((Math.random() * 14) + 1));
    });
}

function flipCardEffect(e){
    e.classList.toggle('flipped');
}