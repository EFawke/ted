import { useParams } from 'react-router-dom';
import { Box, Heading, Container, TextArea, TextField, Flex, Button, DropdownMenu, Link, IconButton } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function EditPage() {
  const { id } = useParams();
  const [elements, setElements] = useState([]);
  const [title, setTitle] = useState('');

  const addParagraph = () => {
    setElements([...elements, { type: 'text' }]);
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
            <TextArea style={{flex: 1}} width="100%" value={!id ? null : element.blockcontent} placeholder="Paragraph..." size="3" onChange={(e) => modifyThisElement(e, index)} />
            <IconButton onClick={() => removeElement(index)} color="red"><MinusIcon></MinusIcon></IconButton>
          </Flex>
        ))}
        <Flex gap="4" direction="row">
          <Button onClick={addParagraph}><PlusIcon />Add Paragraph</Button>
        </Flex>
      </Flex>
    </Container>
  );
}

export default EditPage;
