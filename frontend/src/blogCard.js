// BlogCard.js
import "@radix-ui/themes/styles.css";
import { Card, Text, Link, Flex, Badge } from "@radix-ui/themes";
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

    return (
        // <Link href={isAdmin ? `/edit/${props.post.blogid}` : `/view/${props.post.blogid}`}> 
        //       style={{ textDecoration: "none" }}>
            <Card>
                <Flex direction="row" gap="1rem" style={{ padding: "0.5rem" }} width="100%">
                    <Flex direction="column" align="start" width="100%">
                        <Flex
                        onMouseEnter={selectCurrent} onMouseLeave={selectCurrent} 
                        className={selected ? "" : "not_selected_project"}>
                            <Link href={isAdmin ? `/edit/${props.post.blogid}` : `/view/${props.post.blogid}`} mb="2" size="4" weight="medium" style={{cursor: 'pointer'}}>{props.post.blogtitle}</Link>
                            <ArrowTopRightIcon 
                                className={selected ? "icon_pos animate_up_right" : "icon_pos animate_down_left"} 
                                height="15" width="15" 
                                style={{ paddingLeft: ".5rem" }} />
                        </Flex>
                        <Flex maxWidth="100%">
                            <BlogText content={props.post.blockcontent} />
                        </Flex>
                        <Flex className="tools_container" mt="2" gap="2" direction="row" width="100%" justify="end">
                            {props.post.isLive === false ? <Badge color="orange">Archived</Badge> : null}
                            <Text size="3" weight="light">{datePosted}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        // </Link>
    );
};

export default BlogCard;