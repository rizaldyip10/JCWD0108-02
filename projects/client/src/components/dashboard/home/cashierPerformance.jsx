import { Box, Center, useColorModeValue, Heading, Text, Stack, Image, Flex } from '@chakra-ui/react'
import { BsStarFill, BsStarHalf } from "react-icons/bs"

const IMAGE =
  'https://bit.ly/prosper-baba'

export const CashierPerform = () => {
  return (
    <Center py={12} mt="20px" ml={{ base: "0px", lg: "30px"}}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Cashier of The Month
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Ahmad Mawardi
          </Heading>
          <Flex>
           <BsStarFill />
           <BsStarFill />
           <BsStarFill />
           <BsStarFill />
           <BsStarHalf />   
          </Flex>
        </Stack>
      </Box>
    </Center>
  )
}