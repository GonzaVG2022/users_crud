

import User from "./User"
const UsersList = ({users, getUpPrepareUpdate, getUpPrepareDelete }) => {


    return(
        <ul>
            {
                users?.map( (user, index) => {
                    return <User key={`user-${index}`}
                    user={user}
                    getUpPrepareDelete={getUpPrepareDelete}
                    getUpPrepareUpdate={getUpPrepareUpdate}
                    />
                }
                ) 
            }
        </ul>
    )

}

export default UsersList