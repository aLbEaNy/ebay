import "./Registro.css";
import { useState } from "react"; //hook para manejar el estado del componente

function Registro() {
  //1º props componente
  let formOk = false;
  //console.log

  //let { username, password }=props;

  //2º state componente
  //TODO ... voy a crear en el state del componente un UNICO OBJETO para recoger y validar todos los campos del formulario:
  //!     - este objeto tiene como propiedades los CAMPOS DEL FORMULARIO: nombre, apellidos, email, password
  //!     - dentro de cada propiedad voy a meter un objeto q represente valores del campo del input del formulario:
  //!             - valor caja de texto, validaciones, mensaje de error a mostrar, estado de validacion
  const [formData, setFormData] = useState({
    nombre: {
      //? <---------- propiedad q se mapea contra campo input-nombre
      valor: "", // <------ propiedad de "nombre" a modificar en evento onChange del input
      valido: false, // <--propiedad de "nombre" q define estado de validacion del contenido del input-nombre
      validaciones: {
        // <-- propiedad de "nombre" con las validaciones a hacer sobre el input-nombre
        obligatorio: [true, "* Nombre obligatorio"],
        maximaLongitud: [150, "* Nombre no debe exceder de 150 cars."],
        patron: [
          /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
          "* Formato invalido nombre, ej: Nuria Roca",
        ],
      },
      mensajeValidacion: "", //<-- propiedad de "nombre" con el mensaje de error procedente de las validaciones a hacer sobre input-nombre
    },
    apellidos: {
      //? <---------- propiedad q se mapea contra campo input-apellidos
      valor: "",
      valido: false,
      validaciones: {
        obligatorio: [true, "* Apellidos obligatorios"],
        maximaLongitud: [250, "* Apellidos no debe exceder de 250 cars."],
        patron: [
          /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
          "* Formato invalido apellidos, ej: Nuria Roca",
        ],
      },
      mensajeValidacion: "",
    },
    email: {
      //? <---------- propiedad q se mapea contra campo input-email
      valor: "",
      valido: false,
      validaciones: {
        obligatorio: [true, "* Email obligatorios"],
        patron: [
          /^.+@(hotmail|gmail|yahoo|msn)\.[a-z]{2,3}$/i,
          "* Formato invalido email, ej: mio@hotmail.es",
        ],
      },
      mensajeValidacion: "",
    },
    password: {
      //? <---------- propiedad q se mapea contra campo input-password
      valor: "",
      valido: false,
      validaciones: {
        obligatorio: [true, "* Pasword obligatorio"],
        patron: [
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
          "* Formato invalido Debe tener al menos 8 caracteres, una mayúscula, minúscula, número y un símbolo @#$!%*?&",
        ],
      },
      mensajeValidacion: "",
    },
  });

  //3º codigo funcional javascript (hooks, tratamiento eventos, ...)

  function ManejarSubmitForm(ev) {
    ev.preventDefault(); //anula el comportamiento por defecto del submitform, envio de datos...
  }

  function validaCajasHandler(ev) {
    const campo = ev.target.name;
    const valorCampo = ev.target.value;
    console.log("Has perdido el foco de... ", campo, valorCampo);
    const validacionesHacer = formData[campo].validaciones;
    let msj = "";
    let _valido = false;

    if (validacionesHacer.obligatorio[0] && !valorCampo) {
      msj = validacionesHacer.obligatorio[1];
    } else if (
      validacionesHacer.maximaLongitud &&
      valorCampo.length > validacionesHacer.maximaLongitud[0]
    ) {
      msj = validacionesHacer.maximaLongitud[1];
    } else if (!validacionesHacer.patron[0].test(valorCampo)) {
      msj = validacionesHacer.patron[1];
    } else _valido = true;

    console.log(msj);

    // Actualizo state para msj
    setFormData({
      ...formData,
      [campo]: { ...formData[campo], mensajeValidacion: msj, valido: _valido },
    });

    // comprubo si el formulario es valido

    console.log(_valido);
    console.log(
      formData.nombre.valido,
      formData.apellidos.valido,
      formData.email.valido,
      formData.password.valido
    );
  }

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
                  id="txtNombre"
                  name="nombre"
                  className="form-control form-element"
                  placeholder="Nombre"
                  onChange={(ev) =>
                    setFormData({
                      ...formData,
                      nombre: { ...formData.nombre, valor: ev.target.value }
                    })
                  }
                  onBlur={validaCajasHandler}
                />
                <span className="text-danger">
                  {" "}
                  {formData.nombre.mensajeValidacion}{" "}
                </span>
                <label htmlFor="txtNombre" className="floating-label">
                  Nombre
                </label>
              </div>
              <div className="col mb-3 form-floating">
                <input
                  type="text"
                  id="txtApellidos"
                  name="apellidos"
                  className="form-control form-element"
                  placeholder="Apellidos"
                  onChange={(ev) =>
                    setFormData({
                      ...formData,
                      apellidos: {
                        ...formData.apellidos,
                        valor: ev.target.value,
                      },
                    })
                  }
                  onBlur={validaCajasHandler}
                />
                <span className="text-danger">
                  {" "}
                  {formData.apellidos.mensajeValidacion}{" "}
                </span>

                <label htmlFor="txtApellidos" className="floating-label">
                  Apellidos
                </label>
              </div>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="email"
                id="txtEmail"
                name="email"
                className="form-control form-element"
                placeholder="Correo electrónico"
                onChange={(ev) =>
                  setFormData({
                    ...formData,
                    email: { ...formData.email, valor: ev.target.value },
                  })
                }
                onBlur={validaCajasHandler}
              />
              <span className="text-danger">
                {" "}
                {formData.email.mensajeValidacion}{" "}
              </span>

              <label htmlFor="txtEmail" className="floating-label">
                Correo Electronico
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="password"
                id="txtPassword"
                name="password"
                className="form-control form-element"
                placeholder="Contraseña"
                onChange={(ev) =>
                  setFormData({
                    ...formData,
                    password: { ...formData.password, valor: ev.target.value },
                  })
                }
                onBlur={validaCajasHandler}
              />
              <span className="text-danger">
                {" "}
                {formData.password.mensajeValidacion}{" "}
              </span>
              <label htmlFor="txtPassword" className="floating-label">
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
              disabled={
                !(
                  formData.nombre.valido &&
                  formData.apellidos.valido &&
                  formData.email.valido &&
                  formData.password.valido
                )
              }
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
