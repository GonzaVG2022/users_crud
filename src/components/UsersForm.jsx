import { useForm } from "react-hook-form"
import { useEffect } from "react"
import "/src/assets/styles/UsersForm.css";

const UserForm = ( {getUpUser, getUpUserUpdated, getUpFieldsCleaned, selectedUser} ) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const getFormData = data => {
        if(selectedUser) {
            getUpUserUpdated(data)
            resetForm()
        } else {
            getUpUser(data)
            resetForm()
        }
    }

    useEffect( () => {
        if(selectedUser) {
            reset(selectedUser)
        } 
    }, [selectedUser] )

    const resetForm = () => {
        reset(
            {
                first_name: "",
                last_name: "",
                email: '',
                password: '',
                birthday:""
            }
            
            
        )
        getUpFieldsCleaned()
    }

    return (
        <div>
            <form onSubmit={ handleSubmit(getFormData) }>
                <div>
                    <label htmlFor="first_name">Nombre del Usuario: </label><input
                    type="text"
                    id="first_name"
                    { ...register("first_name", {
                        required : true
                    }) }
                    />
                </div>
                <div>
                <label htmlFor="last_name">Apellido del Usuario: </label><input
                    type="text"
                    id="last_name"
                    { ...register("last_name", {
                        required : true
                    }) }
                    />
                </div>
                <div>
                <label htmlFor="email">email: </label><input
                    type="email"
                    id="email"
                    { ...register("email", {
                        required : true
                    }) }
                    />
                </div>
                <div>
                <label htmlFor="password">contraseña: </label><input
                    type="text"
                    id="password"
                    { ...register("password", {
                        required : true
                    }) }
                    />
                </div>
                <div>
                <label htmlFor="birthday">Fecha de nacimiento </label><input
                    type="date"
                    id="birthday"
                    { ...register("birthday", {
                        required : true
                    }) }
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default UserForm
