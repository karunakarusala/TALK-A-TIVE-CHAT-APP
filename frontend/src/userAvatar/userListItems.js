import { Avatar } from "../components/ui/avatar";
import { Box,  Text } from "@chakra-ui/react";


const UserListItem = ({ user,handleFunction }) => {
  

  return (

     <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      {/* Avatar on the left side */}
      <Avatar
        mr={3} // Margin to separate the picture from text
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />

      {/* Right side: Name and Email in a column */}
      <Box>
        <Text fontSize="sm" fontWeight="bold">{user.name}</Text>
        <Text fontSize="xs">
          <b>Email: </b>{user.email}
        </Text>
      </Box>
    </Box>

  );
};

export default UserListItem;