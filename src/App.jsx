import { useState } from 'react'
import './App.css';
import GhostBtn from './componentes/ghostBtn';
import { useEffect } from 'react';
import ToolTip from './componentes/ToolTip';

function App() {
  const [resultado, setResultado] = useState(null);
  const [calificaciones, setCalificaciones] = useState({primer: '', segundo: ''});
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(true);
  const [claseBotones, setClaseBotones] = useState("ghostBtnDisabled");

  function guardarDatos({target}){
    const {name, value} = target;
    setCalificaciones({
      ...calificaciones, 
      [name]: value
    });
  }

  useEffect(()=> {
    console.log(calificaciones)
    if (calificaciones.primer == '' || calificaciones.segundo == ''){
      setBotonesDeshabilitados(true);
      setClaseBotones("ghostBtnDisabled");
    }else{
      setBotonesDeshabilitados(false);
      setClaseBotones("ghostBtn");
    }
  }, [calificaciones]);

  function obtenerResultado(primerParcial, segundoParcial, tercerParcial){
    let calificacionAcumulada = 0;
    calificacionAcumulada = calificacionAcumulada + ((calificaciones.primer)*primerParcial) + ((calificaciones.segundo)*segundoParcial);
    let calificacionFaltante = 69.6 - calificacionAcumulada;
    calificacionFaltante = Math.ceil(calificacionFaltante / tercerParcial);
    return calificacionFaltante;
  }

  function ponderacionA(event){
    event.preventDefault();
    setResultado(obtenerResultado(0.20, 0.35, 0.45));
  }

  function ponderacionB(event){
    event.preventDefault();
    setResultado(obtenerResultado(0.15, 0.35, 0.50));
  }

  function ponderacionC(event){
    event.preventDefault();
    setResultado(obtenerResultado(0.33, 0.33, 0.34));
  }

  return (
    <>
      <div className='formulario'>
        <h1>Calculadora de calificación mínima.</h1>
        <p>Bienvenido/a. Esta es una calculadora para que evalues cuál es la calificación mínima que necesitas en el tercer parcial. Se toman en cuenta las ponderaciones del CETI.</p>
        <p> </p>
        <label htmlFor="">Calificación del primer parcial</label>
        <input name='primer' type='text' placeholder='70' onChange={guardarDatos}/>
        <label htmlFor="">Calificación del segundo parcial</label>
        <input name='segundo' type='text' placeholder='70' onChange={guardarDatos}/>
        <label htmlFor="">Elige la ponderación de la materia</label>
        <div className='contenedorBtns'>
        {botonesDeshabilitados ? (
            <>
              <ToolTip text="Los botones están deshabilitados hasta que se rellenen ambos formularios del campo." children={<GhostBtn contenido="Ponderación A" clase={claseBotones} onClick={ponderacionA} enabled={botonesDeshabilitados}/>}/>
              <ToolTip text="Los botones están deshabilitados hasta que se rellenen ambos formularios del campo." children={<GhostBtn contenido="Ponderación B" clase={claseBotones} onClick={ponderacionB} enabled={botonesDeshabilitados}/>}/>
              <ToolTip text="Los botones están deshabilitados hasta que se rellenen ambos formularios del campo." children={<GhostBtn contenido="Ponderación C" clase={claseBotones} onClick={ponderacionC} enabled={botonesDeshabilitados}/>}/>
            </>
          ) : (
            <>
              <GhostBtn contenido="Ponderación A" clase={claseBotones} onClick={ponderacionA} enabled={botonesDeshabilitados} />
              <GhostBtn contenido="Ponderación B" clase={claseBotones} onClick={ponderacionB} enabled={botonesDeshabilitados} />
              <GhostBtn contenido="Ponderación C" clase={claseBotones} onClick={ponderacionC} enabled={botonesDeshabilitados} />
            </>
          )}
        </div>
        <p className='small'>Ponderación A: 1er parcial 20%, 2do parcial 35%, 3er parcial 45%</p>
        <p className='small'>Ponderación B: 1er parcial 15%, 2do parcial 35%, 3er parcial 50%</p>
        <p className='small'>Ponderación C: 1er parcial 33%, 2do parcial 33%, 3er parcial 34%</p>
        {resultado !== null ? (
          resultado <= 100 ? (
            <h2>
              La calificación mínima que necesitas es {resultado}
            </h2>
          ) : (
            <h2>
              La calificación que necesitas es superior a 100 :(
            </h2>
          )
        ) : (
          <h2>
            La calificación mínima que necesitas está pendiente de calcular
          </h2>
        )}
      </div>
    </>
  )
}

export default App
