import { useQuery } from "@tanstack/react-query";
import userService from '../services/UserBlogs'

export const useUsers = () =>{
    return useQuery({
        queryKey: ['users'],
        queryFn: userService.getAllUsers,
    })
}