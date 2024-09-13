import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from '../services/blogs'

// Retrieving the blogs using Query
export const useBlogs = () => {
    return useQuery('blogs', blogService.getAll)
}

export const useCreateBlog = () => {
    const queryClient = useQueryClient()
    return useMutation(blogService.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs') // for refreshing the bloglist after addition
        }
    })
}

export const useUpdateBlog = () => {
    const queryClient = useQueryClient()
    return useMutation(blogService.update, {
        onSuccess: ()=>{
            queryClient.invalidateQueries('blogs')
        }
    })
}

export const useDeleteBlog = () => {
    const queryClient = useQueryClient()
    return useMutation(blogService.remove, {
        onSuccess: ()=>{
            queryClient.invalidateQueries('blogs')
        }
    })
}