import { Box, Button, Flex, Input, Link, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { DateSelect } from "../../transHistory/dateSelect";
import { DetailModal } from "../../transHistory/modalDetail";
import { saveAs } from "file-saver"
import ReactPDF from '@react-pdf/renderer';
import generatePDFContent from "./salesReport";
import PDFViewerComponent from "./pdfRenderer";



export const AdminReport = ({ reload, setReload }) => {
    const [order, setOrder] = useState()
    const [selectedOrder, setSelectedOrder] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sort, setSort] = useState("DESC")
    const [sortBy, setSortBy] = useState("createdAt")
    const [selectedSort, setSelectedSort] = useState()
    const [selectedSortBy, setSelectedSortBy] = useState()
    const [searchTerm, setSearchTerm] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const getOrder = async (page, limit) => {
        try {
            const response = await Axios.get(
                `http://localhost:8000/api/reports?sort=${sort}&sortBy=${sortBy}&search=${searchTerm}&dateStart=${startDate}&dateEnd=${endDate}&limit=${limit}&page=${page}`
                )
            setOrder(response.data.result)
            setTotalPage(response.data.totalPage)
        } catch (error) {
            console.log(error);
        }
    }

    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
      };

      const openModal = (value) => {
          setSelectedOrder(value);
          onOpen();
        };
      
      const handleSort = (event) => {
          setSort(event.target.value)
          setSelectedSort(event.target.value)
          setReload(!reload)
      }
      const handleSortBy = (event) => {
          setSortBy(event.target.value)
          setSelectedSortBy(event.target.value)
          setReload(!reload)
      }

      const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setReload(!reload)
      }
      const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPage) {
          setCurrentPage(newPage);
        }
      };

      const generatePDF = (data) => {
        const pdfContent = generatePDFContent(data);
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        saveAs(blob, 'admin_report.pdf');
      };
    useEffect(() => {
        getOrder(currentPage, itemsPerPage, startDate, endDate, sort, sortBy, searchTerm,)
    },[currentPage, itemsPerPage, startDate, endDate, sort, sortBy, searchTerm, reload])

    return (
        <Flex p={10} bg={useColorModeValue("green.50","green.800")}
        direction="column" minH="100vh">
            <Flex justifyContent="space-between">
                <Input maxW="300px" placeholder="Search"
                onChange={(e) => handleSearch(e)} value={searchTerm} />
                <Flex alignItems="center">
                    <Select maxW="200px" mr={{ base: "5px", lg: "20px"}} placeholder="Sort By"
                    onChange={handleSortBy} value={selectedSortBy}>
                        <option value="id">Order ID</option>
                        <option value="createdAt">Date</option>
                    </Select>
                    <Select maxW="100px" placeholder="Sort"
                    onChange={(e) => handleSort(e)} value={selectedSort}>
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </Select>
                </Flex>
            </Flex>
            <Flex direction={{ base: "column", md: "row"}}>
                <DateSelect selected={startDate} onChange={(date) => {
                    setStartDate(date)
                    setReload(!reload)
                    }} />
                <DateSelect selected={endDate} onChange={(date) => {
                    setEndDate(date)
                    setReload(!reload)
                    }}   />
            </Flex>
            <TableContainer mt="20px">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>Date</Th>
                            <Th>Ammount</Th>
                            <Th>Cashier</Th>
                            <Th>Detail</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {order?.map((v, i) => {
                            return (
                                <Tr key={i}>
                                    <Td>{`#${v.id}`}</Td>
                                    <Td>
                                        {new Date(`${v.createdAt}`).toLocaleDateString("en-us", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"})}
                                    </Td>
                                    <Td>{formatIDR(v.amount)}</Td>
                                    <Td>{`${v.Cashier.firstName} ${v.Cashier.lastName}`}</Td>
                                    <Td>
                                        <Button onClick={() => openModal(v)}>Detail</Button>
                                        {selectedOrder && ( <DetailModal isOpen={isOpen} onClose={onClose}
                                        data={selectedOrder}/>
                                        )}
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Box mt={5} display="flex" justifyContent="center" alignItems="center">
                <Button
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
                mr={2}
                size="sm"
                bg={"green"}
                >
                <ArrowBackIcon color={"white"}></ArrowBackIcon>
                </Button>
                <Text fontSize="sm" mr={2}>
                Page {currentPage} of {totalPage}
                </Text>
                <Button
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage >= totalPage}
                ml={2}
                size="sm"
                bg={"green"}

                >
                <ArrowForwardIcon color={"white"}></ArrowForwardIcon>
                </Button>
            </Box>
            <Link onClick={() => generatePDF(order)}>Download Sales Report</Link>
            {/* {order && <PDFViewerComponent data={order} />} */}
        </Flex>
    )
}