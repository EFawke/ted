import "@radix-ui/themes/styles.css";
import { Box, ThemePanel, Container, Flex, Section, Heading, Link } from "@radix-ui/themes";
import './App.css';
// import { useState, Component } from "react";
import React from "react";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagePosition: 0,
            aboutHeight: 0,
            experienceHeight: 0,
            projectsHeight: 0,
            currentSection: "about"
        }
    }

    // handleScroll() {
    //     console.log("scrolling");
    // }

    // setCurrentSection(e) {
    //     console.log(e.target.href);
    //     const href = e.target.href;
    //     const section = href.split("#")[1];
    //     this.setState({
    //         currentSection: section
    //     })
    // }

    // componentDidMount() {
    //     const about = document.getElementById("about");
    //     const experience = document.getElementById("experience");
    //     const projects = document.getElementById("projects");
    //     this.setState({
    //         aboutHeight: about.offsetTop,
    //         // experienceHeight: experience.offsetTop,
    //         // projectsHeight: projects.offsetTop,
    //     })
    //     window.addEventListener('scroll', this.handleScroll);
    // }

    render() {
        const currentSection = this.state.currentSection;
        return (
            <Box id = "nav_box">
                <Flex gap="4" direction="column" mb="7">
                    <Link height="100%" className="nav-container">
                        <span className={currentSection == "about" ? "nav-selected" : "nav-select"}></span>
                        <Link className="navigation_button" href="#about" weight="bold">ABOUT</Link>
                    </Link>
                    <Link height="100%" className="nav-container">
                        <span className={currentSection == "projects" ? "nav-selected" : "nav-select"}></span>
                        <Link className="navigation_button" href="#projects" weight="bold">PROJECTS</Link>
                    </Link>
                </Flex>
            </Box>
        );
    }
}

export default Navigation;