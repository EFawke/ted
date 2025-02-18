import "@radix-ui/themes/styles.css";
import { Card, AspectRatio, Text, Link, Flex, Heading } from "@radix-ui/themes";
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import './App.css';
import ProjectsCard from "./ProjectsCard";
import { useState } from "react";

const BlogCard = (props) => {

    const [selected, setSelected] = useState(false);

    const selectCurrent = () => {
        setSelected(!selected);
        console.log(selected);
    }

    const [datePosted, setDatePosted] = useState("16/01/2025");

    return (
        <Link href="https://evesubsystemanalysis.herokuapp.com/" target="_blank" style={{textDecoration: "none"}}>
            <Card onMouseEnter = {selectCurrent} onMouseLeave={selectCurrent} className = {selected ? "" : "not_selected_project"}>
                <Flex direction="row" gap="1rem" style={{padding: "0.5rem"}} width="100%">
                    <Flex direction="column" align="start" width="100%">
                        <Flex>
                            <Link mb="2" size="4" weight="medium">Project Postmortem - Eve Subsystem Analysis</Link>
                            <ArrowTopRightIcon className={selected ? "icon_pos animate_up_right" : "icon_pos animate_down_left"} height="15" width="15" style={{paddingLeft: ".5rem"}}/>
                        </Flex>
                        <Text size="3" weight="light">I built a third-party app for Eve Online.</Text>
                        <Flex className="tools_container" mt="2" gap="2" direction="row" width="100%" justify="end">
                            <Text size="3" weight="light">{datePosted}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Link>
    );
};

export default BlogCard;
