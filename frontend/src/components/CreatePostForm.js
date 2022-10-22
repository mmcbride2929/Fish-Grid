import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

const CreatePostForm = () => {
  const handleChange = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
      <form>
        <FormControl isRequired>
          <FormLabel>Species</FormLabel>
          <Input
            name="species"
            onChange={handleChange}
            type="string"
            placeholder="Enter species"
            value={null}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Photo</FormLabel>
          <Input
            name="photo"
            onChange={handleChange}
            type="string"
            placeholder="Upload photo"
            value={null}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Bait Type</FormLabel>
          <Input
            name="bait"
            onChange={handleChange}
            type="string"
            placeholder="Enter bait"
            value={null}
          />
        </FormControl>

        <FormLabel>Location</FormLabel>
        <Input
          name="location"
          onChange={handleChange}
          type="string"
          placeholder="Enter location"
          value={null}
        />

        <FormLabel>Length</FormLabel>
        <Input
          name="length"
          onChange={handleChange}
          type="number"
          placeholder="Enter length"
          value={null}
        />

        <FormLabel>Weight</FormLabel>
        <Input
          name="weight"
          onChange={handleChange}
          type="number"
          placeholder="Enter weight"
          value={null}
        />

        <Button
          type="submit"
          size="lg"
          bg={'brand.200'}
          _hover={{
            bg: 'brand.300',
          }}
          color={'white  '}
        >
          Submit
        </Button>
      </form>
    </>
  )
}
export default CreatePostForm

// create corresponding inputs
// create local state for all the inputs
// create onsubmit function/ button
// create post request
// make test cases
// make error messages with reducer