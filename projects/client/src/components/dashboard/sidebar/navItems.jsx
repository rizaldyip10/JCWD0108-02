import { Flex, Icon, Text } from "@chakra-ui/react"
import { IconContext } from "react-icons/lib"
import { Link } from "react-router-dom"


export const NavItem = ({ icon, title, page, color, size, ...props }) => {
    return (
        <Flex as={Link} to={page} color={color} {...props} alignItems="center">
            <IconContext.Provider value={{ color: color, size: size }}>
                <Icon as={icon} />
            </IconContext.Provider>
            <Text ml={3}>{title}</Text>
        </Flex>
    )
}