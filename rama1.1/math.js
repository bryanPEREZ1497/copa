
let equiposNombres = [['Las Shirley', 'Las Yuly'], ['Los Bryan', 'Los Brandon']];

let btn = document.getElementById('guardarGoles');

btn.addEventListener('click', guardarGoles);

function guardarGoles() {
    let goles = [];
    let gol = document.getElementsByClassName('numero');
    for (let i = 0; i <= gol.length - 1; i++) {
        goles.push(parseInt(gol[i].value));
    }

    return agruparGoles(goles);
}

function agruparGoles(goles) {
    let array = crearArrayGoles(goles);
    let j = 0;
    for (let i = 0; i <= array.length - 1; i++) {
        while (array[i].length < 2) {
            array[i].push(goles[j]);
            j++;
        }
    }
    goles = array;

    return perdedores(goles);
}

function crearArrayGoles(goles) {
    let golesEmparejados = [];
    let pares = goles.length / 2;
    for (let i = 0; i < pares; i++) {
        golesEmparejados.push([]);
    }
    return golesEmparejados;
}

function perdedores(goles) {
    let perdedores = [];
    console.log('en perdedores ' + goles);
    for (let i = 0; i <= goles.length - 1; i++) {
        let menor = Math.min(...goles[i]);
        let indiceMenor = goles[i].indexOf(menor);
        perdedores.push(equiposNombres[i][indiceMenor]);//aqui esta un error
        console.log(perdedores);
    }
    console.log(`Pierden: ${perdedores}`);
    alert('en guardargoles ' + perdedores);
    return perdedores;
}