import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Container, Text, AspectRatio, TextArea, Flex, Link } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import axios from 'axios';
import AddImageButton from './AddImageButton';

function ViewPage() {
    const { id } = useParams();
    const [elements, setElements] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

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

    return (
        <Container size="4">
            <Flex>
                <Link href="/">Take me home!</Link>
            </Flex>
            <Flex direction="column" gap="4">
                <Flex width="100%" direction="row" mt="8" mb="5" align="end" style={{ justifyContent: 'space-between' }}>
                </Flex>
                <Heading size="8" weight="bold">{title}</Heading>
                <Flex direction="column" gap="4">
                    {elements.map((element, index) => (
                        console.log(element),
                        <div key={index}>
                            {element.blocktype === 'text' ? <Flex><Text>{element.blockcontent}</Text></Flex> : null}
                            {element.blocktype === 'image' ? <AspectRatio>
                            <img 
                                src={element.blockcontent}
                                style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    borderRadius: "var(--radius-2)",
                                }}
                            ></img></AspectRatio> : null}
                        </div>
                    ))}
                </Flex>
            </Flex>
        </Container>
    );
}

export default ViewPage;