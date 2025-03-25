import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Container, TextArea, TextField, Flex, Button, DropdownMenu, Link, IconButton, Text } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import axios from 'axios';
import AddImageButton from './AddImageButton';
import Header from './Header.js';
import { AuthProvider } from './AuthContext.js';

function EditPage({ isAdmin }) {
  const { id } = useParams();
  const [elements, setElements] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loggedIn, setIsLoggedIn] = useState(()=> {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return true;
    }
    return false;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.post('/api/blog', { action: 'fetchPost', blogId: id })
        .then((res) => {
          setTitle(res.data[0].blogtitle);
          setElements(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  if (!isAdmin) return (
    <Container size="4">
      <AuthProvider>
        <Header loggedIn={loggedIn} />
      </AuthProvider>
      <div>
        <Heading size="8" weight="bold">Unauthorized</Heading>
        <Text size="3">You do not have permission to view this page.</Text>
      </div>
    </Container>
  ); // Prevent rendering unauthorized content

  const handleSave = (file) => {
    if (file) {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          addImage(`http://localhost:8000${response.data.url}`);
          setOpen(false);
          setUploading(false);
          setImage(null);
          setFile(null);
        })
        .catch(error => {
          console.error('Upload failed:', error);
          setUploading(false);
        });
    }
  };

  const addParagraph = () => {
    setElements([...elements, { blocktype: 'text', blockcontent: '', blockorder: elements.length }]);
  };

  const addImage = (imageUrl) => {
    setElements([...elements, { blocktype: 'image', blockcontent: imageUrl, blockorder: elements.length }]);
  };

  const submitPost = () => {
    axios.post('/api/blog', { elements, title, action: id ? 'edit' : 'create', blogId: id })
      .then((res) => {
        if (res.status === 200) {
          // Redirect after save
        }
      })
      .catch((err) => console.log(err));
  };

  const modifyThisElement = (e, index) => {
    const newElements = [...elements];
    newElements[index] = { blocktype: 'text', blockcontent: e.target.value, blockorder: index };
    setElements(newElements);
  };

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const deletePost = () => {
    axios.post('/api/blog', { action: 'delete', blogId: id })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((err) => console.log(err));
  };

  const removeElement = (index) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  return (
    <Container size="4">
      <AuthProvider>
        <Header loggedIn={loggedIn} />
      </AuthProvider>
      <Flex direction="column" gap="4">
        <Flex width="100%" direction="row" mt="8" mb="5" align="end" style={{ justifyContent: 'space-between' }}>
          <Heading size="8" weight="bold">{id ? `Edit Post: ${id}` : 'Create New Post'}</Heading>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button>
                Options
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onClick={submitPost} shortcut="⌘ S">Save</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
              <DropdownMenu.Item shortcut="⌘ ⌫" color="red" onClick={deletePost}>Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <TextField.Root value={!id ? null : title} placeholder='Post title' size="3" weight="bold" onChange={updateTitle} />
        {elements.map((element, index) => (
          <Flex key={index} gap="4" direction="row" align="center" width="100%">
            {element.blocktype === 'text' ? (
              <TextArea
                style={{ flex: 1 }}
                value={element.blockcontent}
                placeholder="Paragraph..."
                size="3"
                onChange={(e) => modifyThisElement(e, index)}
              />
            ) : (
              <Flex direction="column" style={{ flex: 1 }} gap="2">
                <img
                  src={element.blockcontent}
                  alt="Blog content"
                  style={{ maxWidth: '100%', maxHeight: '400px' }}
                />
              </Flex>
            )}
            <IconButton onClick={() => removeElement(index)} color="red">
              <MinusIcon />
            </IconButton>
          </Flex>
        ))}
        <Flex gap="4" direction="row">
          <Button onClick={addParagraph}><PlusIcon /> Add Paragraph</Button>
          <AddImageButton image={image} file={file} open={open} uploading={uploading} onSave={handleSave} />
        </Flex>
      </Flex>
    </Container>
  );
}

export default EditPage;