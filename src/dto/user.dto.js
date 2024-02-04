export default class UserDTO {
    static getUserFrom = (user) =>{
        const userDto = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role
        }
        return userDto
    }
    static getUsersFrom = (user) =>{
        const dto = []
        user.forEach(u => {
            const users = {
                name: `${u.first_name} ${u.last_name}`,
                email: u.email,
                role: u.role
            }
            dto.push(users)
        });
        return dto
    }
}