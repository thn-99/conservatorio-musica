function serverController(funcion, postArray) {
    //postArray es de la forma: [nombre,valor],[nombre,valor]
    let xhttp = new XMLHttpRequest();
    let devol;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            devol = this.responseText;
        }
    };
    xhttp.open("POST", "controladora.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let postMessage = "funcion=" + funcion;

    if (postArray) {
        postArray.forEach(element => {
            postMessage += "&" + element[0] + "=" + element[1];
        });
    }
    xhttp.send(postMessage);
    console.log(devol);
    return devol;
}