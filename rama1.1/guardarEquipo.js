export let equipos = [];


export class Equipo {
    constructor(nombre, id) {
        this.nombre = nombre,
            this.id = id
    }
}

export function guardarEquipo(nombreEquipo, id) {
    equipos.push(new Equipo(nombreEquipo, id));
    console.log(equipos);
    return equipos;
}



