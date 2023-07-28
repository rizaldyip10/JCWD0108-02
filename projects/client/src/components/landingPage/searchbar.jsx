import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

export const Searchbar = () => {
    return (
        <InputGroup  w={"30%"}>
    <Input
    variant='outline' 
    placeholder='Find Product' 
    w={"100%"} 
    bg={"white"} 
    _placeholder={{color : "black"}}  
    color={"black"}
    />
    <InputRightElement width='4.5rem'>
    <Button 
    ml={"30px"} 
    h='1.75rem' 
    size='sm' 
    bg={"white"} 
    color={"gray"}>
    <SearchIcon color={"black"}/>
    </Button>
    </InputRightElement>
    </InputGroup>
    )
}