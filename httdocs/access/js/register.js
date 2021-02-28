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
          <button class="col-sm-2 btn btn-info" onclick="register()">
            Registrarse
          </button>
        </div>

        <div class="row mb-2 ">
          <div class="col-sm-12 d-flex justify-content-center">
            <span>Ya estás registrado?</span><a href="login.html" onclick="">${textSignIn}</a>
          </div>
        </div>
      </div>
    `;
    document.getElementById("app").innerHTML=registerForm;
}

function register() {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellidos").value;
  let instrumento = document.getElementById("instrumento").value;

  let correo = document.getElementById("correo").value;
  let clave = document.getElementById("clave").value;
  let respuesta = serverController('register', [
      ["correo", correo],
      ["clave", clave],
      ["instrumento",instrumento],
      ["nombre",nombre],
      ["apellidos",apellido]
  ]);
  console.log(respuesta);
  if (respuesta.estado != true) {
      alert("Mal");
  } else {
      window.location.replace("/access/login.html");
  }
  return false;

}