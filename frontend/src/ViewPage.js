import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Container, Text, AspectRatio, TextArea, Flex, Link } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import axios from 'axios';
import AddImageButton from './AddImageButton';
import Header from './Header.js';
import { AuthProvider } from './AuthContext.js';
import ReactMarkdown from 'react-markdown';
import './App.css';

function ViewPage() {
    const { id } = useParams();
    const [elements, setElements] = useState([]);
    const [title, setTitle] = useState('');

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

    const [loggedIn, setIsLoggedIn] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            return true;
        }
        return false;
    });

    return (
        <Container size="4">
            <AuthProvider>
                <Header loggedIn={loggedIn} />
            </AuthProvider>
            <Flex direction="column" gap="4">
                <Heading size="9" weight="bold">{title}</Heading>
                <Flex direction="column" gap="4">
                    {elements.map((element, index) => (
                        console.log(element),
                        <div key={index}>
                            {element.blocktype === 'text' ? <span className="blogViewMarkdownContainer"><ReactMarkdown>{element.blockcontent}</ReactMarkdown></span> : null}
                            {element.blocktype === 'image' ?
                                <div className="blogViewImageContainer">
                                    <img
                                        src={element.blockcontent}
                                        className="blogViewImage"
                                    />
                                </div> : null}
                        </div>
                    ))}
                </Flex>
            </Flex>
        </Container>
    );
}

export default ViewPage;