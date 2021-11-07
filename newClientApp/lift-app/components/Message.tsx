import React, { useState } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading
} from '@chakra-ui/react'
import { IMessage } from '../interfaces/IMessage'
import { MessageItem } from './MessageItem'

interface IMessageProps {
  formBackground: string;
  messages: Array<IMessage>;
}
export const Message: React.FC<IMessageProps> = (props: IMessageProps) => {
  return (
    <div>
      <Heading mb={6}>
        {"Messages"}
      </Heading>
      <Divider></Divider>
      <div style={{overflow:"auto", height:"500px"}}>
      {
      
        props.messages.map((item, index) => {
          const { calledOn, currentFloor, status } = item;
          return (
            <MessageItem key={index} status={status} time={calledOn} currentFloor={currentFloor} ></MessageItem>
          )
        })
      }
      </div>
    </div>

  )
}