import { Box, chakra } from '@chakra-ui/react'

const CreatePostHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      py={50}
    >
      <chakra.h1
        fontSize={{ base: '1.6rem', sm: '1.75rem', md: '1.9rem' }}
        fontWeight="bold"
      >
        Create a Post
      </chakra.h1>
    </Box>
  )
}
export default CreatePostHeader
