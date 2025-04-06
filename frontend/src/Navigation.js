import "@radix-ui/themes/styles.css";
import { Box, ThemePanel, Container, Flex, Section, Heading, Link } from "@radix-ui/themes";
import './css/App.css';
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