import "@radix-ui/themes/styles.css";
import { Card, AspectRatio, Text, Link, Flex, Heading } from "@radix-ui/themes";
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import './App.css';
import ProjectsCard from "./ProjectsCard";
import { useState } from "react";

const Projects = (props) => {

    const [selected, setSelected] = useState(false);

    const selectCurrent = () => {
        setSelected(!selected);
        console.log(selected);
    }

    return (
        <Link href="https://evesubsystemanalysis.herokuapp.com/" style={{textDecoration: "none"}}>
            <Card onMouseEnter = {selectCurrent} onMouseLeave={selectCurrent} className = {selected ? "" : "not_selected_project"}>
                <Flex direction="row" gap="1rem" style={{padding: "0.5rem"}}>
                    <Flex ratio={16 / 9} style={{width: "25%"}} align="start">
                        <AspectRatio ratio={16 / 9}>
                            <img src="/evesubsystemanalysis.png" alt="Project 1" style={{ border: "1px solid", borderRadius: "5px", width: "100%", objectFit: "cover" }} />
                        </AspectRatio>
                    </Flex>
                    <Flex direction="column" align="start" width="75%">
                        <Flex>
                            <Link mb="2" size="4" weight="medium">Eve Subsystem Analysis</Link>
                            <ArrowTopRightIcon className={selected ? "icon_pos animate_up_right" : "icon_pos animate_down_left"} height="15" width="15" style={{color: "rgba(255, 255, 255, 0.73)", paddingLeft: ".5rem"}}/>
                        </Flex>
                        <Text size="3" weight="light">The most comprehensive tool on the web for analysing the subsystem market in Eve Online. View trade volume, market orders, real-time price data, and recent losses.</Text>
                        <Flex className="tools_container" mt="4" gap="2" direction="row">
                            <Text size="3" className = "tech_stack">React</Text>
                            <Text size="3" className = "tech_stack">Node.js</Text>
                            <Text size="3" className = "tech_stack">PostgreSQL</Text>
                            <Text size="3" className = "tech_stack">Heroku</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Link>
    );
};

export default Projects;
