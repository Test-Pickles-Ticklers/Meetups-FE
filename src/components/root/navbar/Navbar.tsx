import { Box, Flex, Stack } from '@chakra-ui/react';
import Login from '../../auth/Login';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleLoginModalOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Box w="100%" p="4">
        <Flex justifyContent="flex-end">
          <Stack>
            <Login onCancel={toggleLoginModalOpen} />
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
