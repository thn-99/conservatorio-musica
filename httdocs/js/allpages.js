var usuario = sesionUsuario();
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
        ${usuario?`<li class="nav-item">
        <a class="nav-link" href="/alumno">Mis reservas <span class="sr-only">(current)</span></a>
      </li>`:''}
            ${usuario == false ? '<li class="nav-item"> <a class="nav-link disabled" href="#">Iniciar Sesion</a></li>' : '<li class="nav-item"> <a class="nav-link disabled" href="#">Usuario: ' + usuario + '</a> </li> <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Cerrar Sesion</a></li>  <li class="nav-item"><a class="nav-link" href="/alumno/cambiar-contra.html">Cambiar pass</a></li>'}
          
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
    let respuesta = serverController('compruebaSesion');
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