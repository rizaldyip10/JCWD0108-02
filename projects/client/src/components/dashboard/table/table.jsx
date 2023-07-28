import { Flex, Heading, Table, TableContainer, Tbody, Thead, Tr } from "@chakra-ui/react"


export const TableComp = ({ title, fontSize, data, ...props }) => {
    return(
        <Flex {...props}>
            <Heading fontSize={fontSize}>{title}</Heading>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            {/* data.map() */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            {/* data.map() */}
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
}