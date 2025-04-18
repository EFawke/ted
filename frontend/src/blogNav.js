// BlogNav.js
import React from "react";
import { Flex } from "@radix-ui/themes";
import "./css/App.css";
import BlogCard from "./blogCard";
import axios from 'axios';

class BlogNav extends React.Component {
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
                {this.state.posts.map((post) => {
                    return (
                        <BlogCard key={post.id} post={post} isLive={post.islive} />
                    )
                })}
            </Flex>
        );
    }
}

export default BlogNav;