function getCurrency() {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            byn = data.Valute.BYN.Value;
            document.getElementById('byn').textContent = 'Курс BYN: ' + byn.toFixed(2) + ' руб.';
            showDiag();
        })
}

window.onload = function() {
    getCurrency();

    document.getElementById('rub').oninput = function() {
        if(byn) {
            document.getElementById('BYN').value = (this.value / byn).toFixed(2);
        }
    };
    
    document.getElementById('BYN').oninput = function() {
        if(byn) {
            document.getElementById('rub').value = (this.value * byn).toFixed(2);
        }
    };
};

function showDiag() {
    let diag = document.getElementById('diag');
    diag.innerHTML = '';
    let obshdays = 30;
    for (let i = 0; i < obshdays; i++) {
        let value = byn * (1 + (Math.random() - 0.5) * 0.04);
        let bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = (value / (byn * 0.5) * 140) + 'px';
        bar.title = 'Курс: ' + value.toFixed(2);
        let days = obshdays - 1 - i;
        bar.dataset.days = days;
        bar.onclick = function() {
            let bars = document.querySelectorAll('.bar');
            for (let j = 0; j < bars.length; j++) {
                bars[j].style.background = '#9b4c4c';
            }
            this.style.background = '#f1aaaa';
            let data = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
            document.getElementById('info').textContent = 'Дата: ' + data + ', курс: ' + value.toFixed(2) + ' руб.';
        };
        diag.appendChild(bar);
    }
}
