import React from "react";
import { Flex, Text, Heading } from "@radix-ui/themes";

class DataVisBottom extends React.Component {
    render() {
        const { slots } = this.props;

        // Optional: determine a scaling factor based on the max number of runs
        const maxRuns = Math.max(...slots.map(s => s.runs), 1);
        const maxHeight = 150; // px

        return (
            <Flex direction="column" mt="4" gap="3">
                <Heading size="4">Scheduled Slots</Heading>

                {slots.length === 0 ? (
                    <Text size="2" color="gray">No slots allocated yet.</Text>
                ) : (
                    <Flex wrap="wrap" gap="2" align="end">
                        {slots.map((slot, index) => {
                            // const height = (slot.runs / maxRuns) * maxHeight;
                            const height = (slot.runs * 0.75)
                            return (
                                <div
                                    key={index}
                                    className={`reaction-bar ${slot.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                    style={{
                                        height: `${height}px`,
                                        width: '40px',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        padding: '6px',
                                        textAlign: 'center',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        transition: 'height 0.3s ease-in-out',
                                    }}
                                >

                                    <Text size="1" weight="bold" style={{ lineHeight: 1 }}>
                                        {slot.runs}
                                    </Text>
                                    <Text
                                        size="1"
                                        color="gray"
                                        style={{
                                            writingMode: 'vertical-rl',
                                            transform: 'rotate(180deg)',
                                            whiteSpace: 'nowrap',
                                            textAlign: 'center',
                                            lineHeight: 1,
                                            marginTop: '4px',
                                            maxHeight: '200px',
                                            overflow: 'hidden',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {slot.name}
                                    </Text>
                                </div>
                            );
                        })}
                    </Flex>
                )}
            </Flex>
        );
    }
}

export default DataVisBottom;
