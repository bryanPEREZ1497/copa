function crearElemento() {
    let div = document.createElement('DIV');
    div.innerHTML='Este es un div';
    div.id='esteEsId'
    document.getElementById('seccion').appendChild(div);
}

