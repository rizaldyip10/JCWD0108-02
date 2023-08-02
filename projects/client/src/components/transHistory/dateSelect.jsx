import { Box, Flex } from "@chakra-ui/react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export const DateSelect = ({ selected, onChange }) => {
    return (
        <Flex border="1px black solid" mr="4px" mt="20px">
            <DatePicker selected={selected} onChange={onChange} />
        </Flex>
    )
}