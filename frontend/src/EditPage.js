import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Container, TextArea, TextField, Flex, Button, DropdownMenu, Link, IconButton, Text } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import axios from 'axios';
import AddImageButton from './AddImageButton';
import Header from './Header.js';
import ScheduleDemo from './components/ScheduleDemo.js';
import { useAuth } from './authentication/AuthContext.js';

function EditPage() {
  const { id } = useParams();
  const [elements, setElements] = useState([]);
  const [title, setTitle] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [headerImageFile, setHeaderImageFile] = useState(null);
  const [headerImageOpen, setHeaderImageOpen] = useState(false);
  const [headerImageUploading, setHeaderImageUploading] = useState(false);

  const isProduction = process.env.NODE_ENV === 'production';

  const navigate = useNavigate();

  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    if (isAdmin && id) {
      axios.post('/api/blog', { action: 'fetchPost', blogId: id })
        .then((res) => {
          // Extract post metadata (first item) and content blocks (remaining items)
          const [postData, ...blocks] = res.data;
          
          setTitle(postData.blogtitle);
          setElements(blocks); // Only use the blocks, not the metadata
          setHeaderImage(postData.headerimage || '');
  
          // Handle tags parsing
          let tagsData = [];
          try {
            if (postData.tags) {
              tagsData = typeof postData.tags === 'string' 
                ? JSON.parse(postData.tags) 
                : postData.tags;
            }
          } catch (e) {
            tagsData = postData.tags?.split(',').map(t => t.trim()) || [];
          }
          setTags(tagsData);
        })
        .catch(console.error);
    }
  }, [id, isAdmin]);

  if (!isAdmin) {
    return (
      <Container>
        <Heading>Unauthorized</Heading>
        <Text>Admin permissions required</Text>
      </Container>
    );
  }

  const handleSave = (file, type = 'image') => {
    if (file) {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          // Use the full URL directly from Cloudinary
          const url = response.data.url;
          if (type === 'headerImage') {
            setHeaderImage(url);
          } else {
            addImage(url);
          }
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

  const handleHeaderImageSave = (file) => {
    if (file) {
      setHeaderImageUploading(true);
      const formData = new FormData();
      formData.append('image', file);
  
      axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(response => {
          // Cloudinary URL is already complete - remove baseURL concatenation
          setHeaderImage(response.data.url);
          setHeaderImageOpen(false);
          setHeaderImageUploading(false);
          setHeaderImageFile(null);
        })
        .catch(error => {
          console.error('Upload failed:', error);
          setHeaderImageUploading(false);
        });
    }
  };

  const addParagraph = () => {
    setElements([...elements, { blocktype: 'text', blockcontent: '', blockorder: elements.length }]);
  };

  const addImage = (imageUrl) => {
    setElements([...elements, { blocktype: 'image', blockcontent: imageUrl, blockorder: elements.length }]);
  };

  const addComponent = () => {
    setElements([...elements, { blocktype: 'component', blockcontent: '', blockorder: elements.length }]);
  }

  const submitPost = () => {
    axios.post('/api/blog', {
      elements,
      title,
      headerImage,
      tags: tags.filter(t => t.trim() !== ''),
      action: id ? 'edit' : 'create',
      blogId: id
    })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/view/${id || res.data.id}`);
        }
      })
      .catch(console.error);
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

  const archivePost = () => {
    axios.post('/api/blog', { action: 'archive', blogId: id })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((err) => console.log(err));
  }

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const modifyThisElement = (e, index) => {
    const newElements = [...elements];
    newElements[index] = { blocktype: 'text', blockcontent: e.target.value, blockorder: index };
    setElements(newElements);
  };

  const modifyThisComponent = (e, index) => {
    const newElements = [...elements];
    newElements[index] = { blocktype: 'component', blockcontent: e.target.value, blockorder: index };
    setElements(newElements);
  };

  const removeElement = (index) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  return (
    <Container size="4">
      {/* <AuthProvider> */}
      <Header />
      {/* </AuthProvider> */}
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
              <DropdownMenu.Item shortcut="⌘ N" onClick={archivePost}>Archive</DropdownMenu.Item>
              <DropdownMenu.Item shortcut="⌘ ⌫" color="red" onClick={deletePost}>Delete</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <TextField.Root value={!id ? null : title} placeholder='Post title' size="3" weight="bold" onChange={updateTitle} />
        <Flex gap="4" direction="row" align="center">
          {headerImage ? (
            <Flex gap="4" align="center">
              <img src={headerImage} alt="Header" style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }} />
              <Button color="red" onClick={() => setHeaderImage('')}>Remove Header Image</Button>
            </Flex>
          ) : (
            <AddImageButton
              image={headerImageFile}
              file={headerImageFile}
              open={headerImageOpen}
              uploading={headerImageUploading}
              onSave={handleHeaderImageSave}
              buttonText="Add Header Image"
            />
          )}
        </Flex>

        {/* Tags Input */}
        <TextField.Root
          placeholder="Tags (comma-separated)"
          value={tags.join(', ')}
          onChange={(e) => {
            const newTags = e.target.value.split(',').map(tag => tag.trim());
            setTags(newTags);
          }}
        />
        {elements.map((element, index) => (
          <Flex key={index} gap="4" direction="row" align="center" width="100%">
            {element.blocktype === 'text' && (
              <>
                <TextArea
                  style={{ flex: 1 }}
                  value={element.blockcontent}
                  placeholder="Paragraph..."
                  size="3"
                  onChange={(e) => modifyThisElement(e, index)}
                />
                <IconButton onClick={() => removeElement(index)} color="red">
                  <MinusIcon />
                </IconButton>
              </>
            )}
            {element.blocktype === 'image' && (
              <>
                <Flex direction="column" style={{ flex: 1 }} gap="2">
                  <img
                    src={element.blockcontent}
                    alt="Blog content"
                    style={{ maxWidth: '100%', maxHeight: '400px' }}
                  />
                </Flex>
                <IconButton onClick={() => removeElement(index)} color="red">
                  <MinusIcon />
                </IconButton>
              </>
            )}
            {element.blocktype === 'component' && (
              <>
                <TextArea
                  style={{ flex: 1 }}
                  value={element.blockcontent}
                  placeholder="Component Name..."
                  size="3"
                  onChange={(e) => modifyThisComponent(e, index)}
                />
                <IconButton onClick={() => removeElement(index)} color="red">
                  <MinusIcon />
                </IconButton>
              </>
            )}
          </Flex>
        ))}
        <Flex gap="4" direction="row">
          <Button onClick={addParagraph}><PlusIcon /> Add Paragraph</Button>
          <AddImageButton
            image={image}
            file={file}
            open={open}
            uploading={uploading}
            onSave={(file) => handleSave(file, 'image')}
          />
          <Button onClick={addComponent}><PlusIcon /> Add Component</Button>
        </Flex>
      </Flex>
    </Container>
  );
}

export default EditPage;