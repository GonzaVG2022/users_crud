import "/src/assets/styles/User.css"; 
                   
        const User = ({user, getUpPrepareDelete, getUpPrepareUpdate}) => { 
            
                   return(
                   <li >
                        <h4><span>Nombre del Usuario:</span> {user.first_name} </h4>
                        <h4><span>Apellido del Usuario:</span> {user.last_name}</h4>
                        <h4><span>email:</span> {user.email}</h4>
                        <h4><span>password:</span>{user.password}</h4>
                        <h4><span>birthday:</span> {user.birthday}</h4>

                        <button className="btn-delete" onClick={ () => getUpPrepareDelete(user.id) }>Eliminar</button>
                        <button className="btn-edit" onClick={ () => getUpPrepareUpdate(user.id) } >Editar</button>
                       
                    </li>
                    ) 
}
export default User
