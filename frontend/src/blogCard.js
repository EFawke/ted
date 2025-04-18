// BlogCard.js
import "@radix-ui/themes/styles.css";
import { Card, Text, Link, Flex, Badge, Avatar } from "@radix-ui/themes";
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import './css/App.css';
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useAuth } from './authentication/AuthContext.js';

function BlogText({ content }) {
    return (
        <Text
            truncate
            asChild
            size="3"
            weight="light"
        >
            <div style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
            }}>
                <ReactMarkdown
                    components={{
                        p: ({ node, ...props }) => <span {...props} />,
                    }}>
                    {content}
                </ReactMarkdown>
            </div>
        </Text>
    );
}

const BlogCard = (props) => {
    const { user } = useAuth();
    const isAdmin = user?.isAdmin;
    const [selected, setSelected] = useState(false);

    const selectCurrent = () => {
        setSelected(!selected);
    }

    const [datePosted] = useState(() => {
        let date = new Date(props.post.blogdate);
        return date.toDateString()
    });

    const truncatedContent = (text) => {
        const maxLength = 100; // Set the maximum length for truncation
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    }

    const tags = props.post.tags.slice(0, 3); // Limit the number of tags to 3

    console.log(props);

    return (
        <Card>
            <Flex direction="row" gap="1rem" style={{ padding: "0.5rem" }} width="100%">
                <img src={props.post.headerimage} alt="Blog Image" style={{width: "30%", objectFit: "cover", borderRadius: "calc(8px*0.9*1)"}}/>
                <Flex direction="column" align="start" width="100%">
                    <Flex mb="2" gap = "2" direction="row" align="center">
                        <Link href={isAdmin ? `/edit/${props.post.blogid}` : `/view/${props.post.blogid}`} size="4" weight="medium" style={{ cursor: 'pointer' }}>{props.post.blogtitle}</Link>
                    </Flex>
                    <Flex maxWidth="100%" align="center" gap="5" direction="row">
                        <Text>{truncatedContent(props.post.blockcontent)}</Text>
                    </Flex>
                    <Flex mt="4" gap="2" direction="row" width="100%" justify="between" align="end">
                        <Flex className="tools_container" gap="3" direction="row" align="center">
                            {tags.map((tag) => {
                                return (
                                    <Badge key={tag} variant="soft" size="2" color="blue">
                                        {tag}
                                    </Badge>
                                )
                            })}
                        </Flex>
                        <Text size="2" weight="light">{datePosted}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};

export default BlogCard;