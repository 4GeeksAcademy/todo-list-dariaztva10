import React, {useState} from "react";
import Header from "./header";

import Notas from "./notas";

//create your first component
const App = () => {
	
	return (

		<div className="container">

			<Header />
			<Notas />
			
			
		</div>
	);
};



export default App;