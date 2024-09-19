import './Registro.css'
import { useState } from 'react'; //hook para manejar el estado del componente

function Registro(){
    //1º props componente
    //console.log('atributos del componente almacenado en objeto PROPS...', props);

    //let { username, password }=props;

    //2º state componente
    let cuenta={nombre:'', apellidos:'',email:'',password:''};

    let [ campoNombre, setCampoNombre ]=useState( { valor: cuenta.nombre, estadoValidacion: false, mensajeError:''} );
    
    let [ campoApellido, setCampoApellido ]=useState( { valor: cuenta.apellidos, estadoValidacion: false, mensajeError:''} );

    let [ campoEmail, setCampoEmail ]=useState( { valor: cuenta.email, estadoValidacion: false, mensajeError:''} );

    let [ campoPassword, setCampoPassword ]=useState( { valor: cuenta.password, estadoValidacion: false, mensajeError:''} );
    
//



    //3º codigo funcional javascript (hooks, tratamiento eventos, ...)
    //TODO validaciones:
    //! ----- nombre: rellenado, max.longitud de 150 caracteres, solo admite mays o mins y espacios
    //! ----- apellidos: rellenado, max.longitud de 250 caracteres, solo adminte mays o mins y espacios
    //! ----- email: formato email, dominios admitidos: gmail,hotmail,msn,yahoo
    //! ----- password: min 8 caracteres, una MAYS, una MINS, un digito y un simbolo raro

    function ValidaNombre(ev,n){
        // nombre.trim() === '' ? setEstadoValidacionNombre(false) : setEstadoValidacionNombre(true) ;
        // nombre.length > 150 ?   setEstadoValidacionNombre(false) : setEstadoValidacionNombre(true) ;
        // /^([A-Z][a-z]+\s*)+/.test(nombre) ? setEstadoValidacionNombre(true) : setEstadoValidacionNombre(false) ;
        let _estadoValidacionNombre=false;
        let _mensajeError='';
            
        if (campoNombre.valor.trim() !== '') { _estadoValidacionNombre=true; }  else  { _estadoValidacionNombre=false; _mensajeError='* Nombre obligatorio'; }
        if (campoNombre.valor.length <= 150) { _estadoValidacionNombre=true; }  else  { _estadoValidacionNombre=false; _mensajeError='* Nombre no debe exceder de 150 caract.'; }
        if (/^([A-Z][a-z]+\s*)+/.test(campoNombre.valor)) { _estadoValidacionNombre=true; }  else  { _estadoValidacionNombre=false; _mensajeError='* Formato invalido, ej: Pedro Pablo'; }

        
        if( _estadoValidacionNombre) {
            setCampoNombre({...campoNombre, estadoValidacion: true, mensajeError: ''});
        } else {
            setCampoNombre( {...campoNombre, estadoValidacion: false, mensajeError: _mensajeError} );
        }
    }

    function ManejarSubmitForm(ev){
        ev.preventDefault(); //anula el comportamiento por defecto del submitform, envio de datos...
        // ----------antes de definir state ------------------------
        // cuenta.nombre=document.getElementById('txtNombre').value;
        // cuenta.apellidos=document.getElementById('txtApellidos').value;
        // cuenta.email=document.getElementById('txtEmail').value;
        // cuenta.password=document.getElementById('txtPassword').value;
        // let cuenta={ nombre,apellidos,email,password };
        // console.log('datos de cuenta a registrar...', cuenta);

    }

    //4º codigo JSX
    return (        
        <div className='container'>
            { /* fila donde va logo de ebay y link para el Login*/ }
            <div className='row mt-4'>
                <div className='col-2'>
                    <img src='/images/logo_ebay.png' alt='loge Ebay'></img>
                </div>
                <div className='col-6'></div>
                <div className='col-2'>
                    <span>¿Ya tienes una cuenta?</span>
                </div>
                <div className='col-2'>
                    <a href="/">Identificarse</a>
                </div>
            </div>

            { /* fila donde va imagen de registro y formulario, depdende tipo de cuenta, si es PERSONAL o EMPRESA*/ }
            <div className='row mt-4'>
                <div className='col-8'><img src='/images/imagen_registro_personal.jpg' alt='Registro Personal'></img></div>
                <div className='col-4'>
                    <form onSubmit={ ManejarSubmitForm }  >
                        <div className='row'><h1 className='title'>Crear una cuenta</h1></div>
                        <div className="row">
                            <div className="col form-floating">
                                <input type="text"
                                       id='txtNombre'
                                       className="form-control form-element"
                                       placeholder="Nombre"
                                       onChange={ (ev,n) => {setCampoNombre( {...campoNombre, valor:ev.target.value}); n=true }}
                                       onBlur={ ValidaNombre }                                     
                                       />
                                { !campoNombre.estadoValidacion && <span className='text-danger'> { campoNombre.mensajeError } </span>}
                                <label htmlFor='txtNombre' className='floating-label'>Nombre</label>
                            </div>
                            <div className="col mb-3 form-floating">
                                <input type="text" 
                                       id='txtApellidos'
                                       className="form-control form-element"
                                       placeholder="Apellidos"
                                       onChange={ (ev) => setCampoApellido( {...campoApellido, valor:ev.target.value}) }                                  
                                        />
                                <label htmlFor='txtApellidos' className='floating-label'>Apellidos</label>
                            </div>
                        </div>
                        <div className="mb-3 form-floating">
                            <input type="email"
                                   id='txtEmail'
                                   className="form-control form-element"
                                   placeholder="Correo electrónico"
                                   onChange={ (ev) => setCampoEmail( {...campoEmail, valor:ev.target.value}) }                                  
                                  />
                            <label htmlFor='txtEmail' className='floating-label'>Correo Electronico</label>
                        </div>
                        <div className="mb-3 form-floating">
                            <input type="password"
                                   id='txtPassword'
                                   className="form-control form-element"
                                   placeholder="Contraseña"
                                   //onChange={ (ev)=>{ setPassword(ev.target.value); console.log('actualizando state nombre...', password); }}                                       
                                   />
                            <label htmlFor='txtPassword' className='floating-label'>Contraseña</label>
                        </div>
                        <div className="mb-3" style={{ maxWidth: "430px" }}>
                            {/*** minicomponente para desuscribirse */}
                            <p className="text-small">
                                Te enviaremos correos electrónicos sobre ofertas
                                relacionadas con nuestros servicios periódicamente. Puedes{" "}
                                <a href="/" style={{ color: "#007bff", textDecoration: "underline" }}>
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
                        <button type="submit" className="btn w-100 mb-3" disabled={ campoNombre.estadoValidacion ? false : true }>
                            Crear cuenta personal
                        </button>
                        <div className='row mt-3 d-flex flex-row'>
                            <span className='separator-before'></span>
                            <span className='text-small inseparator'>o continua con</span>
                            <span className='separator-after'></span>
                        </div>
                        <div className='row'>
                            <div className='col'><button className='btn redes' style={{width: '100%'}}><i className="fa-brands fa-google"></i> Google</button></div>
                            <div className='col'><button className='btn redes' style={{width: '100%'}}><i className="fa-brands fa-facebook"></i> Facebook</button></div>
                            <div className='col'><button className='btn redes' style={{width: '100%'}}><i className="fa-brands fa-apple"></i> Apple</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>       
    
    );
}

export default Registro;