let en = {};
if(!localStorage.getItem('language')){
    localStorage.setItem('language','es');
}
let language = localStorage.getItem('language');
let textSignIn;
let textHome;
let textFgtPass;
let textNotAMember;
let textRegister;
let textMail;
let textPassw;
let textName;

switch(language){
    case 'en':
        textSignIn='Sign in';
        textHome='Home';
        textFgtPass='Forgon password?';
        textNotAMember='Not a member?';
        textRegister='Register';
        textMail='Email';
        textPassw='Password';
        textName='Name';
    break;

    case 'es':
        textName='Nombre';
        textSignIn='Iniciar Sesión';
        textHome='Casa';
        textFgtPass='Contaseña olvidada?';
        textNotAMember='No estas registrado?';
        textRegister='Registrate';
        textMail='Email';
        textPassw='Contaseña';
        textName='Nombre';

    break;
}


function setLanguageEs(){
    if(localStorage.getItem('language')!='es'){
        localStorage.setItem('language','es');
        location.reload();
    }
}

function setLanguageEn(){
    if(localStorage.getItem('language')!='en'){
        localStorage.setItem('language','en');
        location.reload();
    }
}