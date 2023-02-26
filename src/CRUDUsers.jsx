import {
    useState,
    useEffect
} from "react";
import axios from "axios";
import UsersList from "./components/UsersList";
import UsersForm from "./components/UsersForm";
import Success from "./components/Success";
import Error from "./components/Error";
import "./assets/styles/CRUDUsers.css";

function CRUDUsers()
{
    // Esto manejo los datos de forma local
    let [users, setUsers] = useState([]);
    // la url base para todos los metodos http
    let [url, setUrl] = useState("http://localhost:8080/api/v1/users/");
    let [selectedUser, selectAUser] = useState(null);
    let [operation, setOperation] = useState(null);
    let [didOpOcurr, setDidOpOcurr] = useState(false);

    // Metodos http para comunicar con la API
    // Lee a todos los usuarios
	const getUsers = () => {
            axios.get(url)
		.then(res => setUsers(res?.data))// una vez leidos se almacenan en un estado local
		.catch(err => handleError(() => console.log(err), "Lectura de usuarios"));
	}

	// Lee a un solo usuario
	const getUser = id => {
            axios.get(`${url}${id}`)
		.then(res => res?.data)
		.catch(err => handleError(() => console.log(err), "Lectura del usuario"));
	}

	// Crea un nuevo usuario
	const createUser = user => {
            axios.post(url, user)
		.then(() => handleSuccess(() => getUsers(), "Creación del usuario"))
		.catch(err => handleError(() => console.log(err), "Creación del usuario"));
	}

	// Actualiza un usuario existente
	const updateUser = (id, updatedUser) => {
            axios.put(`${url}${id}/`, updatedUser)
		.then(() => handleSuccess(() => getUsers(url), "Actualización del usuario"))
		.catch(err => handleError(() => console.log(err), "Actualización del usuario"));
	}

	// Elimina un usuario existente
	const deleteUser = id => {
            axios.delete(`${url}${id}/`)
		.then(() => handleSuccess(() => getUsers(url), "Eliminación del usuario"))
		.catch(err => handleError(() => console.log(err), "Eliminación del usuario"));
	}
    
    useEffect(() => {
        getUsers(url); // cada vez que se abra la app se realiza una sola vez la lectura de los usuarios
    }, []);

    // cada vez que ocurra un toast, tiene un tiempo de vida de 3 segundos
    useEffect(() => {
        setTimeout(() => {
            setOperation(null);
	}, 1000);
    }, [didOpOcurr]);

    // manejador de operaciones exitosas
    const handleSuccess = (resolve, operationType) => {
        resolve();
	setDidOpOcurr(!didOpOcurr);
	setOperation(<Success operationType={operationType}/>);
    }

    // manejador de operaciones fallidas
    const handleError = (reject, operationType) => {
        reject();
	setDidOpOcurr(!didOpOcurr);
	setOperation(<Error operationType={operationType}/>);
    }

    const handleUser = user => {
        createUser(user); // actualiza el arreglo remoto de usuarios con un nuevo usuario
    }

    const handleUpdatedUser = user => {
        updateUser(user.id, user); // actualiza un usuario de los usuarios almacenados en remoto
    }

    const prepareToUpdate = id => {
	// prepara el usuario que se va a actualizar
        selectAUser(users.find(user => user.id === id)); 
    }

    return (
        <div id="crud-users">
	    <UsersForm
	        getUpUser={handleUser}
	        getUpUserUpdated={handleUpdatedUser}
	        getUpFieldsCleaned={() => selectAUser(null)}
	        selectedUser={selectedUser}
	    />
	    {operation}
	    {
                Boolean(users?.length) && <UsersList
                    getUpPrepareUpdate={prepareToUpdate}
		    getUpPrepareDelete={deleteUser}
		    users={users}
		/>
	    }
	</div>
    );
}

export default CRUDUsers;

