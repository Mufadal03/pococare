import { Box, Heading, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import TodoCard from '../components/TodoCard'
import { getTodos, refreshtoken } from '../redux/action'

const Home = () => {
    const dispatch = useDispatch()
    const [todos, setTodos] = useState([])
    const toast = useToast()
    useEffect(() => {
        dispatch(getTodos()).then((res) => {
            if (res.response === 'jwt expired') {
                dispatch(refreshtoken()).then(res => {
                    if (res.success === true) {
                        localStorage.setItem('token',JSON.stringify(res.token))
                    }else{
                        toast({
                           title:res.response,
                            status: 'info',
                            duration: 3000,
                           isClosable:true
                       })
                    }
                })
            }
            else if (res.success !== false) {
                setTodos([...res.todos])
            } else {
                toast({
                           title:res.response+' Please login again',
                            status: 'info',
                            duration: 3000,
                           isClosable:true
                       })
            }
        })

    },[dispatch])
  return (
      <Box>
          <Heading>Todos</Heading>
          <VStack>
              {
                  todos?.length>0 && todos.map(el=><TodoCard key={el.id} data={el} />)
              }
          </VStack>
    </Box>
  )
}

export default Home