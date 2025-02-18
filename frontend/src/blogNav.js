import React from "react";
import { Box, Container, Flex, Section, Heading, Text, Card } from "@radix-ui/themes";
import './App.css';
import { useState } from "react";
import BlogCard from "./blogCard";

const BlogNav = (props) => {
    return (
        <Flex direction="column" gap="4" mt="6">
            <Heading weight="light" size="7" mb="3">/Posts</Heading>
            <BlogCard />
            {/* <BlogCard /> */}
            {/* <BlogCard />
            <BlogCard /> */}
        </Flex>
    )
}

export default BlogNav;