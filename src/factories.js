const uuidv4 = require('uuid/v4');



//Create a user with a unique id
// const createUser = (name = "") => {
//     return(
//         {
//             id:uuidv4(),
//             name
//         }
//     )
// }

const createUser = ({name = ""} = {})=>(
	{
		id:uuidv4(),
		name
		
	}
)



module.exports = {
    createUser
}