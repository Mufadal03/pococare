import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
      <HStack w='90vw' m='auto' justifyContent={'space-between'}>
          <Link to='/'><Button colorScheme={'facebook'}>Home</Button></Link>
          <Link to='/login'><Button colorScheme={'messenger'}>Login</Button></Link>
          

   </HStack>
  )
}

export default Navbar