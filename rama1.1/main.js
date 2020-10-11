let numeroEquipos = document.getElementById('numeroEquipos');
let inscribirEquipo = document.getElementById('inscribir');
let totalEquipoInscritosHtml = document.getElementById('totalEquipoInscritos');
let comienzoCampeonato = document.getElementById('comienzoCampeonato');
let totalEquipoInscritos = 0;
let sePuedeEmpezar = false;
const numeroEquiposOpciones = [2, 4, 8, 16, 32];
let equipoCreado = document.getElementById('creacionEquipos');
let nombreEquipo = document.getElementById('nombreEquipo');
let guardarGolesBoton = document.getElementById('guardarGoles');
let equiposNombres = [];
let esLaFinal = false;

import { crear as crearEquipo } from './creacionEquipos.js';
import { desaparecer as desaparecerCreacionEquipo } from './desaparecer.js';
import { sortear } from './sortear.js'

function aumentarInscritos() {

    if (numeroEquiposOpciones.includes(parseInt(numeroEquipos.value))) {
        congelarInput();
        crearEquipo(equipoCreado);
        if (nombreEquipo.value) {
            totalEquipoInscritos++;
            equiposNombres.push(nombreEquipo.value);
            totalEquipoInscritosHtml.innerHTML = totalEquipoInscritos;
        }
        else {
            alert('Escriba el nombre del equipo');
        }

        if (totalEquipoInscritos === parseInt(numeroEquipos.value)) {
            quitarInscripcion();
            desaparecerCreacionEquipo(equipoCreado);
        }

    } else {
        alert('Escoja el número de equipos para la copa');
        console.log('No se han elegido el número de equipos');
    }
}

function quitarInscripcion() {
    inscribirEquipo.remove();
    sePuedeEmpezar = true;
}

function empezarCampeonato() {
    if (sePuedeEmpezar) {
        alert(`Estos son los equipos inscritos: ${equiposNombres}`);
        final(sortear(equiposNombres));
    } else {
        alert('equipos insuficientes');
    }
    //Con esto: document.location='copa.html', puedo ir al html copa para anotar los goles.
}

function congelarInput() {
    let congelado = document.createAttribute("readonly");
    //attr.value = "democlass";
    numeroEquipos.setAttributeNode(congelado);
}

/*SECTION  funciones para empezar copa*/


function final(equipo) {
    if (equipo.length === 2) {
        esLaFinal = true;
        alert(`Final de la copa: ${equipo[0]} contra ${equipo[1]}`);
        mostrarPartidos(equipo);
        // console.log(`Final de la copa: ${equipo[0]} contra ${equipo[1]}`);
        // let pierde = prompt('FINAL: ¿Quién pierde?');
        // let index = equipo.indexOf(pierde);
        // equipo.splice(index, 1);
        // console.log(`Gana ${equipo}`);
        // alert(`Gana ${equipo}`);
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
    alert(`Estos son los equipos sorteados: ${equipo}`);
    let array = crearArray(equipo);
    let j = 0;
    for (let i = 0; i <= array.length - 1; i++) {
        while (array[i].length < 2) {
            array[i].push(equipo[j]);
            j++;
        }
    }
    alert(`Aquí se han emparejado los equipos: ${array}`);
    equiposNombres = array;
    return mostrarPartidos(equiposNombres);
}


function eliminar(array, b = valorB()) {
    if (esLaFinal) {
        let index = array.indexOf(b[0]);
        array.splice(index, 1);
        equiposNombres = array;
        alert(`Los ganadores de la Copa Solanda son ${equiposNombres}`);

    } else {
        b.forEach(e => {
            for (let i = 0; i <= array.length - 1; i++) {
                let index = array[i].indexOf(e);
                if (index >= 0) {
                    array[i].splice(index, 1);
                    i = array.length;
                }
            }
        });
        equiposNombres = array;
        return concatenar(equiposNombres);
    }

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
    equiposNombres = a;

    return final(equiposNombres);
}


/*SECTION  funciones para los goles*/


function mostrarPartidos(array) {
    if (esLaFinal) {
        document.getElementById('partidos').innerHTML += array[0] + '<input type="number" class="gol" placeholder="Goles">' + '<input  type="number" class="gol" placeholder="Goles">' + array[1] + '<br>';

    } else {
        array.forEach(nombre => {
            let [a, b] = nombre;
            document.getElementById('partidos').innerHTML += a + '<input type="number" class="gol" placeholder="Goles">' + '<input  type="number" class="gol" placeholder="Goles">' + b + '<br>';
        })
    }

}


function guardarGoles() {

    if (esLaFinal) {
        let goles = [];
        let gol = document.getElementsByClassName('gol');
        for (let i = 0; i <= gol.length - 1; i++) {
            goles.push(parseInt(gol[i].value));

        }
        alert(`Estos goles se han guardado: ${goles}`);
        return perdedores(goles);


    } else {
        let goles = [];
        let gol = document.getElementsByClassName('gol');
        for (let i = 0; i <= gol.length - 1; i++) {
            goles.push(parseInt(gol[i].value));

        }
        alert(`Estos goles se han guardado: ${goles}`);
        return agruparGoles(goles);
    }

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
    alert(`Estos son los goles agrupados:${array}`);
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

function perdedores(array) {
    if (esLaFinal) {
        let perdedores = [];
        let menor = Math.min(...array);//cambio
        let indiceMenor = array.indexOf(menor);
        perdedores.push(equiposNombres[indiceMenor]);
        console.log(perdedores);
        alert(`Pierden: ${perdedores}`);
        return eliminar(equiposNombres, perdedores);
    } else {
        let perdedores = [];
        for (let i = 0; i <= array.length - 1; i++) {
            let menor = Math.min(...array[i]);
            let indiceMenor = array[i].indexOf(menor);
            perdedores.push(equiposNombres[i][indiceMenor]);
            console.log(perdedores);
        }
        alert(`Pierden: ${perdedores}`);
        return eliminar(equiposNombres, perdedores);
    }
}




guardarGolesBoton.addEventListener('click', guardarGoles);
inscribirEquipo.addEventListener('click', aumentarInscritos);
comienzoCampeonato.addEventListener('click', empezarCampeonato);