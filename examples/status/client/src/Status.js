import { Box, Tag, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import dayjs from 'dayjs';
import { getStatusColor } from './utils';
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

export const Status = ({status}) => {
    const theme = useTheme()
    return (
        <Tag>
        <Box
          width="10px"
          height="10px"
          style={{
            background: getStatusColor(status, theme.colors),
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <Text  fontSize="xs">

        {status}
        </Text>
      </Tag>
    )
}