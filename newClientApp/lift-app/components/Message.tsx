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
import { IUser } from '../interfaces/IUser'

interface IMessageProps {
	formBackground: string;
	messages: IMessage;
	users: Array<IUser>;
}
export const Message: React.FC<IMessageProps> = (props: IMessageProps) => {
	let urlParams = new URLSearchParams(window.location.search)
	const whoIsSendingID: any = urlParams.get('ID')
	let messagesParsed = props.messages.messages.filter(x => x.receiver_ID === parseInt(whoIsSendingID))

	
	return (
		<Flex
			pos="absolute"
			top="50%"
			left="50%"
			transform="translate(-50%, -50%)"
			justifyContent="center" alignItems="center" width={"90vh"}>
			<Flex direction="column" w="inherit" background={props.formBackground} p={3} rounded={6}>
				<Heading mb={6}>
					{"Messages"}
				</Heading>
				<Divider></Divider>
				{messagesParsed.map((item, index) =>{
					const { id, created_at, updated_at, message, whoSent_ID, receiver_ID } = item; 
					return (
						<MessageItem key={id} message={message} time={created_at} name={props.users.find(x => x.id === whoSent_ID)?.username} ></MessageItem>
					)
				})}
			</Flex>
		</Flex>

	)
}