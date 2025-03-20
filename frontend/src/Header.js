// write up a class componenet called header

import React from 'react';
import { Flex, Avatar, Tooltip, Button, IconButton, Dialog } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons"
import GoogleLoginButton from './GoogleLoginButton';

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
                <Dialog.Root>
                    <Dialog.Trigger>
                        {loggedIn ?
                            <IconButton radius="full" variant="outline" color="gray">
                                <Tooltip content="Log in">
                                    <Avatar fallback="T"></Avatar>
                                </Tooltip>
                            </IconButton> :
                            <IconButton radius="full" variant="outline" color="gray">
                                <Tooltip content="Log in">
                                    <PersonIcon></PersonIcon>
                                </Tooltip>
                            </IconButton>
                        }
                    </Dialog.Trigger>
                    <Dialog.Content maxWidth="450px">
                        <Dialog.Title>Sign In</Dialog.Title>
                        <Dialog.Description size="2" mb="4">
                            Sign in to your account to continue.
                        </Dialog.Description>
                        <GoogleLoginButton></GoogleLoginButton>
                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>
            </Flex>
        );
    }
}

export default Header;