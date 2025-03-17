// write up a class componenet called header

import React from 'react';
import { Flex, Avatar, Tooltip, Button, IconButton } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }
    render() {
        const { loggedIn } = this.state;
        return (
            <Flex gap="4" direction="row" justify="end" id="header">
                {loggedIn ?
                    <Tooltip content="Log out">
                        <IconButton>
                            <Avatar fallback="T"></Avatar>
                        </IconButton>
                    </Tooltip> :
                    <Tooltip content="Log in">
                        <IconButton radius="full" variant="outline">
                            <PersonIcon></PersonIcon>
                        </IconButton>
                    </Tooltip>
                }
            </Flex>
        );
    }
}

export default Header;