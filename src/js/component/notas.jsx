import React, { useState } from "react";

const Notas = () => {
    const [variableInput, setVariableInput] = useState("");
    const [listaTareas, setListaTareas] = useState([]);
    const [indiceEdicion, setIndiceEdicion] = useState(null);
    const [textoEdicion, setTextoEdicion] = useState("");

    const presionarTeclaEnter = (e) => {
        if (e.key === 'Enter') {
            setListaTareas([...listaTareas, variableInput]);
            setVariableInput("");
        }
    };

    const deleteItems = (index) => {
        const tareasActualizadas = listaTareas.filter((_, indiceTareas) => indiceTareas !== index);
        setListaTareas(tareasActualizadas);
    };

    const editarTexto = (index) => {
        setIndiceEdicion(index);
        setTextoEdicion(listaTareas[index]);
    };

    const guardarEdicion = (index) => {
        const tareasActualizadas = listaTareas.map((tarea, indiceTareas) => 
            indiceTareas === index ? textoEdicion : tarea
        );
        setListaTareas(tareasActualizadas);
        setIndiceEdicion(null);
        setTextoEdicion("");
    };

    return (
        <div className="containerPrincipal row">
            <input
                className="formularioTareasInput row-12"
                type="text"
                onChange={(e) => setVariableInput(e.target.value)}
                onKeyDown={presionarTeclaEnter}
                value={variableInput}
                placeholder="¿Qué vas a programar hoy?"
            />

            <ul className="listaNotasCompleto row-10">
                {listaTareas.map((value, index) => (
                    <li key={index} className="listaNotasUnoAUno row-9">
                        {indiceEdicion === index ? (
                            <input
                                type="text"
                                value={textoEdicion}
                                onChange={(e) => setTextoEdicion(e.target.value)}
                                onBlur={() => guardarEdicion(index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        guardarEdicion(index);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <>
                                <span>{value}</span>
                                <div className="iconosNota">
                                    <button
                                        className="botonEliminar"
                                        onClick={() => deleteItems(index)}
                                    >
                                        <i className="fas fa-trash-alt" />
                                    </button>
                                    <button
                                        className="botonEditar"
                                        onClick={() => editarTexto(index)}
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
                {listaTareas.length === 0 ? "Aún no has programado nada." : `¡Tienes ${listaTareas.length} pendientes!`}
            </div>
        </div>
    );
};

export default Notas;

//import React, { useState } from "react";





