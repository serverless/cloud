import { DeleteIcon } from "@chakra-ui/icons"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    VStack,
    Textarea,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
} from "@chakra-ui/react"
import { useEffect } from "react";

export const ServiceModal = ({ selectedService, setSelectedService, addService, loadingAdd, deleteService, loadingDelete }) => {
    
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const deleteServiceNext = () => {
        onAlertClose()
        handleModalClose()
        
    }
    useEffect(() => {
        if (selectedService) {
            onModalOpen()
        }
        return () => {

        }
    }, [selectedService, onModalOpen])
    const handleModalClose = () => {
        onModalClose()
        setSelectedService(null)
    }
    const addServiceNext = () => {
        setSelectedService(null)
        onModalClose()
    }
    const handleSaveService = async () => {
        addService({ ...selectedService, serviceStatus: selectedService?.serviceStatus || 'Operational' }, addServiceNext)
    }
    return (

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedService && selectedService.serviceId ? 'Edit Service' : 'Create Service'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing="24px">

                        <FormControl id="serviceName">
                            <FormLabel>Service Name</FormLabel>
                            <Input placeholder="Service Name" type="text" value={selectedService && selectedService.serviceName} onChange={(e) => setSelectedService(prev => ({ ...prev, serviceName: e.target.value }))}
                                onKeyUp={(event) => {
                                    if (event.key === "Enter") {
                                        handleSaveService()
                                    }
                                }}

                            />

                        </FormControl>
                        <FormControl id="serviceDescription">
                            <FormLabel>Service Description</FormLabel>

                            <Textarea placeholder="Service Description"
                                value={selectedService && selectedService.serviceDescription} onChange={(e) => setSelectedService(prev => ({ ...prev, serviceDescription: e.target.value }))}
                                onKeyUp={(event) => {
                                    if (event.key === "Enter") {
                                        handleSaveService()
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl id="serviceStatus">
                            <FormLabel>Service Status</FormLabel>
                            <Select placeholder="Operational" value={selectedService?.ServiceStatus || 'Operational'} onChange={e => setSelectedService(prev => ({ ...prev, serviceStatus: e.target.value }))}>
                                <option value="Operational">Operational</option>
                                <option value="Degraded Performance">Degraded Performance</option>
                                <option value="Partial Outage">Partial Outage</option>
                                <option value="Major Outage">Major Outage</option>
                            </Select>

                        </FormControl>
                    </VStack>
                </ModalBody>

            
                <ModalFooter>

                    <Button
                        onClick={onAlertOpen}
                        margin="auto auto auto 0"
                        leftIcon={<DeleteIcon />}  >
                        Delete
                    </Button>
                    <AlertDialog
                        isOpen={isAlertOpen}

                        onClose={onAlertClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                    Delete Service
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure you want to delete <Text as="b">{selectedService?.serviceName}</Text> ?
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button onClick={onAlertClose}>
                                        Cancel
                                    </Button>
                                    <Button isLoading={loadingDelete} colorScheme="brand" color="#fff" onClick={() => deleteService(selectedService?.serviceId, deleteServiceNext)} ml={3}>
                                        Delete
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                    <Button mr={3} onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button isLoading={loadingAdd} colorScheme="brand" color="#fff" onClick={handleSaveService}>Save</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}