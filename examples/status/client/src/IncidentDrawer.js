import { DeleteIcon } from "@chakra-ui/icons";
import {
    Button,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    VStack,
    Textarea,
    Checkbox,
    Grid,
    Box,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    DrawerCloseButton,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Divider,
    HStack,
    Spinner,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { apiClient } from "./api";

import { Resource } from "./Resource";
import { UpdatedAt } from "./UpdatedAt";

export const IncidentDrawer = ({
    selectedIncident,
    setSelectedIncident,
    addIncident,
    deleteIncident,
    loadingDelete,
    loadingAdd,
}) => {
    const [update, setUpdate] = useState({
        updateDescription: "",
        affectedServicesStatus: undefined,
        incidentStatus: selectedIncident?.incidentStatus,
    });
    const incidentStatus = useMemo(
        () => selectedIncident?.incidentStatus,
        [selectedIncident]
    );
    useEffect(() => {
        if (incidentStatus) {
            setUpdate((prev) => ({
                ...prev,
                incidentStatus,
            }));
        }
        return () => { };
    }, [incidentStatus, setUpdate]);
    const { data: servicesData } = useSWR("services", (url) =>
        apiClient({ url })
    );

    const services = servicesData
        ? servicesData.services.sort(
            (a, b) => b.serviceCreatedAt - a.serviceCreatedAt
        )
        : [];
    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
    } = useDisclosure();
    const {
        isOpen: isAlertOpen,
        onOpen: onAlertOpen,
        onClose: onAlertClose,
    } = useDisclosure();

    const addUpdateNext = () => {
        setUpdate({
            updateDescription: "",
            affectedServicesStatus: undefined,
            incidentStatus: selectedIncident?.incidentStatus,
        });
        
    };
    const deleteIncidentNext = () => {
        onAlertClose();
        handleDrawerClose();
    };
    useEffect(() => {
        if (selectedIncident) {
            onDrawerOpen();
        }
        return () => { };
    }, [selectedIncident, onDrawerOpen]);
    const handleDrawerClose = () => {
        onDrawerClose();
        setSelectedIncident(null);
    };

    const handleSaveIncident = async () => {
        addIncident(
            {
                ...selectedIncident,
                incidentStatus: selectedIncident?.incidentStatus || "Investigating",
            },
            handleDrawerClose
        );
    };

    return (
        <>
            <Drawer
                placement="right"
                onClose={handleDrawerClose}
                isOpen={isDrawerOpen}
                size="md"
                colorScheme="brand"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        <DrawerCloseButton margin="auto" />
                        {selectedIncident?.incidentName || "Create Incindent"}
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack spacing="24px">
                            <FormControl id="incidentName">
                                <FormLabel>Incident Name</FormLabel>
                                <Input
                                    placeholder="Incident Name"
                                    type="text"
                                    value={selectedIncident?.incidentName || ""}
                                    onChange={(e) =>
                                        setSelectedIncident((prev) => ({
                                            ...prev,
                                            incidentName: e.target.value,
                                        }))
                                    }
                                    onKeyUp={(event) => {
                                        if (event.key === "Enter") {
                                            handleSaveIncident();
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl id="incidentDescription">
                                <FormLabel>Incident Description</FormLabel>

                                <Textarea
                                    placeholder="Incident Description"
                                    value={selectedIncident?.incidentDescription || ""}
                                    onChange={(e) =>
                                        setSelectedIncident((prev) => ({
                                            ...prev,
                                            incidentDescription: e.target.value,
                                        }))
                                    }
                                    onKeyUp={(event) => {
                                        if (event.key === "Enter") {
                                            handleSaveIncident();
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormControl id="incidentStatus">
                                <FormLabel>Incident Status</FormLabel>

                                <Select
                                    placeholder="Investigating"
                                    value={selectedIncident?.incidentStatus || "Investigating"}
                                    onChange={(e) =>
                                        setSelectedIncident((prev) => ({
                                            ...prev,
                                            incidentStatus: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="Investigating">Investigating</option>
                                    <option value="Identified">Identified</option>
                                    <option value="Monitoring">Monitoring</option>
                                    <option value="Resolved">Resolved</option>
                                </Select>
                            </FormControl>
                            <FormControl id="affectedServicesIds">
                                <FormLabel>Affected Services</FormLabel>
                                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                                    {services &&
                                        services.map((service) => (
                                            <Box key={service.serviceId}>
                                                <Checkbox
                                                    isChecked={
                                                        !!selectedIncident?.affectedServicesIds?.find(
                                                            (id) => id === service.serviceId
                                                        )
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedIncident((prev) => ({
                                                            ...prev,
                                                            affectedServicesIds: e.target.checked
                                                                ? [
                                                                    ...(prev.affectedServicesIds || []),
                                                                    service.serviceId,
                                                                ]
                                                                : prev.affectedServicesIds?.filter(
                                                                    (id) => id !== service.serviceId
                                                                ),
                                                        }))
                                                    }
                                                >
                                                    {service.serviceName}
                                                </Checkbox>
                                            </Box>
                                        ))}
                                </Grid>
                            </FormControl>
                            {selectedIncident?.incidentId && (
                                <Resource
                                    path={`incidents/${selectedIncident?.incidentId}/updates`}
                                    render={(props) => (
                                        <Box
                                            width="100%"
                                            p={5}
                                            shadow="md"
                                            borderWidth="1px"
                                            borderRadius="md"
                                        >
                                            <VStack spacing="24px">
                                                <FormControl id="updateDescription">
                                                    <FormLabel>Update Description</FormLabel>

                                                    <Textarea
                                                        placeholder="Update Description"
                                                        value={update?.updateDescription || ""}
                                                        onChange={(e) =>
                                                            setUpdate((prev) => ({
                                                                ...prev,
                                                                updateDescription: e.target.value,
                                                            }))
                                                        }
                                                        onKeyUp={(event) => {
                                                            if (event.key === "Enter") {
                                                                props.addResource(update, addUpdateNext);
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl id="updateAffectedServicesStatus">
                                                    <FormLabel>Update Affected Services Status</FormLabel>

                                                    <Select
                                                        placeholder="Don't change affected services status"
                                                        value={update?.affectedServicesStatus}
                                                        onChange={(e) =>
                                                            setUpdate((prev) => ({
                                                                ...prev,
                                                                affectedServicesStatus: e.target.value,
                                                            }))
                                                        }
                                                    >
                                                        <option value="Operational">Operational</option>
                        <option value="Degraded Performance">Degraded Performance</option>
                        <option value="Partial Outage">Partial Outage</option>
                        <option value="Major Outage">Major Outage</option>
                                                    </Select>
                                                </FormControl>
                                                <FormControl id="updateAffectedServicesStatus">
                                                    <HStack justifyContent="flex-end">

                                                        <Button
                                                            isLoading={props.loadingAdd}
                                                            onClick={() =>
                                                                props.addResource(update, addUpdateNext)
                                                            }
                                                            colorScheme="brand"
                                                            color="#fff"
                                                        >
                                                            Post Update
                                                        </Button>
                                                    </HStack>
                                                </FormControl>
                                                <Divider />
                                                {props.data?.updates
                                                    ?.sort(
                                                        (a, b) => b.updateCreatedAt - a.updateCreatedAt
                                                    )
                                                    .map((update) => (
                                                        <HStack
                                                            justifyContent="space-between"
                                                            key={update.updateId}
                                                            width="100%"
                                                            p={5}
                                                            shadow="md"
                                                            borderWidth="1px"
                                                            borderRadius="md"
                                                        >
                                                            <Text>{update?.updateDescription}</Text>
                                                            <HStack>
                                                                <UpdatedAt
                                                                    updatedAt={update.updateUpdatedAt}
                                                                    createdAt={update.updateCreatedAt}
                                                                />

                                                                {props.loadingDelete === update.updateId ? (
                                                                    <Spinner size="xs" margin="auto 5px" />
                                                                ) : (
                                                                    <DeleteIcon
                                                                        size="xs"
                                                                        marginLeft="5px"
                                                                        cursor="pointer"
                                                                        onClick={() =>
                                                                            props.deleteResource(update.updateId)
                                                                        }
                                                                    />
                                                                )}
                                                            </HStack>
                                                        </HStack>
                                                    ))}
                                            </VStack>
                                        </Box>
                                    )}
                                />
                            )}
                        </VStack>
                    </DrawerBody>
                    <DrawerFooter borderTopWidth="1px">
                        <Button
                            onClick={onAlertOpen}
                            margin="auto auto auto 0"
                            leftIcon={<DeleteIcon />}

                        >
                            Delete
                        </Button>
                        <Button mr={3} onClick={handleDrawerClose}>
                            Close
                        </Button>
                        <Button
                            isLoading={loadingAdd}
                            colorScheme="brand"
                            color="#fff"
                            onClick={handleSaveIncident}
                        >
                            {selectedIncident && selectedIncident.incidentId
                                ? "Save"
                                : "Create"}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {selectedIncident && (
                <AlertDialog isOpen={isAlertOpen} onClose={onAlertClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Incident
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure you want to delete{" "}
                                <Text as="b">{selectedIncident?.incidentName}</Text> ?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button onClick={onAlertClose}>Cancel</Button>
                                <Button
                                    isLoading={loadingDelete}
                                    colorScheme="red"
                                    color="#fff"
                                    onClick={() =>
                                        deleteIncident(
                                            selectedIncident?.incidentId,
                                            deleteIncidentNext
                                        )
                                    }
                                    ml={3}
                                >
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    );
};
