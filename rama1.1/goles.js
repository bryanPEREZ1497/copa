let equiposNombres = [['Las Shirley', 'Las Yuly'], ['Los Bryan', 'Los Brandon']];

let goles = [1, 0, 4, 3];


//import { nombresEquipos } from './empezarCopa.js'


let guardarGolesBoton = document.getElementById('guardarGoles');

export function mostrarPartidos(array) {
    console.log('en mostrar partidos' + array);
    array.forEach(nombre => {
        let [a, b] = nombre;
        document.getElementById('partidos').innerHTML += a + '<input type="number" class="gol" placeholder="Goles">' + '<input  type="number" class="gol" placeholder="Goles">' + b + '<br>';
    })
}

export function guardarGoles() {
    // if (esLaFinal)  //codigo para el equiposNombres con solo dos strings
    let goles = [];
    let gol = document.getElementsByClassName('gol');
    console.log('en guardargoles' + gol);
    for (let i = 0; i <= (equiposNombres.length * 2) - 1; i++) {
        if (gol[i].value) {
            goles.push(gol[i].value);
        }
    }
    console.log('en guardargoles' + goles);
    return emparejar(goles);
}



//para agrupar los goles
export function emparejar(equipo) {
    let array = crearArray(equipo);

    let j = 0;
    for (let i = 0; i <= array.length - 1; i++) {
        while (array[i].length < 2) {
            array[i].push(equipo[j]);
            j++;
        }
    }
    console.log('en emparejar' + array);
    return perdedores(array);
}

export function crearArray(equipo) {
    let equiposEmparejados = [];
    let pares = equipo.length / 2;
    for (let i = 0; i < pares; i++) {
        equiposEmparejados.push([]);
    }
    return equiposEmparejados;
}

export function perdedores(array) {
    
    let perdedores = [];
    console.log('en perdedores ' + array);
    for (let i = 0; i <= array.length - 1; i++) {
        let menor = Math.min(...array[i]);
        let indiceMenor = array[i].indexOf(menor);
        perdedores.push(nombresEquipos[i][indiceMenor]);//aqui esta un error
        console.log(perdedores);
    }
    console.log(`Pierden: ${perdedores}`);
    alert('en guardargoles ' + perdedores);
    return perdedores;
}

guardarGolesBoton.addEventListener('click', guardarGoles);