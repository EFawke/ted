import { Flex, Text, Button, DataList, Badge, Separator, Code, IconButton, Link, Heading, TextField, Tooltip } from "@radix-ui/themes";
import DataVisTop from "./datavistop";
import DataVisBottom from "./datavisbottom";
import React from "react";

class ScheduleDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultReactions: [
                { name: "Fulleroferrocene", runs: 13 },
                { name: "PPD Fullerene Fibers", runs: 13 },
                { name: "Lanthanum Metallofullerene", runs: 15 },
                { name: "Fullerene Intercalated Graphite", runs: 25 },
                { name: "Methanofullerene", runs: 29 },
                { name: "Graphene Nanoribbons", runs: 30 },
                { name: "Scandium Metallofullerene", runs: 77 },
                { name: "Carbon-86 Epoxy Resin", runs: 105 },
            ],
            numSlots: 15,
            slots: [],
            status: "Ready",
            percentageStep: 0,
            stepDelay: 0,
            lastInputNumSlots: 15,
            isPaused: false,
        }
        this.resumeResolver = null;
    }

    togglePause = () => {
        this.setState(prevState => {
            const newIsPaused = !prevState.isPaused;
            if (!newIsPaused && this.resumeResolver) {
                this.resumeResolver();
                this.resumeResolver = null;
            }
            return { isPaused: newIsPaused };
        });
    };

    runScheduleAlgorithm = async (numAboveMean, sortedReactions, meanRuns, slots) => {
        this.setState({ status: "Running...", isPaused: false });
        this.setState({ percentageStep: numAboveMean });
        let schedule = [];
        let availableSlots = slots;
        const meanRunsPlusX = meanRuns + numAboveMean;

        for (let i = 0; i < sortedReactions.length; i++) {
            if (this.state.isPaused) {
                await new Promise(resolve => this.resumeResolver = resolve);
            }

            const numberOfInitialRuns = Math.floor(sortedReactions[i].runs / meanRunsPlusX);
            const numberLeftOver = sortedReactions[i].runs - (meanRunsPlusX * numberOfInitialRuns);

            for (let j = 0; j < numberOfInitialRuns; j++) {
                schedule.push({
                    name: sortedReactions[i].name,
                    runs: meanRunsPlusX,
                });
                availableSlots -= 1;
                this.setState({ slots: schedule, numSlots: availableSlots });

                if (this.state.stepDelay > 0) {
                    await new Promise(resolve => setTimeout(resolve, this.state.stepDelay));
                    if (this.state.isPaused) {
                        await new Promise(resolve => this.resumeResolver = resolve);
                    }
                }
            }

            if (sortedReactions[i].runs % meanRunsPlusX !== 0) {
                schedule.push({
                    name: sortedReactions[i].name,
                    runs: numberLeftOver,
                });
                availableSlots -= 1;
                this.setState({ slots: schedule, numSlots: availableSlots });

                if (this.state.stepDelay > 0) {
                    await new Promise(resolve => setTimeout(resolve, this.state.stepDelay));
                    if (this.state.isPaused) {
                        await new Promise(resolve => this.resumeResolver = resolve);
                    }
                }
            }
        }

        if (availableSlots >= 0) {
            this.setState({ status: "Done", isPaused: false });
            return schedule;
        } else {
            return this.runScheduleAlgorithm(numAboveMean + 1, sortedReactions, meanRuns, slots);
        }
    };

    scheduleReactions = (reactions, slots) => {
        let schedule = false;

        if (slots > 1000) {
            slots = 1000; // restricting a bullshit number of slots here
        }
        const sortedReactions = reactions.sort((a, b) => a.runs - b.runs)
        const reacRunsSum = sortedReactions.reduce((acc, curr) => acc + Number(curr.runs), 0);
        const meanRuns = Math.round(reacRunsSum / slots)
        const numAboveMean = 0;

        if (slots <= sortedReactions.length) {
            return sortedReactions;
        } else {
            schedule = this.runScheduleAlgorithm(numAboveMean + 1, sortedReactions, meanRuns, slots);
        }

        return schedule;
    }

    applySchedule = () => {

        if (this.state.status === "Done") {
            this.setState({ status: "Ready", slots: [], percentageStep: 0, numSlots: this.state.lastInputNumSlots });

            return;
        }

        let { defaultReactions, numSlots } = this.state;

        if (numSlots < defaultReactions.length) {
            numSlots = defaultReactions.length;
            this.setState({ numSlots: numSlots });
        }

        const reactions = [...defaultReactions].sort((a, b) => a.runs - b.runs);
        const reacRunsSum = reactions.reduce((acc, curr) => acc + Number(curr.runs), 0);
        const meanRuns = Math.ceil(reacRunsSum / numSlots);

        const numAboveMean = 0;

        this.runScheduleAlgorithm(numAboveMean, reactions, meanRuns, numSlots);
    }

    changeNumSlots = (newNumSlots) => {
        this.setState({ numSlots: newNumSlots });
        this.setState({ lastInputNumSlots: newNumSlots });
    }

    changeStepDelay = (newStepDelay) => {
        this.setState({ stepDelay: newStepDelay });
    }

    handleMainButtonClick = () => {
        if (this.state.status === "Running...") {
            this.togglePause();
        } else {
            this.applySchedule();
        }
    };

    getButtonText = () => {
        const { status, isPaused } = this.state;
        if (status === "Done") return "Reset";
        if (status === "Running...") return isPaused ? "Resume" : "Pause";
        return "Let's go";
    };

    render() {
        const buttonText = this.getButtonText();
        return (
            <Flex direction="column" gap="2" padding="4">
                <DataVisTop stepDelay={this.state.stepDelay} changeNumSlots={this.changeNumSlots} changeStepDelay={this.changeStepDelay} percentageStep={this.state.percentageStep} defaultReactions={this.state.defaultReactions} numSlots={this.state.numSlots} status={this.state.status}></DataVisTop>
                <Separator my="3" size="4" />
                <Flex gap="3" align="end" wrap="wrap" id="controls" justify="between">
                    <Flex direction="column" gap="1">
                        <Tooltip content="Delay between each step in milliseconds">
                            <Flex direction="column" gap="1">
                                <Text size="2" weight="bold">Step Delay:</Text>
                                <TextField.Root
                                    type="number"
                                    value={this.state.stepDelay}
                                    onChange={(e) => this.changeStepDelay(Number(e.target.value))}
                                    size="2"
                                >
                                    <TextField.Slot side="right">
                                        ms
                                    </TextField.Slot>
                                </TextField.Root>
                            </Flex>
                        </Tooltip>
                    </Flex>
                    <Tooltip content="Number of slots available for reactions">
                        <Flex direction="column" gap="1">
                            <Text size="2" weight="bold">Number of Slots:</Text>
                            <TextField.Root
                                type="number"
                                value={this.state.numSlots}
                                onChange={(e) => this.changeNumSlots(Number(e.target.value))}
                                size="2"
                            />
                        </Flex>
                    </Tooltip>
                    <Flex direction="column" gap="1">
                        <Text size="2" weight="bold">Status:</Text>
                        <Code size="2" weight="bold">{this.state.status}</Code>
                    </Flex>

                    <Flex direction="column" gap="1">
                        <Text size="2" weight="bold">Step:</Text>
                        <Code size="2" weight="bold">{this.state.percentageStep}</Code>
                    </Flex>
                    <Button onClick={this.handleMainButtonClick}>
                        {this.getButtonText()}
                    </Button>
                </Flex>
                <Separator my="3" size="4" />
                <DataVisBottom slots={this.state.slots} />
            </Flex>
        );
    }
}

export default ScheduleDemo;