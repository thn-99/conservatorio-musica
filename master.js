function navbar(){
    let usuario= sesionUsuario();
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
            ${usuario==false?'<li class="nav-item"> <a class="nav-link disabled" href="#">Iniciar Sesion</a></li>':'<li class="nav-item"> <a class="nav-link disabled" href="#">Usuario: '+usuario+'</a> </li> <li class="nav-item"><a class="nav-link" href="#">Cerrar Sesion</a></li>'}
          
      </ul>
    </div>
    <form class="form-inline my-2 my-lg-0">
        <button class="btn ${language=='es'?'btn-secondary':'btn-primary'}  my-2 my-sm-0" type="submit" ${language=='es'?'':'disabled'} onclick="setLanguageEn()">English</button>
        <button class="btn ${language=='es'?'btn-primary':'btn-secondary'}  my-2 my-sm-0" type="submit" ${language=='es'?'disabled':''} onclick="setLanguageEs()">Spanish</button>
      </form>
  </nav>
  `;
  body.innerHTML+=nav;
}

function loginForm(){
    let nose = `    <h1>Conservatorio Música</h1>

    <div id="login">
        Correo: <input type="text" id="usuario">
        Contraseña: <input type="text" id="clave">
        <input type="button" value="Identificarse" onclick="login()">
    </div>0`;


    let loginForm=`
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
                    <span>${textNotAMember} </span><a href="#">${textRegister}</a>
                </div>
            </div>

        </div>
    `;

    document.getElementById("app").innerHTML+=loginForm;

    
}
function login(){
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;
    let respuesta = serverController('login', [["correo", correo], ["clave", clave]]);
    console.log(respuesta);
        if (respuesta.estado!="true") {
            alert(respuesta.mensaje);
            return false;
        } else {
            alert(correcto);
            return false;
        }
}

function sesionUsuario(){
    let respuesta = serverController('compruebaSesion');
    console.log(respuesta);
    if(respuesta.estado==true){
        return respuesta.mensaje;  
    }else{
        return false;
    }
}


function mostarCabinas(){

    let fecha = document.getElementById("fecha").value;
    let cabinas = serverController('todasCabinas',[['fecha',fecha]]);

}

