import "@radix-ui/themes/styles.css";
import { Box, Flex, Section } from "@radix-ui/themes";
import './App.css';
import ProjectsCard from "./ProjectsCard";

const Projects = () => {
    return (
        <Section mt="9" id="projects">
            <Flex gap="4" direction="column">
                <ProjectsCard
                    title="Project 1"
                    description="This is a description of project 1"
                    link="https://evesubsystemanalysis.herokuapp.com/"
                    image="/evesubsystemanalysis.png"
                />
            </Flex>
        </Section>
    );
};

export default Projects;
