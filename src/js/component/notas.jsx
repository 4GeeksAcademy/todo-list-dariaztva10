import React, { useState, useEffect } from "react";


const Notas = () => {
    // Estado para almacenar el valor del input
    const [variableInput, setVariableInput] = useState("");
    // Estado para almacenar la lista de tareas
    const [listaTareas, setListaTareas] = useState([]); // Inicializa como un array vacío
    // Estado para el índice de la tarea que se está editando
    const [indiceEdicion, setIndiceEdicion] = useState(null);
    // Estado para el texto de la tarea en edición
    const [textoEdicion, setTextoEdicion] = useState("");
    // Estado para manejar la carga de datos
    const [loading, setLoading] = useState(false);
    // Estado para manejar mensajes de error
    const [error, setError] = useState(null);


    // useEffect PARA CARGAR LAS TAREAS AL MONTAR EL COMPONENTE 
    useEffect(() => {
        cargarTareas(); // Llama a la función para cargar las tareas
    }, []); // La lista vacía indica que solo se ejecuta al montar el componente

    const cargarTareas = async () => {
        setLoading(true);  // Inicia el estado de carga
        setError(null);     // Limpia cualquier error previo
        try {
            // Fetch para obtener las tareas desde la API
            const res = await fetch("https://playground.4geeks.com/todo/users/dariaztva");
            const data = await res.json();
            setListaTareas(data.todos); // Actualiza el estado con las tareas obtenidas
        } catch (error) {
            setError("Error al obtener las tareas"); // Maneja el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // FUNCIÓN PARA AGREGAR NUEVA TAREA
    const agregarTarea = async (e) => {

        if (variableInput.trim() === "") return; // No agregar tareas vacías

        setLoading(true);  // Inicia el estado de carga 
        setError(null);     // Limpia cualquier error previo
        try {
            // Fetch para agregar una nueva tarea
            const res = await fetch("https://playground.4geeks.com/todo/todos/dariaztva", {
                method: "POST",
                body: JSON.stringify({
                    label: variableInput.trim(), // Etiqueta de la tarea
                    is_done: false  // La tarea no está completada
                }),
                headers: {
                    "Content-Type": "application/json" // Indicamos que el cuerpo de la solicitud es JSON
                }
            });
            const data = await res.json();
            setListaTareas([...listaTareas, data]); // Agrega la tarea a la lista
            setVariableInput(""); // Limpia el campo de entrada
        } catch (error) {
            setError("Error al agregar la tarea"); // Maneja el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // FUNCIÓN PARA EDITAR UNA TAREA EXISTENTE
    const editarTarea = async (tareaId) => {

        if (textoEdicion.trim() === "") return; // No actualizar con texto vacío

        setLoading(true);  // Inicia el estado de carga
        setError(null);     // Limpia cualquier error previo
        try {
            // Fetch para actualizar la tarea con el ID proporcionado
            const res = await fetch(`https://playground.4geeks.com/todo/todos/${tareaId}`, {
                method: "PUT",
                body: JSON.stringify({ //Información de documentación API
                    label: textoEdicion,
                    is_done: false
                }),
                headers: {
                    "Content-Type": "application/json" //indicar json
                }
            });

            const data = await res.json();
            setListaTareas(listaTareas.map(tarea => tarea.id === data.id ? data : tarea)); // Actualiza la tarea en la lista
        } catch (error) {
            setError("Error al editar la tarea"); // Maneja el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }

        setIndiceEdicion(null); // Finaliza la edición
        setTextoEdicion(""); // Limpia el texto de edición
    };

    //FUNCIÓN PARA ELIMINAR USUARIO Y ASÍ SE BORREN TODAS LAS TAREAS 
    const borrarTodasLasTareas = async () => {
        setLoading(true);  // Inicia el estado de carga
        setError(null);     // Limpia cualquier error previo
        try {
            // Fetch para eliminar las tareas con el ID proporcionado
            for (const tarea of listaTareas) {
                await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
                    method: "DELETE",
                });
            }
            //Deja la lista debtareas vacia en el estado
            setListaTareas([]);
            // Filtra la tarea eliminada de la lista

        } catch (error) {
            setError("Error al eliminar la tarea"); // Maneja el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }

    };

    // Manejar el evento de la tecla Enter en el campo de texto
    const presionarTeclaEnter = (e) => {
        if (e.key === 'Enter') {
            agregarTarea(e); // Llama a la función para agregar tarea
        }
    };

    // FUNCIÓN PARA ELIMINAR UNA TAREA
    const borrarTarea = async (index) => {
        const tareaId = listaTareas[index].id; // Obtiene el ID de la tarea a eliminar
        setLoading(true);  // Inicia el estado de carga
        setError(null);     // Limpia cualquier error previo
        try {
            // Fetch para eliminar la tarea con el ID proporcionado
            await fetch(`https://playground.4geeks.com/todo/todos/${tareaId}`, {
                method: "DELETE",
            });
            // Filtra la tarea eliminada de la lista
            const tareasActualizadas = listaTareas.filter((_, indice) => indice !== index);
            setListaTareas(tareasActualizadas);
        } catch (error) {
            setError("Error al eliminar la tarea"); // Maneja el error si ocurre
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // Preparar la tarea para su edición
    const editarTexto = (index) => {
        setIndiceEdicion(index); // Establece el índice de la tarea en edición
        setTextoEdicion(listaTareas[index].label); // Establece el texto de la tarea en edición
    };

    // Guardar los cambios de edición
    const guardarEdicion = () => {
        if (indiceEdicion !== null) {
            const tareaId = listaTareas[indiceEdicion].id; // Obtiene el ID de la tarea en edición
            editarTarea(tareaId); // Llama a la función para editar la tarea
        }
    };

    return (
        <div className="containerPrincipal row">
            <div className="boton row-12">
            <button
                type="button"
                className="btn btn-outline-warning row-12"
                onClick={borrarTodasLasTareas}  // Elimina el usuario al hacer click en eliminarUsuario 
            >Eliminar todas las tareas
            </button>
            </div>
            <input
                className="formularioTareasInput row-12"
                type="text"
                onChange={(e) => setVariableInput(e.target.value)} // Actualiza el estado del input
                onKeyDown={presionarTeclaEnter} // Maneja la tecla Enter
                value={variableInput} // Valor del input
                placeholder="¿Qué vas a programar hoy?" // Texto de marcador de posición
                disabled={loading} // Desactiva el campo si está cargando
            />

            <ul className="listaNotasCompleto row-10">
                {loading && <li>Cargando...</li>} {/* Muestra mensaje de carga si está cargando */}
                {error && <li className="error">{error}</li>} {/* Muestra mensaje de error si ocurre */}
                {listaTareas.map((tarea, index) => (
                    <li key={tarea.id} className="listaNotasUnoAUno row-9">
                        {indiceEdicion === index ? (
                            <input
                                type="text"
                                value={textoEdicion} // Valor del input en edición
                                onChange={(e) => setTextoEdicion(e.target.value)} // Actualiza el texto de edición
                                onBlur={() => guardarEdicion()} // Guarda la edición cuando se pierde el foco
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        guardarEdicion(); // Guarda la edición al presionar Enter
                                    }
                                }}
                                autoFocus // Enfoca automáticamente el input al ser editado
                                disabled={loading} // Desactiva el campo si está cargando
                            />
                        ) : (
                            <>
                                <span>{tarea.label}</span> {/* Muestra el texto de la tarea */}
                                <div className="iconosNota">
                                    <button
                                        className="botonEliminar"
                                        onClick={() => borrarTarea(index)} // Elimina la tarea al hacer clic
                                        disabled={loading} // Desactiva el botón si está cargando
                                    >
                                        <i className="fas fa-trash-alt" />
                                    </button>
                                    <button
                                        className="botonEditar"
                                        onClick={() => editarTexto(index)} // Prepara la tarea para edición al hacer clic
                                        disabled={loading} // Desactiva el botón si está cargando
                                    >
                                        Editar
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <div className="numeroDeNotas">
                {listaTareas.length === 0 ? "Aún no has programado nada." : `¡Tienes ${listaTareas.length} pendientes!`} {/* Mensaje basado en el número de tareas */}
            </div>

        </div>
    );
};

export default Notas;
