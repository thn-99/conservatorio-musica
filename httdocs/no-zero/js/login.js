
    let loginForm = `
            <div class="row mb-4">
            <div class="col-sm-12 d-flex justify-content-center">
                <h2>Master Login</h2>
            </div>
        </div>

        <div>
            <div class="form-row justify-content-center mb-4">
                <div class="col-sm-4">
                    <input type="text" class="form-control" placeholder="Name"  id="nombre">

                </div>
            </div>
            <div class="form-row justify-content-center mb-4">
                <div class="col-sm-4">
                    <input type="password" class="form-control" placeholder="${textPassw}" id="clave">
                </div>
            </div>


            <div class="row mb-2 justify-content-center">
                    <button class="col-sm-2 btn btn-info" onclick="login()">${textSignIn}</button>
                
            </div>

        </div>
    `;

    document.getElementById("app").innerHTML = loginForm;


function login() {
    let nombre = document.getElementById("nombre").value;
    let clave = document.getElementById("clave").value;
    let respuesta = serverController('loginAdmin', [
        ["nombre", nombre],
        ["clave", clave]
    ]);
    console.log(respuesta);
    if (respuesta.estado != true) {
        alert("Mal");
    } else {
        window.location.replace("/no-zero/");
    }
    return false;

}