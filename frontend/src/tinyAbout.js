import React from "react";
import { Box, ThemePanel, Container, Flex, Section, Heading, Text, Card } from "@radix-ui/themes";
import './App.css';
import { useState } from "react";

const TinyAbout = (props) => {
    return (
        <Box>
            <Box mt="2">
                <Box className = "about_paragraph">
                    <Text size="4">
                        Hey, I'm Ted Fawke, a full stack web developer with a business oriented mindset. I love everything about the internet and I'm always interested in learning new technologies. My approach to software development is always to keep the user as my guiding light, and to create as good an experience as possible.
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default TinyAbout;