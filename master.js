var puerta = "todas";
var tipo = "todas";
var fecha = false;
var planta;
var hora = "todas";
var usuario = sesionUsuario();
var todasCabinas;

function main() {
    if (!usuario) {
        //navbar();
        //loginForm();
        registerForm();
    } else {
        
        reservasCabinas();
    }
}

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
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
            ${usuario == false ? '<li class="nav-item"> <a class="nav-link disabled" href="#">Iniciar Sesion</a></li>' : '<li class="nav-item"> <a class="nav-link disabled" href="#">Usuario: ' + usuario + '</a> </li> <li class="nav-item"><a class="nav-link" href="#">Cerrar Sesion</a></li>'}
          
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

function loginForm() {
    navbar();
    let loginForm = `
            <div class="row mb-4">
            <div class="col-sm-12 d-flex justify-content-center">
                <h2>${textSignIn}</h2>
            </div>
        </div>

        <div>
            <div class="form-row justify-content-center mb-4">
                <div class="col-sm-4">
                    <input type="email" class="form-control" placeholder="${textMail}"  id="correo">

                </div>
            </div>
            <div class="form-row justify-content-center mb-4">
                <div class="col-sm-4">
                    <input type="password" class="form-control" placeholder="${textPassw}" id="clave">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-sm-12 d-flex justify-content-center">
                    <a href="#">${textFgtPass}</a>
                </div>
            </div>

            <div class="row mb-2 justify-content-center">
                    <button class="col-sm-2 btn btn-info" onclick="login()">${textSignIn}</button>
                
            </div>
            <div class="row mb-2 ">
                <div class="col-sm-12 d-flex justify-content-center">
                    <span>${textNotAMember} </span><a href="#" onclick="registerForm()">${textRegister}</a>
                </div>
            </div>

        </div>
    `;

    document.getElementById("app").innerHTML = loginForm;


}

function login() {
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;
    let respuesta = serverController('login', [
        ["correo", correo],
        ["clave", clave]
    ]);
    console.log(respuesta);
    if (respuesta.estado != "true") {
        reservasCabinas();
    } else {
        alert("Mal");
        return false;
    }
}

function registerForm() {
    navbar();
    let registerForm = `
      <div class="row mb-4">
        <div class="col-sm-12 d-flex justify-content-center">
          <h2>${textSignIn}</h2>
        </div>
      </div>

      <div>
        <div class="form-row justify-content-center mb-4">
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              placeholder="${textName}"
              id="nombre"
            />
          </div>
        </div>

        <div class="form-row justify-content-center mb-4">
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              placeholder="Apellido"
              id="apellidos"
            />
          </div>
        </div>
        <div class="form-row justify-content-center mb-4">
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control"
              placeholder="Instrumento"
              id="instrumento"
            />
          </div>
        </div>
        <div class="form-row justify-content-center mb-4">
          <div class="col-sm-4">
            <input
              type="email"
              class="form-control"
              placeholder="${textMail}"
              id="correo"
            />
          </div>
        </div>
        <div class="form-row justify-content-center mb-4">
          <div class="col-sm-4">
            <input
              type="password"
              class="form-control"
              placeholder="${textPassw}"
              id="clave"
            />
          </div>
        </div>
        <div class="row mb-2 justify-content-center">
          <button class="col-sm-2 btn btn-info" onclick="login()">
            Registrarse
          </button>
        </div>

        <div class="row mb-2 ">
          <div class="col-sm-12 d-flex justify-content-center">
            <span>Ya estás registrado?</span><a href="#" onclick="loginForm()">${textSignIn}</a>
          </div>
        </div>
      </div>
    `;
    document.getElementById("app").innerHTML=registerForm;
}


function sesionUsuario() {
    let respuesta = serverController('compruebaSesion');
    console.log(respuesta);
    if (respuesta.estado == true) {
        return respuesta.mensaje;
    } else {
        return false;
    }
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
        <option value="general">general</option>
        <option value="arpa">arpa</option>
        <option value="canto">canto</option>
        <option value="percusion">percusion</option>
        <option value="jazz">jazz</option>
        <option value="camara">camara</option>
        </select>
        </div>

        <div class="col-sm-3">Planta<br>
        <select id="planta" onchange="mostarCabinas()">
        <option value="todas" selected>Todas</option>
        <option value="1">Planta 1</option>
        <option value="2">Planta 2</option>
        <option value="3">Planta 3</option>
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
}

function mostarCabinas() {
    if (filtroFecha()) {
        todasCabinas = serverController('todasCabinas', [
            ['fecha', fecha]
        ]);
    }
    filtroPuerta();
    filtroTipo();
    filtroPlanta();


    let res = Object.values(todasCabinas.mensaje).reduce((acc, val) => acc + cabinaTemplate(val), "");
    if (todasCabinas.estado == true) {
        document.getElementById("tbody").innerHTML = res;
    }
    
    document.querySelectorAll('.botonReserva').forEach(element => {
        element.onclick=reservar;
    });
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
    console.log(puerta);
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
    if ((puerta == "todas" || puerta == cabina.id) && (tipo == "todas" || tipo == cabina.tipo) && (planta == "todas" || planta == cabina.planta)) {
        return `
    <tr">
        <td>${cabina.id}</td>
        <td>${cabina.tipo}</td>
        <td>${cabina.planta}</td>
        <td>${cabina.horas}</td>
        <td><button id="puerta-${cabina.id}" type="button" class="btn btn-warning botonReserva">Comprar</button></td>
    </tr>
    `;
    } else {
        return ``;
    }

}

function reservar(evento){
    alert(evento.target.id);
}

function reservarForm(){
    let reservaForm = `gfh`;
}