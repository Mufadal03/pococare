import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

const TodoCard = ({data}) => {
  return (
      <HStack border={'1px solid'} gap='1rem' w='50%' p='1rem' justifyContent={'space-between'}>
          <Text>{data.id}</Text>
          <Text>{data.todo}</Text>
          <Text color={data.completed?'green':'red'}>{data.completed?'Done':"Not Done" }</Text>
    </HStack>
  )
}

export default TodoCard