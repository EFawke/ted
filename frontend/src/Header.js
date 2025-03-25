import React from 'react';
import { Flex, Avatar, Tooltip, Button, IconButton, Dialog, Link, Separator, Text } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";
import GoogleLoginButton from './GoogleLoginButton';
import { AuthContext } from './AuthContext.js';

class Header extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            location: window.location.pathname,
            isRegistering: false,
        };
    }

    toggleRegister = () => {
        this.setState(prevState => ({ isRegistering: !prevState.isRegistering }));
    };

    componentDidMount() {
        window.addEventListener('popstate', this.handleLocationChange);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.handleLocationChange);
    }

    handleLocationChange = () => {
        this.setState({ location: window.location.pathname });
    };

    render() {
        const { location, isRegistering } = this.state;
        const { user, isAuthenticated, logout } = this.context;

        return (
            <Flex gap="4"
                pt={location === "/" ? "0" : "4"}
                pb={location === "/" ? "0" : "4"}
                mb={location === "/" ? "0" : "5"}
                mt={location === "/" ? "0" : "5"}
                direction="row"
                justify={location === "/" ? "end" : "between"}
                id="header"
            >
                {location !== "/" && <Link href="/" size="6">Go back</Link>}

                <Dialog.Root>
                    <Dialog.Trigger>
                        {isAuthenticated ? ( // Use context's isAuthenticated directly
                            <IconButton radius="full" variant="outline" color="gray">
                                <Avatar
                                    src={user?.picture}
                                    fallback={user?.name ? user.name[0] : "U"}
                                />
                            </IconButton>
                        ) : (
                            <IconButton size="3" radius="full" variant="outline" color="gray">
                                <PersonIcon height="25" width="25" />
                            </IconButton>
                        )}
                    </Dialog.Trigger>

                    <Dialog.Content maxWidth="450px">
                        {isAuthenticated ? ( // Use context's isAuthenticated directly
                            <Flex gap="3" direction="column">
                                <Dialog.Title>Log out</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    Logged in as {user?.name}, log out?
                                </Dialog.Description>
                                <Dialog.Close>
                                    <Button variant="soft" color="gray" onClick={logout}>
                                        Log Out
                                    </Button>
                                </Dialog.Close>
                            </Flex>
                        ) : (
                            <>
                                <Dialog.Title>{isRegistering ? "Register" : "Log In"}</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    {isRegistering
                                        ? "Don't have an account? Register now."
                                        : "Log in to your account to continue."}
                                </Dialog.Description>

                                <GoogleLoginButton/>

                                <Separator my="3" size="4" />

                                <Flex gap="3" mt="4" justify="between">
                                    <Button variant="soft" color="gray" onClick={this.toggleRegister}>
                                        {isRegistering ? "Back to Login" : "Register Instead"}
                                    </Button>
                                    <Dialog.Close>
                                        <Button variant="soft" color="gray">Cancel</Button>
                                    </Dialog.Close>
                                </Flex>
                            </>)
                        }
                    </Dialog.Content>
                </Dialog.Root>
            </Flex>
        );
    }
}

export default Header;