import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryPopOver } from './deleteCategoryPopOver';
import { EditIcon } from '@chakra-ui/icons';

const EditCategoryModal = ({ isOpen, onClose, editedCategoryName, setEditedCategoryName, onSave }) => {
  const [isInputValid, setInputValid] = useState(true);

  const handleSave = () => {
    if (!editedCategoryName.trim()) {
      setInputValid(false);
      return;
    }

    onSave(editedCategoryName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={editedCategoryName}
            onChange={(e) => {
              setEditedCategoryName(e.target.value);
              setInputValid(true);
            }}
            placeholder="Enter new category name"
            isInvalid={!isInputValid}
          />
          {!isInputValid && (
            <Text color="red" fontSize="sm" mt={1}>
              Category name cannot be empty.
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const DashboardCategory = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isInputValid, setInputValid] = useState(true); // Add the input validity state
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const getCategories = async (page, limit) => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/categories?page=${page}&limit=${limit}`);
      const { result, totalPage: totalPages } = response.data;
      setCategories(result);
      setTotalPage(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

  const handleClearFilter = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('catId');
    navigate(`/dashboard?${queryParams.toString()}`);
    setSelectedCardId(null);
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setSelectedCardId(categoryId);
    setEditedCategoryName(categoryName);
    setIsPopoverOpen(true);
  };

  const handleSaveCategory = async (newCategoryName) => {
    if (!newCategoryName.trim()) {
      setInputValid(false);
      return;
    }

    try {
      const updatedCategory = {
        id: selectedCardId,
        Category: newCategoryName,
      };

      await Axios.patch(`http://localhost:8000/api/categories/${selectedCardId}`, updatedCategory);

      setIsPopoverOpen(false);
      setCategories((prevCategories) =>
        prevCategories.map((category) => (category.id === selectedCardId ? { ...category, Category: newCategoryName } : category))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Flex direction="row" justifyContent="center" flexWrap="wrap">
        <Box
          mt={4}
          onClick={handleClearFilter}
          colorScheme="gray"
          p={4}
          m={3}
          maxW="180px"
          w="100px"
          bg={'white'}
          boxShadow="md"
          rounded="lg"
          justifyContent="center"
          _hover={{
            boxShadow: 'xl',
          }}
        >
          <Text color={'green'} fontSize="sm" fontWeight="bold" textAlign="center">
            All
          </Text>
        </Box>
        {categories?.map((item) => (
          <Box
            key={item.id}
            p={4}
            m={3}
            maxW="200px"
            w="150px"
            bg={item.id === selectedCardId ? 'green' : 'white'}
            boxShadow="md"
            rounded="lg"
            justifyContent="center"
            alignContent={"center"}
            _hover={{
              boxShadow: 'xl',
            }}
            cursor={'pointer'}
            onClick={() => {
              onSelectCategory(item.id);
              setSelectedCardId(item.id);
            }}
          >
            <Text color={item.id === selectedCardId ? 'white' : 'green'} fontSize="sm" fontWeight="bold" textAlign="center">
              {item.Category}
            </Text>
            <Center gap={3}>
              <Button size="sm" bg={"white"} onClick={() => handleEditCategory(item.id, item.Category)}>
                <EditIcon color={'green'} />
              </Button>
              <CategoryPopOver selectedCategory={item.id} categoryName={item.Category} onClose={handleClosePopover} />
              <EditCategoryModal
                isOpen={isPopoverOpen && selectedCardId !== null}
                onClose={handleClosePopover}
                editedCategoryName={editedCategoryName}
                setEditedCategoryName={setEditedCategoryName}
                onSave={handleSaveCategory}
              />
            </Center>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
