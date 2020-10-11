export let equipos = [];


export class Equipo {
    constructor(nombre,id){
        this.nombre = nombre,
        this.id=id
    }    
}

export function guardarEquipo(a,b) {
    equipos.push(new Equipo(a,b));
    console.log (equipos);
}



