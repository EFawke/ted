import { useParams } from 'react-router-dom';
import { Box, Heading, Container, TextArea, TextField, Flex, Button, DropdownMenu, Link, IconButton } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import AddImageButton from './AddImageButton';

function EditPage() {
  const { id } = useParams();
  const [elements, setElements] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSave = (file) => {
    if (file) {
      setUploading(true);
  
      const formData = new FormData();
      formData.append('image', file);
  
      axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        console.log("Uploaded Image URL:", response.data.url); // Debugging
  
        addImage(`http://localhost:8000${response.data.url}`); // Set full URL for frontend display
  
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
    setElements([...elements, {
      blocktype: 'text',
      blockcontent: '',
      blockorder: elements.length
    }]);
  };

  const addImage = (imageUrl) => {
    console.log("Adding image to post:", imageUrl); // Debugging
    setElements([...elements, {
      blocktype: 'image',
      blockcontent: imageUrl, // Now contains a full URL
      blockorder: elements.length
    }]);
  };


  const submitPost = () => {
    axios.post('/api/blog', { elements: elements, title: title, action: id ? 'edit' : 'create', blogId: id })
      .then((res) => {
        if (res.status === 200) {
          // window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const modifyThisElement = (e, index) => {
    const newElements = [...elements];
    newElements[index] = {
      blocktype: 'text',
      blockcontent: e.target.value,
      blockorder: index
    };
    setElements(newElements
    );
  }

  const updateTitle = (e) => {
    setTitle(e.target.value);
  }

  const deletePost = () => {
    axios.post('/api/blog', { action: 'delete', blogId: id })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const removeElement = (index) => {
    const newElements = elements.filter((_, i) => i !== index);
    setElements(newElements);
  }

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

  return (
    <Container size="4">
      <Flex>
        <Link href="/">Take me home!</Link>
      </Flex>
      <Flex direction="column" gap="4">
        <Flex width="100%" direction="row" mt="8" mb="5" align="end" style={{ justifyContent: 'space-between' }}>
          {id ? (
            <Heading size="8" weight="bold">Edit Post: {id}</Heading>
          ) : (
            <Heading size="8" weight="bold">Create New Post</Heading>
          )}
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
        <TextField.Root value={!id ? null : title} placeholder='Post title' size="3" weight="bold" onChange={(e) => updateTitle(e)} />
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
                <TextField.Root
                  value={element.blockcontent}
                  onChange={(e) => modifyThisElement(e, index)}
                />
              </Flex>
            )}
            <IconButton onClick={() => removeElement(index)} color="red">
              <MinusIcon />
            </IconButton>
          </Flex>
        ))}
        <Flex gap="4" direction="row">
          <Button onClick={addParagraph}><PlusIcon />Add Paragraph</Button>
          <AddImageButton image={image} file={file} open={open} uploading={uploading} onSave={handleSave} />
        </Flex>
      </Flex>
    </Container>
  );
}

export default EditPage;
