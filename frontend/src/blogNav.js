// BlogNav.js
import React from "react";
import { Box, Container, Flex, Section, Heading, Text, Card } from "@radix-ui/themes";
import "./css/App.css";
import BlogCard from "./blogCard";
import axios from 'axios';
import BlogNavHeader from "./blogNavHeader";
// import { AuthContext } from './authentication/AuthContext.js';
// import { useAuth } from './AuthContext.js';

class BlogNav extends React.Component {
    // static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        const isAdmin = this.props.isAdmin;
        axios.post('/api/blog', { action: 'fetchAllPosts' })
            .then((response) => {
                let blogs = [];
                for (let i = 0; i < response.data.length; i++) {
                    if (isAdmin) {
                        if (response.data[i].blockorder === 0) {
                            blogs.push(response.data[i]);
                        }
                    }
                    else {
                        if (response.data[i].blockorder === 0 && response.data[i].islive == true) {
                            blogs.push(response.data[i]);
                        }
                    }
                }
                this.setState({ posts: blogs });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAdmin !== prevProps.isAdmin) {
            this.componentDidMount();
        }
    }

    render() {
        return (
            <Flex direction="column" gap="4" mt="6">
                <BlogNavHeader />
                {this.state.posts.map((post) => {
                    // console.log(post);
                    return (
                        <BlogCard key={post.id} post={post} isLive={post.islive} />
                    )
                })}
            </Flex>
        );
    }
}

export default BlogNav;