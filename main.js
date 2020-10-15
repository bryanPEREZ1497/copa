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
let gol;
let deNuevo = document.getElementsByClassName('botones')[0];

function crear(element) {
    element.style.display = 'block';
}

function desaparecer(element) {
    element.style.display = 'none';
}

function sortear(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
    }
    return array;
}

function aumentarInscritos() {

    if (numeroEquiposOpciones.includes(parseInt(numeroEquipos.value))) {
        congelarInput();
        // crearEquipo(equipoCreado);
        crear(equipoCreado);
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
            // desaparecerCreacionEquipo(equipoCreado);
            desaparecer(equipoCreado);
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
        document.getElementById('inscripcion').style.display = 'none';
        document.getElementById('partidosCopa').style.display = 'block';
        final(sortear(equiposNombres));
    } else {
        alert('equipos insuficientes');
    }

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

    equiposNombres = array;
    return mostrarPartidos(equiposNombres);
}


function eliminar(array, b = valorB()) {
    if (esLaFinal) {
        let index = array.indexOf(b[0]);
        array.splice(index, 1);
        equiposNombres = array;
        mostrarCampeon();
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

        document.getElementById('partidos').innerHTML += '<strong>' + array[0] + '</strong>' + '<input type="number" class="gol" placeholder="Goles">' + '<input  type="number" class="gol" placeholder="Goles">' + '<strong>' + array[1] + '</strong>' + '<br>';

    } else {
        array.forEach(nombre => {
            let [a, b] = nombre;
            document.getElementById('partidos').innerHTML += a + '<input type="number" class="gol" placeholder="Goles">' + '<input  type="number" class="gol" placeholder="Goles">' + b + '<br>';
        })
    }

}


function guardarGoles() {
    let goles = [];
    gol = document.getElementsByClassName('gol');
    for (let i = 0; i <= gol.length - 1; i++) {
        goles.push(parseInt(gol[i].value));

    }

    esLaFinal ? perdedores(goles) : agruparGoles(goles);

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

function perdedores(array) {
    let perdedores = [];

    if (esLaFinal) {
        let menor = Math.min(...array);
        let indiceMenor = array.indexOf(menor);
        perdedores.push(equiposNombres[indiceMenor]);

    } else {

        for (let i = 0; i <= array.length - 1; i++) {
            let menor = Math.min(...array[i]);
            let indiceMenor = array[i].indexOf(menor);
            perdedores.push(equiposNombres[i][indiceMenor]);
        }

        document.getElementById('partidos').remove();
        let div = document.createElement('DIV');
        div.id = 'partidos';
        document.getElementById('partidosCopa').insertBefore(div, guardarGolesBoton);
    }

    return eliminar(equiposNombres, perdedores);
}

function mostrarCampeon() {
    document.getElementById('partidosCopa').remove();
    document.getElementById('center').innerHTML = equiposNombres + ',<br> CAMPEÓN DE LA COPA <br> SOLANDA 2020 ';
    document.getElementById('conteiner').style.display = 'block';

}

function recargar() {
    location.reload();
}

deNuevo.addEventListener('click', recargar);
guardarGolesBoton.addEventListener('click', guardarGoles);
inscribirEquipo.addEventListener('click', aumentarInscritos);
comienzoCampeonato.addEventListener('click', empezarCampeonato);