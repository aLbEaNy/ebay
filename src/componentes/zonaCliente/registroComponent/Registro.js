import "./Registro.css";
import { useState } from "react"; //hook para manejar el estado del componente

function Registro() {
  //1º props componente
  //let { username, password }=props;

  //2º state componente
  let [campoCuenta, setCampoCuenta] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    formularioValido: false,
    esValido: {
      nombre: false,
      apellidos: false,
      email: false,
      password: false,
    },
    mensajeError: { nombre: "", apellidos: "", email: "", password: "" }
  });

  //3º codigo funcional javascript (hooks, tratamiento eventos, ...)

//#region VALIDAR CAMPOS
  //TODO validaciones:
  //! ----- nombre: rellenado, max.longitud de 150 caracteres, solo admite mays o mins y espacios
  //! ----- apellidos: rellenado, max.longitud de 250 caracteres, solo adminte mays o mins y espacios
  //! ----- email: formato email, dominios admitidos: gmail,hotmail,msn,yahoo
  //! ----- password: min 8 caracteres, una MAYS, una MINS, un digito y un simbolo raro

  function validaciones(ev) {
    //console.log("id es ", ev.target.id);
    //console.log("valor es ", ev.target.value);

    let valor = ev.target.value;
    let campo = ev.target.id; //id cambiado de txtNombre a nombre por comodidad para usar como parametro...
    let valido = false;
    let msgError = "";
    let todoValido = false;

    const regex = {
      nombre: /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      apellidos: /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      email: /^[A-Za-z].*@(gmail|hotmail|msn|yahoo)\..*/i,
      password:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
    };

    if (!valor) {
      msgError = "Campo obligatorio";
      actualizarState(campo, valor, valido, msgError, todoValido);
      return;
    }
    if (valor.length > 150) {
      msgError = "Máximo 150 caracteres";
      actualizarState(campo, valor, valido, msgError, todoValido);
      return;
    }

    switch (campo) {
      case "nombre":
        if (!regex[campo].test(valor)) {
          // [campo] es String como literal, pero por sintaxis no se pone regex.[campo]
          msgError = 'Formato incorrecto, ejem: "Maria Luisa"';
        } else {
          msgError = "";
          valido = true;
        }
        break;

      case "apellidos":
        if (!regex[campo].test(valor)) {
          msgError = 'Formato incorrecto, ejem: "Perez Gomez"';
        } else {
          msgError = "";
          valido = true;
        }
        break;
      case "email":
        if (!regex[campo].test(valor)) {
          msgError = "Sólo se admiten correos de gmail, hotmail, msn y yahoo";
        } else {
          msgError = "";
          valido = true;
        }
        break;
      case "password":
        if (!regex[campo].test(valor)) {
          console.log(valor);
          
          msgError =
            "Debe tener al menos 8 caracteres, una mayúscula, minúscula, número y un símbolo @#$!%*?&";
        } else {
          msgError = "";
          valido = true;
        }
        break;
      default:
        break;
    }
    todoValido = campoCuenta.esValido.nombre && campoCuenta.esValido.apellidos && campoCuenta.esValido.email && campoCuenta.esValido.password;
    console.log('Todos los campos son: ',todoValido);
    
    actualizarState(campo, valor, valido, msgError, todoValido);
  }
//#endregion VALIDAR CAMPOS

//#region ACTUALIZAR STATE
  function actualizarState(campo, valor, valido, msgError, todoValido) {
    setCampoCuenta((prevState) => ({
      // es aconsejable usar prevState al actulizar states por estabilidad
      ...prevState,
      [campo]: valor,
      formularioValido: todoValido,
      esValido: { ...prevState.esValido, [campo]: valido }, // valido true o false. campo es nombre o apellido o ....
      mensajeError: { ...prevState.mensajeError, [campo]: msgError },
    }));
  }
//#endregion ACTUALIZAR STATE

  function ManejarSubmitForm(ev) {
    ev.preventDefault(); //anula el comportamiento por defecto del submitform, envio de datos...
    // ----------antes de definir state ------------------------
    // cuenta.nombre=document.getElementById('nombre').value;
    // cuenta.apellidos=document.getElementById('apellidos').value;
    // cuenta.email=document.getElementById('email').value;
    // cuenta.password=document.getElementById('password').value;
    // let cuenta={ nombre,apellidos,email,password };
    // console.log('datos de cuenta a registrar...', cuenta);
  }

  //4º codigo JSX
  return (
    <div className="container">
      {/* fila donde va logo de ebay y link para el Login*/}
      <div className="row mt-4">
        <div className="col-2">
          <img src="/images/logo_ebay.png" alt="loge Ebay"></img>
        </div>
        <div className="col-6"></div>
        <div className="col-2">
          <span>¿Ya tienes una cuenta?</span>
        </div>
        <div className="col-2">
          <a href="/">Identificarse</a>
        </div>
      </div>

      {/* fila donde va imagen de registro y formulario, depdende tipo de cuenta, si es PERSONAL o EMPRESA*/}
      <div className="row mt-4">
        <div className="col-8">
          <img
            src="/images/imagen_registro_personal.jpg"
            alt="Registro Personal"
          ></img>
        </div>
        <div className="col-4">
          <form onSubmit={ManejarSubmitForm}>
            <div className="row">
              <h1 className="title">Crear una cuenta</h1>
            </div>
            <div className="row">
              <div className="col form-floating">
                <input
                  type="text"
                  id="nombre"
                  className="form-control form-element"
                  placeholder="Nombre"
                  onChange={(ev) => {
                    setCampoCuenta({ ...campoCuenta, nombre: ev.target.value });
                  }}
                  onBlur={validaciones}
                />
                {!campoCuenta.esValido.nombre && (
                  <span className="text-danger">
                    {" "}
                    {campoCuenta.mensajeError.nombre}{" "}
                  </span>
                )}
                <label htmlFor="nombre" className="floating-label">
                  Nombre
                </label>
              </div>
              <div className="col mb-3 form-floating">
                <input
                  type="text"
                  id="apellidos"
                  className="form-control form-element"
                  placeholder="Apellidos"
                  onChange={(ev) =>
                    setCampoCuenta({
                      ...campoCuenta,
                      apellidos: ev.target.value,
                    })
                  }
                  onBlur={validaciones}
                />
                {!campoCuenta.esValido.apellidos && (
                  <span className="text-danger">
                    {" "}
                    {campoCuenta.mensajeError.apellidos}{" "}
                  </span>
                )}
                <label htmlFor="apellidos" className="floating-label">
                  Apellidos
                </label>
              </div>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="email"
                id="email"
                className="form-control form-element"
                placeholder="Correo electrónico"
                onChange={(ev) =>
                  setCampoCuenta({
                    ...campoCuenta,
                    email: ev.target.value,
                  })
                }
                onBlur={validaciones}
              />
              {!campoCuenta.esValido.email && (
                  <span className="text-danger">
                    {" "}
                    {campoCuenta.mensajeError.email}{" "}
                  </span>
                )}
              <label htmlFor="email" className="floating-label">
                Correo Electronico
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="password"
                id="password"
                className="form-control form-element"
                placeholder="Contraseña"
                onChange={(ev) =>
                  setCampoCuenta({
                    ...campoCuenta,
                    password: ev.target.value,
                  })
                }
                onBlur={validaciones}
              />
              {!campoCuenta.esValido.password && (
                  <span className="text-danger">
                    {" "}
                    {campoCuenta.mensajeError.password}{" "}
                  </span>
                )}
              <label htmlFor="password" className="floating-label">
                Contraseña
              </label>
            </div>
            <div className="mb-3" style={{ maxWidth: "430px" }}>
              {/*** minicomponente para desuscribirse */}
              <p className="text-small">
                Te enviaremos correos electrónicos sobre ofertas relacionadas
                con nuestros servicios periódicamente. Puedes{" "}
                <a
                  href="/"
                  style={{ color: "#007bff", textDecoration: "underline" }}
                >
                  cancelar la suscripción
                </a>{" "}
                en cualquier momento.
              </p>
              <p className="text-small">
                Al seleccionar Crear cuenta personal, aceptas nuestras
                Condiciones de uso y reconoces haber leído nuestro Aviso de
                privacidad.
              </p>
            </div>
            <button
              type="submit"
              className="btn w-100 mb-3"
              disabled={campoCuenta.formularioValido ? false : true}
            >
              Crear cuenta personal
            </button>
            <div className="row mt-3 d-flex flex-row">
              <span className="separator-before"></span>
              <span className="text-small inseparator">o continua con</span>
              <span className="separator-after"></span>
            </div>
            <div className="row">
              <div className="col">
                <button className="btn redes" style={{ width: "100%" }}>
                  <i className="fa-brands fa-google"></i> Google
                </button>
              </div>
              <div className="col">
                <button className="btn redes" style={{ width: "100%" }}>
                  <i className="fa-brands fa-facebook"></i> Facebook
                </button>
              </div>
              <div className="col">
                <button className="btn redes" style={{ width: "100%" }}>
                  <i className="fa-brands fa-apple"></i> Apple
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;
