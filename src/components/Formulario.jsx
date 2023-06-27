import {useState, useEffect, Children} from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  //Aqui siempre se declaran los estados del componente
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  },[paciente])

  const generarId = ()=> {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random +  fecha;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if( [nombre, propietario, email, fecha, sintomas].includes('') ){
      console.log('algun campo esta vacio...')
      setError(true);
      return;
    }
    setError(false)
    //setPacientes(nombre)
    //Objeto de paciente
    const objPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }
    if(paciente.id){
      //Editando el registro
      objPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objPaciente : pacienteState )
      setPacientes(pacientesActualizados)
      setPaciente({})
    }else{
      //Nuevo registro
      objPaciente.id = generarId();
      setPacientes([...pacientes, objPaciente]);
    }

    //Reiniciar formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">Añade pacientes y {' '} <span className="text-indigo-600 font-bold">Administralos</span></p>        
        <form action="" className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={ handleSubmit }>
          {/* Forma de pasar propiedades y cacharlo en el otro componente como {Children} */}
          { error && <Error><p>Todos los campos son obligatorios</p></Error> }
          <div className="mb-4">
            <label htmlFor="nombre_mascota" className="block text-gray-700 uppercase font-bold">Nombre mascota</label>
            <input 
              id="nombre_mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md " 
              type="text" 
              placeholder="Nombre de la mascota" 
              value={nombre} 
              onChange={ (e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nombre_propietario" className="block text-gray-700 uppercase font-bold">Nombre del propietario</label>
            <input id="nombre_propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md " type="text" 
            placeholder="Nombre del propietario" 
            value={propietario} 
            onChange={ (e) => setPropietario(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
            <input id="email" type="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md " 
            placeholder="Email contacto propietario" 
            value={email} 
            onChange={ (e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
            <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
            value={fecha} 
            onChange={ (e) => setFecha(e.target.value)}/>
          </div>
          
          <div className="mb-4">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
            <textarea name="" id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md " 
            placeholder="Describe los sintomas" cols="30" rows="5"
            value={sintomas} 
            onChange={ (e) => setSintomas(e.target.value)}></textarea>
          </div>

          <input type="submit" 
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
            value={paciente.id ? 'Editar registro' : 'Agregar registro'} />
        </form>
    </div>
  )
}

export default Formulario
