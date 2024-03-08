import React, { useState } from "react";
import { Box, Button, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  // Sample categories data
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", description: "Gadgets and devices.", itemCount: 150 },
    { id: 2, name: "Books", description: "Readables and literature.", itemCount: 230 },
    // Add more categories as needed
  ]);

  // State for category form
  const [currentCategory, setCurrentCategory] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  // State for delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Chakra UI disclosures and toast
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  // Handlers for category operations
  const handleAddCategory = () => {
    setIsEditing(false);
    setCurrentCategory({ name: "", description: "" });
    onOpen();
  };

  const handleEditCategory = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    onOpen();
  };

  const handleDeleteCategory = (category) => {
    setDeleteTarget(category);
  };

  const confirmDelete = () => {
    setCategories(categories.filter((category) => category.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast({
      title: "Category deleted.",
      description: "The category has been removed successfully.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const saveCategory = () => {
    if (isEditing) {
      // Update category logic here
    } else {
      // Add new category logic here
    }
    onClose();
  };

  // Rendering components
  return (
    <Container maxW="container.xl">
      <Heading my="4">Gestione Categorie</Heading>
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddCategory}>
        Aggiungi Categoria
      </Button>

      <Table variant="simple" my="8">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Descrizione</Th>
            <Th isNumeric>Numero di Articoli</Th>
            <Th>Azioni</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>{category.name}</Td>
              <Td>{category.description}</Td>
              <Td isNumeric>{category.itemCount}</Td>
              <Td>
                <IconButton aria-label="Edit" icon={<FaEdit />} mr="2" onClick={() => handleEditCategory(category)} />
                <IconButton aria-label="Delete" icon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteCategory(category)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add/Edit Category Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Modifica Categoria" : "Aggiungi Categoria"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input placeholder="Nome" value={currentCategory.name} onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descrizione</FormLabel>
              <Input placeholder="Descrizione" value={currentCategory.description} onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveCategory}>
              Salva
            </Button>
            <Button onClick={onClose}>Annulla</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <AlertDialog isOpen={!!deleteTarget} leastDestructiveRef={cancelRef} onClose={() => setDeleteTarget(null)}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Elimina Categoria
              </AlertDialogHeader>

              <AlertDialogBody>Sei sicuro? Non potrai recuperare questa categoria.</AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setDeleteTarget(null)}>
                  Annulla
                </Button>
                <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                  Elimina
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Container>
  );
};

export default Index;
