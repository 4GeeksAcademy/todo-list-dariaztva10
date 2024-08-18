import React, { useEffect, useState } from "react";

const CrearUsuario = () => {
    
    const [error, setError] = useState("");
    const username = "dariaztva";
    const url = `https://playground.4geeks.com/todo/users/${username}`;

    // useEffect se ejecuta una vez cuando el componente se monta, llamando a adminUsuario.
    useEffect(() => {
        adminUsuario(); 
    }, []); // [] asegura que esto solo se ejecute una vez cuando el componente se carga.

    // Función asíncrona que administra al usuario: verifica si existe o lo crea si no existe.
    const adminUsuario = async () => {
        try {
            // Intento obtener el usuario con una solicitud GET.
            let response = await fetch(url);
            //Si el usuario no existe...
            if (!response.ok) {
                console.log("No se pudo encontrar el usuario. Intentando crear uno nuevo...");
                // Guardamos el error si no se pudo encontrar el usuario.
                setError("No se pudo encontrar el usuario. Intentando crear uno nuevo...");

                // Nueva solicitud POST para crear el usuario.
                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify([]) // Enviamos un array vacío como cuerpo de la solicitud.
                });
                // Si la creación del usuario también falla, guardar el mensaje de error y terminar.
                if (!response.ok) {
                    console.log("No se pudo crear el usuario.");
                    setError("No se pudo crear el usuario.");
                    return; // Detener la ejecución si hay un problema al crear el usuario.
                }

                // Llego a este punto, el usuario se habría creado sin problema, así que limpiamos cualquier error.
                setError("");
            }

            // En caso de exito, llamar a onUserReady para indicar que el usuario está listo.
            

        } catch (error) {
            // Si ocurre un error durante la verificación o creación:
            console.error("Error al manejar el usuario:", error);
            setError("Hubo un problema al verificar o crear el usuario."); // Guardar así un mensaje de error.
        }
    };
    return (
        <div className="crear-usuario">
            <p>Preparando el usuario "dariaztva"...</p>
            {/* Si hay un error, mostrar el mensaje en rojo en la pantalla. */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};
export default CrearUsuario;