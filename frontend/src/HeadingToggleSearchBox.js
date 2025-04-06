import React from "react";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

class BlogNavHeader extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current?.focus();
    }

    render() {
        return (
            <Flex align="center">
                <Heading weight="medium" size="8">Recent posts</Heading>
            </Flex>
        );
    }
}

export default BlogNavHeader;
