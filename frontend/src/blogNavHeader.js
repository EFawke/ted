import React from "react";
import { Box, Container, Flex, Section, Heading, Text, Card, IconButton } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import HeadingToggleSearchBox from "./HeadingToggleSearchBox";


class BlogNavHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isHovered: false,
        }
    }

    render() {
        const { isHovered } = this.state;

        return (
            <Flex style={{ width: "100%" }} onMouseEnter={() => this.setState({ isHovered: true })} onMouseLeave={() => this.setState({ isHovered: false })}>
                <HeadingToggleSearchBox />
            </Flex>
        );
    }
}

export default BlogNavHeader;