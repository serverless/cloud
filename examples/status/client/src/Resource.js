
import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import useSWR, { mutate } from "swr"
import { apiClient } from "./api"

export const Resource = ({path, render}) => {
    const toast = useToast()
    const [loadingAdd, setLoadingAdd] = useState(null)
    const [loadingDelete, setLoadingDelete] = useState(null)
    const { data, error } = useSWR(path, (url) => apiClient({ url }))
    const loading = !data && !error
    
    
    const reload = () => mutate(path)
    const deleteResource = async (resourceId, next) => {
        try {
            setLoadingDelete(resourceId)
            await apiClient({
                url: `${path}/${resourceId}`, method: 'DELETE'
            })
            await reload()
            toast({
                title: `Item deleted successfully`,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            setLoadingDelete(null)
            if (next) {
                next()
            }
        } catch (e) {
            
            setLoadingDelete(null)
            toast({
                title: e.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }
    const addResource = async (resource, next) => {
        try {
            setLoadingAdd(true)
            await apiClient({
                url: `${path}`, method: 'PUT',
                body: JSON.stringify(resource)
            })
            await reload()
            setLoadingAdd(null)
            if (!resource?.serviceId && !resource.incidentId) {

                toast({
                    title: `Item created successfully`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            }
            if (next) {
                next()
            }
        } catch (e) {
            setLoadingAdd(null)
            toast({
                title: e.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }

    }
    return render({
        data,
        error,
        loading,
        reload,
        deleteResource,
        loadingDelete,
        addResource,
        loadingAdd
    })
}