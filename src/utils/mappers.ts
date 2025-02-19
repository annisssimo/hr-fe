import { AuthenticatedUser } from "../redux/userSlice/userSlice";
import { User } from "../services/users.api";

export const mapUserToAuthenticatedUser = (user: User): AuthenticatedUser => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    managerId: null,
    avatar: null,
    role: user.role
})