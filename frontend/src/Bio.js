import "@radix-ui/themes/styles.css";
import { Card, Text, Flex, Heading } from "@radix-ui/themes";

const Bio = (props) => {
    return (
        // <Card>
            <Flex gap="1rem" style={{ padding: "0.5rem" }} width="100%">
                <Flex direction="column" align="start" width="100%">
                    <Flex mb="2" gap="2" direction="row" align="center">
                        <Heading size="4" weight="medium">About Me</Heading>
                    </Flex>
                    <Flex maxWidth="100%" align="center" gap="5" direction="row">
                        <Text>Hi, I’m Ted, I ship technology to make life simpler, smarter, and more productive.</Text>
                    </Flex>
                </Flex>
            </Flex>
        // </Card>
    );
};

export default Bio;