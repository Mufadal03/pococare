import { Box, Button, Flex, Heading, HStack, Input, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LoginFn } from '../redux/action'
const Login = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userDetail, setUserDetail] = useState({
        password: '',
        email:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetail({
            ...userDetail,
            [name]:value
        })
    }
    const handleSubmit = () => {
        const {username,email,password} = userDetail
        if (username === '' || email === '' || password === '') return 
        dispatch(LoginFn(userDetail)).then((res) => {
            if (res.success) {
                console.log(res.token===res.refreshToken)
                localStorage.setItem('token', JSON.stringify(res.token))
                localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken))
                navigate('/')
            }
            toast({
                title: res.response,
                status: 'info',
                duration: '3000',
                isClosable:true
            })
        })
    }
  return (
      <Flex h='100vh' justifyContent={'center'} alignItems='center'>
          <VStack w='400px' gap='1rem' border={'1px solid rgba(1,1,1,.5)'} p='2rem'>
              <Heading>login</Heading>
              <Input onChange={handleChange} name='email' type='email' placeholder='Enter email' />
              <Input onChange={handleChange} name='password' type='password' placeholder='Enter password' />
              <Button onClick={handleSubmit} w='100%' colorScheme={'facebook'}>Login</Button>
              <HStack>
                  <Text>Dont have an account?</Text>
                  <Link to='/signup'>signup</Link>
              </HStack>
          </VStack>
    </Flex>
  )
}
export default Login