import "@radix-ui/themes/styles.css";
import { Box, ThemePanel, Container, Flex, Section, Heading, Text, Card } from "@radix-ui/themes";
import './App.css';
import { useState } from "react";

const About = (props) => {
    return (
        <Box id="about">
            <Box mt="7">
                {/* <Card style={{padding: "1.25rem"}}> */}
                <Box className = "about_paragraph">
                    <Text size="4">
                        Hey, I'm Ted Fawke, a full stack web developer with a business oriented mindset. I love everything about the internet and I'm always interested in learning new technologies. My approach to software development is always to keep the user as my guiding light, and to create as good an experience as possible.
                    </Text>
                </Box>
                <Box mt="5" className = "about_paragraph">
                    <Text size="4">
                        I'm currently working at <b>Paramount Web Technology</b>, where we create custom e-commerce solutions for businesses all around the world. Woocommerce and Wordpress are our bread and butter, but we also branch out into other technologies, such as React and Node.js.
                    </Text>
                </Box>
                <Box mt="5" className = "about_paragraph">
                    <Text size="4">
                        My background is a little all over the place, I like to 
                    </Text>
                    <Text size="4"><b> shake things up</b></Text>
                    <Text size="4">
                        . I have some strong business experience as I co-founded a company when I was way too young, and I also have a degree in Philosophy. I would like to think that both my business experience and my philosophical background have helped me when it comes to figuring out how to create the best software possible for my clients.
                    </Text>
                </Box>
                <Box mt="5" className = "about_paragraph">
                    <Text size="4">
                        In my free time I'll play some chess, go skiing, or be working on my next personal project. I love travel, history, and computers.
                    </Text>
                </Box>
                {/* </Card> */}
            </Box>
        </Box>
    )
}

export default About;