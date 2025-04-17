import React, { useState } from 'react';
import { Flex, Avatar, Button, IconButton, Dialog, Link, Text, Badge, Separator } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";
import GoogleLoginButton from './authentication/GoogleLoginButton.js';
import { useAuth } from './authentication/AuthContext.js';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleRegister = () => {
        setIsRegistering(prev => !prev);
    };

    return (
        <Flex
            gap="4"
            pt={location.pathname === "/" ? "0" : "4"}
            pb={location.pathname === "/" ? "0" : "4"}
            mb={location.pathname === "/" ? "0" : "5"}
            mt={location.pathname === "/" ? "0" : "5"}
            direction="row"
            justify={location.pathname === "/" ? "end" : "between"}
            id="header"
        >
            {location.pathname !== "/" && <Link href="/" size="6">Go back</Link>}

            <Dialog.Root>
                <Dialog.Trigger>
                    {isAuthenticated ? (
                        <Flex align="center" gap="2">
                            {user?.isAdmin && <Badge color="ruby" variant="soft">Admin</Badge>}
                            <IconButton radius="full" variant="outline" color="gray">
                                <Avatar
                                    src={user?.picture}
                                    fallback={user?.name ? user.name[0] : "U"}
                                />
                            </IconButton>
                        </Flex>
                    ) : (
                        <IconButton size="3" radius="full" variant="outline" color="gray">
                            <PersonIcon height="25" width="25" />
                        </IconButton>
                    )}
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    {isAuthenticated ? (
                        <Flex gap="3" direction="column">
                            <Dialog.Title>Account</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                {user?.isAdmin && <Badge color="ruby" mr="2">Admin</Badge>}
                                Logged in as {user?.name}
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
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <GoogleLoginButton />
                            </div>
                            <Separator my="3" size="4" />

                            <Flex gap="3" mt="4" justify="between">
                                <Button variant="soft" color="gray" onClick={toggleRegister}>
                                    {isRegistering ? "Back to Login" : "Register Instead"}
                                </Button>
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">Cancel</Button>
                                </Dialog.Close>
                            </Flex>
                        </>
                    )}
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    );
};

export default Header;