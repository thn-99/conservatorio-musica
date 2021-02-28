var usuario = sesionUsuario();
if(usuario==false){
    window.location.replace("/no-zero/login.html");
}
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

reservasCabinas();
function navbar() {
    let body = document.getElementById("navegacion")
    let nav = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>

          <li class="nav-item"> <a class="nav-link disabled" href="#">Admin: ${usuario} </a> </li> <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Cerrar Sesion</a></li>
          
      </ul>
    </div>
    <form class="form-inline my-2 my-lg-0">
        <button class="btn ${language == 'es' ? 'btn-secondary' : 'btn-primary'}  my-2 my-sm-0" type="submit" ${language == 'es' ? '' : 'disabled'} onclick="setLanguageEn()">English</button>
        <button class="btn ${language == 'es' ? 'btn-primary' : 'btn-secondary'}  my-2 my-sm-0" type="submit" ${language == 'es' ? 'disabled' : ''} onclick="setLanguageEs()">Spanish</button>
      </form>
  </nav>
  `;
    body.innerHTML = nav;
}


function sesionUsuario() {
    let respuesta = serverController('compruebaSesionAdmin');
    if (respuesta.estado == true) {
        return respuesta.mensaje;
    } else {
        return false;
    }
}

function logout(){
  serverController('logout');
  window.location.replace("/");
}

function reservasCabinas() {
    navbar();
    let contenedor = `
    <div class="card">
    <div class="card-header bg-primary text-white">
    Reservas efectuadas
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
    <th>Planta</th>
    <th>Tipo</th>
    <th>Alumno/s</th>
    <th>Fecha</th>
    <th>Hora</th>
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
    todasCabinas = serverController('todasReservasAdmin');

    mostarCabinas();
    meterTodos();
}

function mostarCabinas() {
    fecha=document.getElementById("fecha").value;        
    
    console.log(document.getElementById("fecha").value);
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
    if(!allHoras.includes(cabina.hora)){
        allHoras.push(cabina.hora);
    }
    if(!allPlantas.includes(cabina.puerta.planta)){
        allPlantas.push(cabina.puerta.planta);
    }
    if(!allPuertas.includes(cabina.puerta.id)){
        allPuertas.push(cabina.puerta.id);
    }
    if(!allTipos.includes(cabina.puerta.tipo)){
        allTipos.push(cabina.puerta.tipo);
    }





    if ((puerta == "todas" || puerta == cabina.puerta.id) && (tipo == "todas" || tipo == cabina.puerta.tipo) && (planta == "todas" || planta == cabina.puerta.planta) && (hora == "todas" || hora == cabina.hora) && (!fecha || 0 === fecha.length || fecha==cabina.fecha)) {
        return `
        <tr>
        <td>${cabina.puerta.id}</td>
        <td>${cabina.puerta.planta}</td>
        <td>${cabina.puerta.tipo}</td>
        ${cabina.alumno2 && cabina.alumno3?`<td>${cabina.alumno}<br>${cabina.alumno2}<br>${cabina.alumno3}</td>`:`<td>${usuario}</td>`}
        <td>${cabina.fecha}</td>
        <td>${cabina.hora}</td>
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