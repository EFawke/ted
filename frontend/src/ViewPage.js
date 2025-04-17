import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Container, Text, AspectRatio, Flex, Link, Badge } from "@radix-ui/themes";
import axios from 'axios';
import Header from './Header.js';
import { AuthProvider } from './authentication/AuthContext.js';
import ReactMarkdown from 'react-markdown';
import ScheduleDemo from './components/ScheduleDemo.js';
import './css/App.css';

function ViewPage() {
    const { id } = useParams();
    const [elements, setElements] = useState([]);
    const [title, setTitle] = useState('');
    const [headerImage, setHeaderImage] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (id) {
            axios.post('/api/blog', { action: 'fetchPost', blogId: id })
                .then((res) => {
                    const postData = res.data[0];
                    setTitle(postData.blogtitle);
                    setElements(res.data);
                    setHeaderImage(postData.headerimage || '');

                    // Handle tags parsing safely
                    let tagsData = [];
                    try {
                        if (postData.tags) {
                            tagsData = typeof postData.tags === 'string'
                                ? JSON.parse(postData.tags)
                                : postData.tags;
                        }
                    } catch (e) {
                        console.error('Error parsing tags:', e);
                        tagsData = postData.tags?.split(',').map(t => t.trim()) || [];
                    }
                    setTags(tagsData);
                })
                .catch(console.error);
        }
    }, [id]);

    const [loggedIn, setIsLoggedIn] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return !!storedUser;
    });

    return (
        <Container size="3" className="blog-container">
            {/* <AuthProvider> */}
            <Header loggedIn={loggedIn} />
            {/* </AuthProvider> */}
            <Flex direction="column" gap="4">
                {headerImage && (
                    <img
                        src={headerImage}
                        alt="Header"
                        style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            borderRadius: 'var(--radius-3)',
                            maxHeight: '360px'
                        }}
                    />
                )}

                <Heading size="9" weight="bold" mb="4">{title}</Heading>

                {tags.length > 0 && (
                    <Flex gap="2" wrap="wrap" mb="4">
                        {tags.map((tag, index) => (
                            <Badge key={index} variant="soft" radius="full">
                                {tag}
                            </Badge>
                        ))}
                    </Flex>
                )}

                <Flex direction="column" gap="2">
                    {elements.map((element, index) => (
                        <div key={index}>
                            {element.blocktype === 'text' && (
                                <div className="blog-content">
                                    <ReactMarkdown>
                                        {element.blockcontent}
                                    </ReactMarkdown>
                                </div>
                            )}

                            {element.blocktype === 'image' && (
                                <img
                                    src={element.blockcontent}
                                    alt="Blog content"
                                    style={{
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 'var(--radius-3)'
                                    }}
                                />
                            )}
                            {element.blocktype === 'component' && (
                                <ScheduleDemo/>
                            )}
                        </div>
                    ))}
                </Flex>
            </Flex>
        </Container>
    );
}

export default ViewPage;