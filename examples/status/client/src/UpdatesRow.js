import { Box, Text } from "@chakra-ui/react"
import { useTheme } from "@emotion/react"
import useSWR from "swr"
import { apiClient } from "./api"
import { UpdatedAt } from "./UpdatedAt"
import { getStatusColor } from "./utils"

export const UpdatesRow = ({ incident }) => {
    const theme = useTheme()
    const { data } = useSWR(`incidents/${incident?.incidentId}/updates`, (url) => apiClient({ url }))
    const updates = data?.updates
    
    return (

        <Box borderLeftWidth="1px" borderLeftColor="grey"  transform="translateY(10px)">
            {updates?.sort((a, b) => b.updateCreatedAt - a.updateCreatedAt)
                .map(update => (
                    <Box key={update.updateId} paddingLeft="20px" marginBottom="10px" position="relative" transform="translateY(-10px)">
                        <Box width="10px" height="10px" position="absolute" left="-5px" top="8px" borderRadius="50%" backgroundColor={getStatusColor(update.affectedServicesStatus, theme.colors)} />
                        <Box >
                            <Text >{update.updateDescription}</Text>
                            <UpdatedAt updatedAt={update.updateUpdatedAt} createdAt={update.updateCreatedAt} />
                        </Box>
                    </Box>
                ))}
        </Box>
    )
}