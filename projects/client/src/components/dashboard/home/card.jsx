import { Box, Card, CardBody, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { IconContext } from "react-icons/lib"


export const CardItem = ({ title, detail, icon, color, size, ...props}) => {
    return (
        <Card {...props}>
            <CardBody>
                <Box color={color}>
                    <Flex alignItems="center">
                    <Text fontSize={{ base: '10px', lg: '14px'}}>{title}</Text>
                        <IconContext.Provider value={{ color: color, size: size }}>
                            <Icon as={icon} ml="10px" />
                        </IconContext.Provider>
                    </Flex>
                        <Heading mt="5px" fontSize={{base: '18px', lg: '24px'}}>{detail}</Heading>
                </Box>
            </CardBody>
        </Card>
    )
}