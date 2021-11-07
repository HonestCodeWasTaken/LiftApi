import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
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
} from "@chakra-ui/react"
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Message } from "../components/Message";
import { IMessage } from "../interfaces/IMessage";

const Home: NextPage = () => {
  const restApi = "https://localhost:44390/api"
  const [currFloor, setCurrFloor] = useState("");
  const [lifts, setLifts] = useState<Array<ILift>>([]);
  const [floorLimit, setFloorLimit] = useState("");
  const [floorToGo, setFloorToGo] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const { addToast } = useToasts();

  const formBackground = useColorModeValue("gray.100", "gray.700")
  const { toggleColorMode } = useColorMode()

  const handleCurrFloorChange = (event: React.ChangeEvent<HTMLInputElement>) => setCurrFloor(event.target.value)
  const handleFloorLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => setFloorLimit(event.target.value)
  const handleFloorChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let arrayOfFloors = floorToGo.slice()
    arrayOfFloors[index] = event.target.value
    setFloorToGo(arrayOfFloors)
  }

  const postLift = async () => {
    setLoading(true);
    await LiftsSVC.uploadLift(parseInt(currFloor), "Waiting", "", parseInt(floorLimit), restApi)
    setLoading(false);
  }
  const getLifts = async () => {
    const lifts = await LiftsSVC.fetchUrl(`${restApi}/Lifts`);
    setLifts(lifts);
  }
  const startSignalR = async() => {
    try {
      const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:44390/chat")
          .configureLogging(LogLevel.Information)
          .build();

      connection.on("ReceiveMessage", (time, status, floor) => {
          setMessages(messages => [...messages, {calledOn: time, status: status, currentFloor: floor} ]);
          
      });

      await connection.start();
      setConnection(connection);
  } catch (e) {
      console.log(e);
  }
  }
  const sendLift = async (index: number) => {
    try {
      if (connection !== undefined) {
      await connection.invoke("SendMessage", parseInt(floorToGo[index]), lifts[index].currentFloor);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    startSignalR();
    getLifts();
  }, []);

  return (
    <div>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <Heading mb={6}>
            {"Lifts"}
          </Heading>
          <span style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Input placeholder="Current floor" variant="filled" ml={3} mb={3} type="text" value={currFloor} onChange={handleCurrFloorChange}></Input>
            <Input placeholder="Floor limit" variant="filled" ml={3} mb={3} type="text" value={floorLimit} onChange={handleFloorLimitChange}></Input>
            <Button onClick={postLift} ml={3} mb={3}>Post</Button>
          </span>
          <Button onClick={toggleColorMode} mt={6}>Dark mode</Button>
          <Table variant="simple">
            <TableCaption>Lifts</TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>Current Floor</Th>
                <Th>Status</Th>
                <Th>Direction</Th>
                <Th isNumeric>Floors It Can Go Up To</Th>
                <Th isNumeric>Which floor?</Th>
                <Th isNumeric>Call lift</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lifts.map((item, index) => {
                const { id, currentFloor, status, direction, floorsItCanGoUpTo } = item;
                return (
                  <Tr key={index}>
                    <Td isNumeric>{currentFloor}</Td>
                    <Td>{status}</Td>
                    <Td>{direction}</Td>
                    <Td isNumeric>{floorsItCanGoUpTo}</Td>
                    <Td >
                    <Input placeholder="Current floor" variant="filled" ml={3} mb={3} type="text" value={floorToGo[index]} onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleFloorChange(event, index)}></Input>
                    </Td>
                    <Td >
                      <Button onClick={() => sendLift(index)} ml={3} mb={3}>Post</Button>
                    </Td>
                  </Tr>
                )
              })
              }
            </Tbody>
          </Table>
          <Message  formBackground={formBackground} messages={messages}></Message>
          {loading && <Spinner mt={3} alignItems="center" justifyContent="center" />}
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
