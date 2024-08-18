import React, { useState } from "react";
import Header from "./header";
import CrearUsuario from "./CrearUsuario";
import Notas from "./notas";


//create your first component
const App = () => {

	return (

		<div className="container">

			<Header />
			<Notas />
			<CrearUsuario />


		</div>
	);
};



export default App;