import React from "react";
import { Box, Container, Flex, Section, Heading, Text, Card } from "@radix-ui/themes";
import "./App.css";
import BlogCard from "./blogCard";
import axios from 'axios';
import BlogNavHeader from "./blogNavHeader";

class BlogNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        axios.post('/api/blog', {action: 'fetchAllPosts'})
        .then((response) => {
            // console.log(response.data);
            let blogs = [];
            for(let i = 0; i < response.data.length; i++) {
                if(response.data[i].blockorder === 0 && response.data[i].islive == true){
                    blogs.push(response.data[i]);
                }
            }
            this.setState({posts: blogs});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Flex direction="column" gap="4" mt="6">
                <BlogNavHeader />
                {this.state.posts.map((post) => {
                    return (
                        <BlogCard key={post.id} post={post} isAdmin={this.props.isAdmin}/>
                    )
                })}
                {/* <BlogCard /> */}
            </Flex>
        );
    }
}

export default BlogNav;