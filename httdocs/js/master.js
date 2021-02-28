var puerta = "todas";
var tipo = "todas";
var fecha = false;
var planta;
var hora = "todas";
var todasCabinas;
var allHoras= new Array();
var allPuertas= new Array();
var allPlantas = new Array();
var allTipos= new Array();

    if (usuario!=false) {
        reservasCabinas();
    } else { 
        window.location.replace("/access/login.html");
    }

function reservasCabinas() {
    navbar();
    let contenedor = `
    <div class="card">
    <div class="card-header bg-primary text-white">
    Sistema de reservas
    </div>
    <div class="card-block">

    <form class="form mt-3">
        <div class="row">
        <div class="col-sm-3">Fecha: <input type="date" id="fecha" onchange="mostarCabinas()"></div>
        </div>
        <div class="form-group row">
        <div class="col-sm-3">Puerta<br>
        <select id="puerta" onchange="mostarCabinas()">
        <option value="todas" selected>Todas</option>
        </select>
        </div>


        <div class="col-sm-3">Tipo<br>
        <select id="tipo" onchange="mostarCabinas()">
        <option value="todas" selected>Todas</option>

        </select>
        </div>

        <div class="col-sm-3">Planta<br>
        <select id="planta" onchange="mostarCabinas()">
        <option value="todas" selected>Todas</option>

        </select>
        </div>

        <div class="col-sm-3">Hora<br>
        <select id="hora" onchange="mostarCabinas()">
        <option value="todas" selected>Todas</option>

        </select>
        </div>

    </form>

    <div class="table-responsive">
    <table class="table table-striped">
    <thead>
    <tr>
    <th>Puerta</th>
    <th>Tipo</th>
    <th>Planta</th>
    <th>Hora</th>
    <th>Reservar</th>
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

    mostarCabinas();
    meterTodos();
}

function mostarCabinas() {
    let ff = filtroFecha();
    
    if (ff) {
        todasCabinas = serverController('todasCabinas', [
            ['fecha', fecha]
        ]);
        
    }
    filtroPuerta();
    filtroTipo();
    filtroPlanta();
    hora= document.getElementById("hora").value;

    let res = Object.values(todasCabinas.mensaje).reduce((acc, val) => acc + cabinaTemplate(val), "");
    if (todasCabinas.estado == true) {
        document.getElementById("tbody").innerHTML = res;
    }
    
    document.querySelectorAll('.botonReserva').forEach(element => {
        element.onclick=reservar;
    });
    
    console.log(allHoras);
    console.log(allPlantas);
    console.log(allPuertas);
    console.log(allTipos);
}

function filtroFecha() {
    let fechaInput;
    if (document.getElementById("fecha").value) {
        fechaInput = document.getElementById("fecha").value;
    }

    if (fecha && fechaInput && fecha != fechaInput) {
        fecha = fechaInput;
        return true;
    } else if (!fecha) {
        fecha = new Date().toISOString().slice(0, 10);
        return true;
    }
    return false;
}

function filtroPuerta() {
    let puertaInput;
    if (document.getElementById("puerta").value) {
        puertaInput = document.getElementById("puerta").value;
    }
    if (puertaInput && puerta != puertaInput) {
        puerta = puertaInput;
    }
}

function filtroTipo() {
    let tipoInput;
    if (document.getElementById("tipo").value) {
        tipoInput = document.getElementById("tipo").value;
    }
    if (tipoInput && tipo != tipoInput) {
        tipo = tipoInput;
    }
}

function filtroPlanta() {
    let plantaInput;

    if (document.getElementById("planta").value) {
        plantaInput = document.getElementById("planta").value;
    }
    if (plantaInput && planta != plantaInput) {
        planta = plantaInput;
        let puertas = new Array();
        if (planta == "todas") {
            document.getElementById("puerta").innerHTML = `<option value="todas" selected>Todas</option>`;
            for (let index = 1; index <= 31; index++) {
                document.getElementById("puerta").innerHTML += `<option value="${index}">Puerta ${index}</option>`;
            }
        } else {
            todasCabinas.mensaje.forEach(cabina => {
                if (cabina.planta == planta) {
                    if (!puertas.includes(cabina.id)) {
                        puertas.push(cabina.id);
                    }
                }
            });
            document.getElementById("puerta").innerHTML = `<option value="todas" selected>Todas</option>`;
            puertas.forEach(puerta => {
                document.getElementById("puerta").innerHTML += `<option value="${puerta}">Puerta ${puerta}</option>`;
            });

        }



    }
    console.log(planta);
}


function cabinaTemplate(cabina) {
    if(!allHoras.includes(cabina.horas)){
        allHoras.push(cabina.horas);
    }
    if(!allPlantas.includes(cabina.planta)){
        allPlantas.push(cabina.planta);
    }
    if(!allPuertas.includes(cabina.id)){
        allPuertas.push(cabina.id);
    }
    if(!allTipos.includes(cabina.tipo)){
        allTipos.push(cabina.tipo);
    }





    if ((puerta == "todas" || puerta == cabina.id) && (tipo == "todas" || tipo == cabina.tipo) && (planta == "todas" || planta == cabina.planta) && (hora == "todas" || hora == cabina.horas)) {
        return `
    <tr">
        <td>${cabina.id}</td>
        <td>${cabina.tipo}</td>
        <td>${cabina.planta}</td>
        <td>${cabina.horas}</td>
        <td><button id="hora-${cabina.horas}puerta-${cabina.id}" type="button" class="btn btn-warning botonReserva">Reservar</button></td>
    </tr>
    `;
    } else {
        return ``;
    }

}

function meterTodos(){
    let domHoras;
    allHoras.sort();
    domHoras= document.getElementById("hora");
    domHoras.innerHTML=`<option value="todas" selected>Todas</option>`;
    allHoras.forEach(element => {
        domHoras.innerHTML+=`<option value="${element}">${element}</option>`;
    });

    allPlantas.sort();
    domHoras= document.getElementById("planta");
    domHoras.innerHTML=`<option value="todas" selected>Todas</option>`;
    allPlantas.forEach(element => {
        domHoras.innerHTML+=`<option value="${element}">${element}</option>`;
    });

    allPuertas.sort();
    domHoras= document.getElementById("puerta");
    domHoras.innerHTML=`<option value="todas" selected>Todas</option>`;
    allPuertas.forEach(element => {
        domHoras.innerHTML+=`<option value="${element}">${element}</option>`;
    });

    allTipos.sort();
    domHoras= document.getElementById("tipo");
    domHoras.innerHTML=`<option value="todas" selected>Todas</option>`;
    allTipos.forEach(element => {
        domHoras.innerHTML+=`<option value="${element}">${element}</option>`;
    });
}

function reservar(evento){
    //${cabina.horas}puerta-${cabina.id}
    //alert(evento.target.id);
    allTd=evento.target.parentNode.parentNode.querySelectorAll('td');

    //horaSel=evento.target.id.slice(5,13);
    botonSel=evento.target;
    horaSel=allTd[3].innerHTML;
    puertaSel=allTd[0].innerHTML;
    tipoSel=allTd[1].innerHTML;
    plantaSel=allTd[2].innerHTML;

    console.log(horaSel);
    console.log(puertaSel);
    console.log(tipoSel);
    asignarModal();
    $("#miModal").modal();
    console.log();
    
}


function asignarModal(){
    let modal
    if(tipoSel!="camara"){

    
    modal = `<div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="miModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Está seguro de querer reservar?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <span>Día: </span> <button disabled class="btn btn-success">${fecha}</button>
            <br>
            <br>
            <span>Hora: </span> <button disabled class="btn btn-success">${horaSel}</button>
          
          <br>
          <br>
          <span>Tipo: </span> <button disabled class="btn btn-success">${tipoSel}</button>
          <br>
          <br>
          <span>Puerta: </span> <button disabled class="btn btn-success">${puertaSel}</button>
          <br>
          <br>
          <span>Planta: </span> <button disabled class="btn btn-success">${plantaSel}</button>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">cancelar</button>
          <button type="button" class="btn btn-primary" onclick="confirmaReserva()">Reservar</button>
        </div>
      </div>
    </div>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  </div>`;
}else{
    modal = `<div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="miModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Está seguro de querer reservar?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <span>Día: </span> <button disabled class="btn btn-success">${fecha}</button>
            <br>
            <br>
            <span>Hora: </span> <button disabled class="btn btn-success">${horaSel}</button>
          
          <br>
          <br>
          <span>Tipo: </span> <button disabled class="btn btn-success">${tipoSel}</button>
          <br>
          <br>
          <span>Puerta: </span> <button disabled class="btn btn-success">${puertaSel}</button>
          <br>
          <br>
          <span>Planta: </span> <button disabled class="btn btn-success">${plantaSel}</button>
          <br>
          <br>
        <label for="alumno2">Correo alumno adicional</label>
          <input type="text" required name="alumno2" id="alumno2">
          <label for="alumno4">Correo alumno adicional</label>
          <input type="text" required name="alumno3" id="alumno3">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">cancelar</button>
          <button type="button" class="btn btn-primary" onclick="confirmaReserva()">Reservar</button>
        </div>
      </div>
    </div>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  </div>`;
}
  //TO-DO
  //El mas igual, si se le da de nuevo peta, crear un div con id y asignarselo.
  document.getElementById("modalContainer").innerHTML=modal;

}
function confirmaReserva(){
    $("#miModal").modal("hide");
    let respuesta
    if(tipoSel!="camara"){
         respuesta = serverController("reservar",[["fecha",fecha],["hora",horaSel],["tipo",tipoSel],["puerta",puertaSel],["planta",plantaSel]]);

    }else{
        let correoAlumno2=document.getElementById("alumno2").value;
        let correoAlumno3=document.getElementById("alumno3").value;
        respuesta = serverController("reservarCamara",[["fecha",fecha],["hora",horaSel],["tipo",tipoSel],["puerta",puertaSel],["planta",plantaSel],["correoAlumno2",correoAlumno2],["correoAlumno3",correoAlumno3]]);
    }


    document.getElementById("tostadas").innerHTML=`<div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="true" data-delay="10000">
    <div class="toast-header">
      <strong class="mr-auto">${respuesta.estado?'Éxito al reservar':'Error al reservar'}</strong>
      <small>Ahora</small>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
    ${respuesta.estado?'Su reserva se ha hecho con éxito':respuesta.mensaje}
    </div>
  </div>`;
    if(respuesta.estado){
        botonSel.parentNode.parentNode.parentNode.removeChild(botonSel.parentNode.parentNode);
    }
  $('.toast').toast("show");
    
}