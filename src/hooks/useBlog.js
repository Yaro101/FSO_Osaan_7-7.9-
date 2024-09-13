import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from '../services/blogs'

const useBlog = () => {
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