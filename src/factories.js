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

const createUser = (name, socketID)=>(
	{
		id:uuidv4(),
		name: name,
		socketID: socketID
		
	}
)



module.exports = {
    createUser
}