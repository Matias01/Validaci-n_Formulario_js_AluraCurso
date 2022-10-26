export function validar(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "El campo password no puede estar vacío",
        patternMismatch: 
            "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, otra mayúscula y un número, sin caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es xxxxxxxxxx 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe tener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe tener entre 10 y 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La provincia debe tener entre 10 y 40 caracteres"
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input) {
    let mensaje = '';
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            console.log(error)
            console.log(mensajesDeError[tipoDeInput][error])
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })

    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
        
    return diferenciaFechas <= fechaActual;
}