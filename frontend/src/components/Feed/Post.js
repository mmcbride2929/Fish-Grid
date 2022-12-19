import { Link as ReachLink } from 'react-router-dom'
import { IconButton, Image, Link } from '@chakra-ui/react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const Post = ({ post, posts }) => {
  const { species, photo, length, bait, _id, createdBy } = post

  // getting user
  const { user, deletePost } = useContext(AppContext)

  const handleDelete = () => {
    deletePost(_id)
    posts.filter((p) => p._id === _id)
  }

  return (
    <div>
      <Link as={ReachLink} to={`/post/${_id}`}>
        {species}
      </Link>
      <p>{length}</p>
      <Image src={photo.url} />
      <div>
        {createdBy === user._id ? (
          <>
            <Link as={ReachLink} to={`/edit-post/${_id}`}>
              <IconButton
                variant="outline"
                color={'white'}
                bg="brand.300"
                fontSize="20px"
                _hover={{
                  color: 'brand.300',
                  bg: 'white',
                }}
                icon={<EditIcon />}
              />
            </Link>
            <IconButton
              onClick={handleDelete}
              variant="outline"
              color={'white'}
              bg="brand.300"
              fontSize="20px"
              _hover={{
                color: 'brand.300',
                bg: 'white',
              }}
              icon={<DeleteIcon />}
            />
          </>
        ) : (
          <>
            'berries'{createdBy} ' '{user._id}
          </>
        )}
      </div>
    </div>
  )
}
export default Post