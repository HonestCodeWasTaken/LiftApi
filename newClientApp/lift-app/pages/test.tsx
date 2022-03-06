import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Badge, Box, Flex, Heading, SimpleGrid } from "@chakra-ui/layout";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { Spinner, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Link from 'next/link'
import LiftsSVC from "./api/LiftsSVC";
import { ILift } from "../interfaces/ILift";
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
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Message } from "../components/Message";
import { IMessage } from "../interfaces/IMessage";
import { MdStar } from "react-icons/md";
import City from "../components/City";

const Test = () => {

  return (
    <SimpleGrid minChildWidth="120px" spacing="40px"> 
      { [1, 2, 3, 4, 5, 6].map((x, index) => {
      return <City key={index} />
    })}
    </SimpleGrid>


  )
}
export default Test;