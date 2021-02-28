navbar();

    let passForm = `
    <div class="row mb-4">
    <div class="col-sm-12 d-flex justify-content-center">
        <h2>Master Login</h2>
    </div>
</div>

<div>
    <div class="form-row justify-content-center mb-4">
        <div class="col-sm-4">
        <label for="clave">Contraseña Antigua</label>
            <input type="password" class="form-control" placeholder="Name"  id="oldPass">

        </div>
    </div>
    <div class="form-row justify-content-center mb-4">
        <div class="col-sm-4">
        <label for="clave">Contraseña nueva</label>
            <input type="password" class="form-control" placeholder="${textPassw}" id="newPass">
        </div>
    </div>

    <div class="form-row justify-content-center mb-4">
    <div class="col-sm-4">
    <label for="clave">Repetir Contraseña nueva</label>
        <input type="password" class="form-control" placeholder="${textPassw}" id="newPass2">
    </div>
</div>


    <div class="row mb-2 justify-content-center">
            <button class="col-sm-2 btn btn-info" onclick="changePass()">${textSignIn}</button>
        
    </div>

</div>
`;

document.getElementById("app").innerHTML = passForm;


function changePass() {
let oldPass = document.getElementById("oldPass").value;
let newPass = document.getElementById("newPass").value;
let newPass2 = document.getElementById("newPass2").value;
let respuesta;
if(newPass!=newPass2){
    alert("Tus contraseñas no coinciden")

}else{
    if(newPass!=oldPass){
        respuesta= serverController('changePass', [
            ["oldPass", oldPass],
            ["newPass", newPass]
            ]);
    }else{
        alert("Tu contraseña es la misma que la antigua");
    }
}

console.log(respuesta);
if (respuesta.estado != true) {
    window.location.replace("/");
} else {
    alert(respuesta.mensaje);
}
return false;

}