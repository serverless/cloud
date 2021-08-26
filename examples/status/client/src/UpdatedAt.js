import { Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

export const UpdatedAt = ({updatedAt, createdAt}) => {
    return (
        <Text color="grey" fontSize="xs">

        {createdAt !== updatedAt
            ? `Updated ${dayjs(updatedAt).fromNow()}`
            : `Created ${dayjs(createdAt).fromNow()}`}
        
    </Text>
    )
}