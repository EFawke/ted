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
                {/* <MagnifyingGlassIcon 
                    style={{
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        opacity: "0.6",
                        pointerEvents: "none", // Prevent interaction
                    }} 
                    width="20" 
                    height="20" 
                />

                <Box style={{ flexGrow: 1 }}>
                    <input
                        ref={this.inputRef}
                        type="text"
                        placeholder="Recent posts"
                        style={{
                            width: "100%",
                            fontSize: "24px",
                            fontWeight: "300",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            padding: "0 0 0 35px", // Add left padding so text doesn't overlap icon
                            fontFamily: "Roboto, sans-serif",
                        }}
                    />
                </Box> */}
            </Flex>
        );
    }
}

export default BlogNavHeader;
