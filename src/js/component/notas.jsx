import React, { useState } from "react";




const Notas = () => {
	/*A continuación, una variable de estado: un array que recibe dos variables 
	(la variable que almacena el valor y la otra variable es una función set;
	requiere el nuevo valor del estado y  modifica el valor de la variable anteriormente mencionada)*/

	//La variable de estado cuando escribimos el input. Almacena lo que el usuario escribe en el campo de texto, que inicialmente es una cadena vacía
	const [variableInput, setVariableInput] = useState("");

	//Variable de estado para almacenar las nuevas tareas.
	const [listaTareas, setListaTareas] = useState([
	])

	const presionarTeclaEnter
		= (e) => {
			if (e.key === 'Enter') {
				setListaTareas([...listaTareas, variableInput]);
				setVariableInput("");
			}

		}
	const deleteItems = (index) => {
		const tareasActualizadas = listaTareas.filter((_, indiceTareas) => indiceTareas !== index)
		setListaTareas(tareasActualizadas);
	}

	return (

		<div className="containerPrincipal row">
			<input
				className="formularioTareasInput row-12"
				type="text"
				onChange={(e) => setVariableInput(e.target.value)}
				onKeyDown={(e) => {
					presionarTeclaEnter
						(e)
				}}
				value={variableInput}
				placeholder="¿Qué vas a programar hoy?"

			/>


			<ul className="listaNotasCompleto row-10">
				{listaTareas.map((value, index) => {
					return (
						<li key={index} className="listaNotasUnoAUno row-9">{value}
							<div className="iconosNota">
								<button
									className="botonEliminar"
									onClick={() => { deleteItems(index) }}
								>

									<i className="fas fa-trash-alt" />
								</button>
								<button
									className="botonEditar"
									onClick={() => { deleteItems(index) }}
								>

									Editar
								</button>
							</div>
						</li>
					)
				})
				}

			</ul>
			<div className="numeroDeNotas"> {listaTareas.length === 0 ? "Aún no has programado nada." : `¡Tienes ${listaTareas.length} pendientes!`}

			</div>
		</div>

	);
};





export default Notas;