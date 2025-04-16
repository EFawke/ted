import React from "react";
import { Flex, Text, DataList, Badge, Code, Heading, TextField } from "@radix-ui/themes";

class DataVisTop extends React.Component {
    render() {
        const { defaultReactions, numSlots, status } = this.props;

        return (
            <Flex className = "top_container" mt="2" gap="2" justify="between">
                <DataList.Root>
                    {defaultReactions.map((reaction, index) => (
                        <DataList.Item key={index} align="center">
                            <DataList.Label>
                                <Text size="2"
                                    className={`reaction-name ${reaction.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                    weight="bold">{reaction.name}</Text>
                            </DataList.Label>
                            <DataList.Value>
                                <Code size="2" weight="bold">{reaction.runs} runs</Code>
                            </DataList.Value>
                        </DataList.Item>
                    ))}
                </DataList.Root>
            </Flex>
        );
    }
}

export default DataVisTop;
