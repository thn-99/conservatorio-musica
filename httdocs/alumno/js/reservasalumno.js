navbar();
let contenedor = `
    <div class="card">
    <div class="card-header bg-primary text-white">
    Mis reservas
    </div>
    <div class="card-block">


    <div class="table-responsive">
    <table class="table table-striped">
    <thead>
    <tr>
    <th>Puerta</th>
    <th>Planta</th>
    <th>Tipo</th>
    <th>Alumno</th>
    <th>Día</th>
    <th>Hora</th>
    <th>Cancelar</th>
    </tr>
    </thead>
    <tbody id=tbody>

    </tbody>
    </table>
    </div>
    </div>
    </div>

    `;
document.getElementById("app").innerHTML = contenedor;
mostrarReservas();
function mostrarReservas() {

 
        todasCabinas = serverController('todasReservas');

    
    let res = Object.values(todasCabinas.mensaje).reduce((acc, val) => acc + reservaTemplate(val), "");
    if (todasCabinas.estado == true) {
        document.getElementById("tbody").innerHTML = res;
    }


    document.querySelectorAll('.botonReserva').forEach(element => {
        element.onclick = cancelarReserva;
    });

}

function reservaTemplate(cabina) {

        return `
    <tr>
        <td>${cabina.puerta.id}</td>
        <td>${cabina.puerta.planta}</td>
        <td>${cabina.puerta.tipo}</td>
        ${cabina.alumno2 && cabina.alumno3?`<td>${cabina.alumno}<br>${cabina.alumno2}<br>${cabina.alumno3}</td>`:`<td>${usuario}</td>`}
        <td>${cabina.fecha}</td>
        <td>${cabina.hora}</td>
        <td><button id="${cabina.id}" type="button" class="btn btn-warning botonReserva">Cancelar</button></td>
    </tr>
    `;
    

}
function cancelarReserva(evento){
    allTd=evento.target.parentNode.parentNode.querySelectorAll('td');
    let tipoSel = allTd[2].innerHTML;
    console.log(tipoSel);
    let respuesta = serverController("cancelarReserva",[["idReserva",evento.target.id],["tipo",tipoSel]]);

    if(respuesta.estado==true){
        evento.target.parentNode.parentNode.parentNode.removeChild(evento.target.parentNode.parentNode);
    }else{
        alert("Algo ha salido mal");
    }

    
}

