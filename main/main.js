let numeroEquipos = document.getElementById('numeroEquipos');
let inscribirEquipo = document.getElementById('inscribir');
let totalEquipoInscritosHtml = document.getElementById('totalEquipoInscritos');
let comienzoCampeonato = document.getElementById('comienzoCampeonato');
let totalEquipoInscritos = 0;
let sePuedeEmpezar = false;
const numeroEquiposOpciones = [2, 4, 8, 16, 32];
let equipoCreado = document.getElementById('creacionEquipos');
let nombreEquipo = document.getElementById('nombreEquipo');
let equiposNombres = [];

import { crear as crearEquipo } from './creacionEquipos.js';
import { equipos, guardarEquipo, Equipo } from './guardarEquipo.js';
import { desaparecer as desaparecerCreacionEquipo } from './desaparecer.js';
import { final } from './empezarCopa.js';
import { sortear } from './sortear.js'

function aumentarInscritos() {

    if (numeroEquiposOpciones.includes(parseInt(numeroEquipos.value))) {
        congelarInput();
        crearEquipo(equipoCreado);
        if (nombreEquipo.value) {
            totalEquipoInscritos++;
            guardarEquipo(nombreEquipo.value, totalEquipoInscritos);
            equiposNombres.push(nombreEquipo.value);
            totalEquipoInscritosHtml.innerHTML = totalEquipoInscritos;
        }
        else {
            alert('escriba el nombre del equipo');
        }

        if (totalEquipoInscritos === parseInt(numeroEquipos.value)) {
            quitarInscripcion();
            desaparecerCreacionEquipo(equipoCreado);
        }

    } else {
        alert('escoja el numero de equipos para la copa');
        console.log('no se han elegido el numero de equipos');
    }
}

function quitarInscripcion() {
    inscribirEquipo.remove();
    sePuedeEmpezar = true;
}

function empezarCampeonato() {
    if (sePuedeEmpezar) {
        alert('en desarrollo');
        alert(equiposNombres);        
        // document.location='copa.html';
        
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

inscribirEquipo.addEventListener('click', aumentarInscritos);
comienzoCampeonato.addEventListener('click', empezarCampeonato);