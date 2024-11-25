import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

function UserBadgeItem({ user, handleFunction, admin }) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      color="white"
      bg="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      <Flex justify="space-between" align="center"
       display='flex' >
        <Box display="flex" alignItems="center">
          <Text pr='2'>{user.name}</Text>
          {admin === user._id && <Text ml={1}>(Admin)</Text>}
        </Box>
        <IoMdCloseCircle />
      </Flex>
    </Box>
  );
}

export default UserBadgeItem;
