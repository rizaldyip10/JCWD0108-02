import { Box, Divider, Flex, Heading, IconButton, Text, useDisclosure, useToast } from "@chakra-ui/react"
import Axios from "axios";
import { useEffect, useState } from "react";
import { BsCash, BsFillCreditCardFill, BsQrCode } from "react-icons/bs"
import { CardModal } from "./modalCard";
import { QrModal } from "./modalQR";
import { CashModal } from "./modalCash";

export const Payment = ({ totalPrice, reload, setReload }) => {
    const [isCardModalOpen, setCardModalOpen] = useState(false);
    const [isQrModalOpen, setQrModalOpen] = useState(false);
    const [isCashModalOpen, setCashModalOpen] = useState(false);

    const formatIDR = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
      };

    return (
        <Box mt="15px">
            <Heading fontSize="24px">Order Summary</Heading>
            <Flex mt="15px" justifyContent="space-between">
                <Text fontWeight="bold">Total Price</Text>
                <Text fontWeight="bold">
                    {formatIDR(totalPrice)}
                </Text>
            </Flex>
            <Divider mt="15px" />
            <Box mt="15px">
                <Heading fontSize="24px">Payment Method</Heading>
                <Flex mt="15px" justifyContent="space-around">
                    <IconButton size="lg" icon={<BsFillCreditCardFill />} onClick={() => setCardModalOpen(true)} />
                    <CardModal isOpen={isCardModalOpen} onClose={() => setCardModalOpen(false)} totalPrice={totalPrice} reload={reload} setReload={setReload} />
                    
                    <IconButton size="lg" icon={<BsQrCode />} onClick={() => setQrModalOpen(true)} />
                    <QrModal isOpen={isQrModalOpen} onClose={() => setQrModalOpen(false)} totalPrice={totalPrice} reload={reload} setReload={setReload} />
                    
                    <IconButton size="lg" icon={<BsCash />} onClick={() => setCashModalOpen(true)} />
                    <CashModal isOpen={isCashModalOpen} onClose={() => setCashModalOpen(false)} totalPrice={totalPrice} reload={reload} setReload={setReload} />
                    
                </Flex>
            </Box>
        </Box>
    )
}