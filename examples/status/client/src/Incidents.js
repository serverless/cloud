import {
    Box,
    Heading,
    HStack,
    ListItem,
    Grid,
    VStack,
    Button,
    UnorderedList,
    Skeleton,
    Select,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import useSWR from "swr";
import { apiClient } from "./api";
import { IncidentDrawer } from "./IncidentDrawer";

import { Resource } from "./Resource";
import { Status } from "./Status";
import { UpdatedAt } from "./UpdatedAt";
import { UpdatesRow } from "./UpdatesRow";
import { getStatusColor } from "./utils";

export const Incidents = () => {
    const theme = useTheme();

    const [selectedIncident, setSelectedIncident] = useState(null);
    const [filterIncidents, setFilterIncidents] = useState("");
    const { data } = useSWR("services", (url) => apiClient({ url }));
    const services = data?.services;
    const [storedPassword] = useLocalStorage('serverless-status', '');
    const isLoggedIn = !!storedPassword
    return (
        <Box mt={"30px"}>
            <HStack spacing="24px" justifyContent="space-between">
                <Heading size="lg">Incidents</Heading>
                <HStack>
                    <Select
                        maxW="120px"
                        placeholder="All"
                        value={filterIncidents}
                        onChange={(e) => setFilterIncidents(e.target.value)}
                    >
                        <option value="Investigating">Investigating</option>
                        <option value="Identified">Identified</option>
                        <option value="Monitoring">Monitoring</option>
                        <option value="Resolved">Resolved</option>
                    </Select>
                    {isLoggedIn &&

                        <Button
                            onClick={() => setSelectedIncident({})}
                            colorScheme="brand"
                            color="#fff"
                        >
                            New Incident
                        </Button>
                    }
                </HStack>
            </HStack>

            <Resource
                path={`incidents${filterIncidents ? `?incidentStatus=${filterIncidents}` : ``
                    }`}
                render={(props) => (
                    <VStack alignItems="flex-start" mt={25} spacing="24px">
                        {isLoggedIn && <IncidentDrawer
                            services={services}
                            selectedIncident={selectedIncident}
                            setSelectedIncident={setSelectedIncident}
                            addIncident={props.addResource}
                            loadingAdd={props.loadingAdd}
                            deleteIncident={props.deleteResource}
                            loadingDelete={props.loadingDelete}
                        />}

                        {props.loading ? (
                            <>
                                <Skeleton height="125px" width="100%" startColor="grey.700" endColor="grey.800" />
                                <Skeleton height="125px" width="100%" startColor="grey.700" endColor="grey.800" />
                                <Skeleton height="125px" width="100%" startColor="grey.700" endColor="grey.800" />
                            </>
                        ) : (
                            props?.data?.incidents
                                ?.sort((a, b) => b.incidentCreatedAt - a.incidentCreatedAt)
                                .map((incident) => (
                                    <Box
                                        onClick={() => {
                                            if (isLoggedIn) {

                                                setSelectedIncident(incident);
                                            }
                                        }}
                                        css={{
                                            transition: "all .3s ease-in-out",
                                            "&:hover": {
                                                backgroundColor: '#1D1D1D',
                                            },
                                        }}
                                        key={incident?.incidentId}
                                        spacing={8}
                                        width="100%"
                                        p={5}
                                        minH="210px"
                                        shadow="md"
                                        borderWidth="1px"
                                        borderRadius="md"
                                        flex="1"
                                        borderLeftColor={getStatusColor(
                                            incident.incidentStatus,
                                            theme.colors
                                        )}
                                        borderLeftWidth="5px"
                                        cursor="pointer"
                                    >
                                        <Grid templateColumns="2fr 1fr" gap={10}>
                                            <VStack alignItems="flex-start">
                                                <HStack>
                                                    <Heading as="h2" size="md">
                                                        {incident.incidentName}
                                                    </Heading>
                                                    <UpdatedAt
                                                        updatedAt={incident.incidentUpdatedAt}
                                                        createdAt={incident.incidentCreatedAt}
                                                    />
                                                </HStack>
                                                <Heading
                                                    as="h5"
                                                    size="sm"
                                                    fontWeight="normal"
                                                    color="grey"
                                                >
                                                    {incident.incidentDescription}
                                                </Heading>
                                                <UpdatesRow incident={incident} />
                                            </VStack>
                                            <VStack alignItems="flex-start">
                                                <Heading as="h5" size="sm" color="grey">
                                                    Incident Status
                                                </Heading>

                                                <Status status={incident.incidentStatus} />
                                                <Heading as="h5" size="sm" color="grey">
                                                    Affected Services
                                                </Heading>
                                                <UnorderedList
                                                    style={{
                                                        marginLeft: "20px",
                                                    }}
                                                >
                                                    {services
                                                        ?.filter((service) =>
                                                            incident.affectedServicesIds.includes(
                                                                service.serviceId
                                                            )
                                                        )
                                                        .map((service) => (
                                                            <ListItem key={service.serviceId}>
                                                                {service.serviceName}
                                                            </ListItem>
                                                        ))}
                                                </UnorderedList>
                                            </VStack>
                                        </Grid>
                                    </Box>
                                ))
                        )}
                    </VStack>
                )}
            />
        </Box>
    );
};
