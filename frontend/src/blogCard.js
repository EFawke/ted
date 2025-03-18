import "@radix-ui/themes/styles.css";
import { Card, Text, Link, Flex } from "@radix-ui/themes";
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import './App.css';
import { useState } from "react";

const BlogCard = (props) => {

    console.log(props);

    const [selected, setSelected] = useState(false);

    const selectCurrent = () => {
        setSelected(!selected);
    }

    const [datePosted, setDatePosted] = useState(() => {
        let date = new Date(props.post.blogdate);
        return date.toDateString()
    });

    return (
        <Link href={props.isAdmin ? `/edit/${props.post.blogid}` : `/view/${props.post.blogid}`} style={{textDecoration: "none"}}>
            <Card onMouseEnter = {selectCurrent} onMouseLeave={selectCurrent} className = {selected ? "" : "not_selected_project"}>
                <Flex direction="row" gap="1rem" style={{padding: "0.5rem"}} width="100%">
                    <Flex direction="column" align="start" width="100%">
                        <Flex>
                            <Link mb="2" size="4" weight="medium">{props.post.blogtitle}</Link>
                            <ArrowTopRightIcon className={selected ? "icon_pos animate_up_right" : "icon_pos animate_down_left"} height="15" width="15" style={{paddingLeft: ".5rem"}}/>
                        </Flex>
                        <Flex maxWidth="100%">
                            <Text size="3" weight="light" truncate>{props.post.blockcontent}</Text>
                        </Flex>
                        <Flex className="tools_container" mt="2" gap="2" direction="row" width="100%" justify="end">
                            <Text size="3" weight="light">{datePosted}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Link>
    );
};

export default BlogCard;
