import { mostrarPartidos, perdedores } from './goles.js';

 function final(equipo) {
    if (equipo.length === 2) {
        console.log(`final de la copa: ${equipo[0]} contra ${equipo[1]} `);
        let pierde = prompt('FINAL: ¿Quién pierde?');
        let index = equipo.indexOf(pierde);
        equipo.splice(index, 1);
        console.log(`Gana ${equipo}`);
        alert(`Gana ${equipo}`);
    }
    else emparejar(equipo);
}

function crearArray(equipo) {
    let equiposEmparejados = [];
    let pares = equipo.length / 2;
    for (let i = 0; i < pares; i++) {
        equiposEmparejados.push([]);
    }
    return equiposEmparejados;
}

function emparejar(equipo) {
    let array = crearArray(equipo);
    let j = 0;
    for (let i = 0; i <= array.length - 1; i++) {
        while (array[i].length < 2) {
            array[i].push(equipo[j]);
            j++;
        }
    }
    alert(`estoy en emparejar ${array}`);
    
    mostrarPartidos(array);
    //eliminar(array, perdedores());
    //return eliminar(array, perdedores());
}


function eliminar(array, b = valorB()) {

    b.forEach(e => {
        for (let i = 0; i <= array.length - 1; i++) {
            let index = array[i].indexOf(e);
            if (index >= 0) {
                array[i].splice(index, 1);
                i = array.length;
            }
        }
    });

    return concatenar(array);
}

function valorB() {
    let b = prompt('¿Cúales perdieron?')
    let c = b.split(',')
    return c;
}

function concatenar(array) {
    let a = array.reduce((total, curr) => {
        return total.concat(curr);
    })
    //return a;

    return final(a);
}


