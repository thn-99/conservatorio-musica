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
                    <span>${textNotAMember} </span><a href="register.html">${textRegister}</a>
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
    if (respuesta.estado != true) {
        alert("Mal");
    } else {
        window.location.replace("/");
    }
    return false;

}