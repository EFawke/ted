import { Flex, Text, Button, DataList, Badge, Separator, Code, IconButton, Link, Heading, TextField, Tooltip } from "@radix-ui/themes";
import DataVisTop from "./datavistop";
import DataVisBottom from "./datavisbottom";
import React from "react";

class ScheduleDemoOptimized extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultReactions: [
                { name: "Fulleroferrocene", runs: 99 },
                { name: "PPD Fullerene Fibers", runs: 100 },
                { name: "Lanthanum Metallofullerene", runs: 118 },
                { name: "Fullerene Intercalated Graphite", runs: 196 },
                { name: "Methanofullerene", runs: 226 },
                { name: "Graphene Nanoribbons", runs: 236 },
                { name: "Scandium Metallofullerene", runs: 609 },
                { name: "Carbon-86 Epoxy Resin", runs: 834 },
            ],
            numSlots: 13,
            slots: [],
            status: "Ready",
            percentageStep: 0,
            iterationCounter: 0,
            stepDelay: null,
            lastInputNumSlots: 13,
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
        this.setState(prevState => ({
            iterationCounter: prevState.iterationCounter + 1
        }));
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
            return { success: true, schedule };
        } else {
            return { success: false, schedule: null };
        }
    };

    scheduleReactions = async (reactions, slots) => {
        if (slots > 1000) {
            slots = 1000; // Safety cap
        }

        if (slots <= reactions.length) {
            this.setState({ slots: reactions, numSlots: 0, status: "Done", isPaused: false });
            return;
        }

        const sortedReactions = reactions.sort((a, b) => a.runs - b.runs);
        const reacRunsSum = sortedReactions.reduce((acc, curr) => acc + Number(curr.runs), 0);
        const meanRuns = Math.ceil(reacRunsSum / slots);

        let numAboveMean = 1;
        let lastFail = 0;
        let lastSuccess = null;

        while (true) { // exponential
            const { success } = await this.runScheduleAlgorithm(numAboveMean, sortedReactions, meanRuns, slots);

            if (success) {
                lastSuccess = numAboveMean;
                break;
            } else {
                lastFail = numAboveMean;
                numAboveMean *= 2;

                if (numAboveMean > reacRunsSum) {
                    lastSuccess = reacRunsSum;
                    break;
                }
            }
        }

        let bestSchedule = null
        let low = lastFail
        let high = lastSuccess;

        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            const { success, schedule } = await this.runScheduleAlgorithm(
                mid, sortedReactions, meanRuns, slots
            );

            if (success) {
                bestSchedule = schedule;  // record this working schedule
                high = mid;               // shrink from above, keeping mid in play
            } else {
                low = mid + 1;            // discard mid and everything below
            }
        }

        // At this point low === high: that's the smallest value that *could* succeed.
        // We need to run it one last time to be sure and to grab the schedule.
        const { success: finalOk, schedule: finalSched } =
            await this.runScheduleAlgorithm(low, sortedReactions, meanRuns, slots);

        if (finalOk) {
            bestSchedule = finalSched;
        } else {
            // console.log(`✘ final check at ${low} failed — no valid schedule`);
        }
    }

    applySchedule = async () => {
        if (this.state.status === "Done") {
            this.setState({
                status: "Ready",
                slots: [],
                percentageStep: 0,
                numSlots: this.state.lastInputNumSlots,
                iterationCounter: 0
            });
            return;
        }

        let { defaultReactions, numSlots } = this.state;

        if (Number(numSlots) < defaultReactions.length) {
            const updatedSlotCount = defaultReactions.length;
            this.setState({ numSlots: updatedSlotCount }, async () => {
                await this.scheduleReactions(defaultReactions, this.state.numSlots);
            });
        } else {
            await this.scheduleReactions(defaultReactions, numSlots);

        }
    };


    changeNumSlots = (newNumSlots) => {
        this.setState({ numSlots: newNumSlots });
        this.setState({ lastInputNumSlots: newNumSlots });
    }

    changeStepDelay = (newStepDelay) => {
        this.setState({ stepDelay: newStepDelay });
    }

    handleMainButtonClick = async () => {
        if (this.state.status === "Running...") {
            this.togglePause();
        } else {
            await this.applySchedule();
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
                                    placeholder="0"
                                    // value={this.state.stepDelay}
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
                                placeholder="0"
                                value={this.state.numSlots || ""}
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
                        <Code size="2" weight="bold">{this.state.iterationCounter}</Code>
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

export default ScheduleDemoOptimized;