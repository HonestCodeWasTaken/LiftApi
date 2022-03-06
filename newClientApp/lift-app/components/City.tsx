import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Badge, Box, Flex, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Image
} from "@chakra-ui/react"
import { MdStar } from "react-icons/md";

const City = () => {

  return (
    <Box alignContent="" p="3" maxW="200px" borderWidth="1px">
      <Image borderRadius="md" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhealix.com%2Fwp-content%2Fuploads%2F2018%2F06%2FLGBT-Pride-Demonstration-e1530007047924.jpg&f=1&nofb=1" />
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        Vilnius
      </Text>
      <Flex mt={2} align="center">
        <Box as={MdStar} color="orange.400" />
        <Text ml={1} fontSize="sm">
          <b>4.84</b> (190)
        </Text>
      </Flex>
    </Box>
  )
}
export default City;