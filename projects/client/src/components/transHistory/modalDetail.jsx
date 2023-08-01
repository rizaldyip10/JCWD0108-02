import { Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"


export const DetailModal = ({ isOpen, onClose, data}) => {
    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
      }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>{`Cashier: ${data.Cashier.firstName} ${data.Cashier.lastName}`}</Text>
            <TableContainer mt="10px">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Item</Th>
                            <Th>Amount</Th>
                            <Th>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.transactionDetails.map((v, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{v.Product.productName}</Td>
                                    <Td>{v.totalItems}</Td>
                                    <Td>{formatIDR(v.totalPrice)}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex justifyContent="space-between" px="20px" mt="10px">
                <Text fontWeight="bold">Total:</Text>
                <Text fontWeight="bold">{formatIDR(data.amount)}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick>
              Confirm
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
    )
}