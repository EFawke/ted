import "@radix-ui/themes/styles.css";
import { Box } from "@radix-ui/themes";
import './App.css';

const Experience = () => {
    return (
        <Box mt="7" id="experience" height="100vh">
            <iframe
                src="/Resume Ted Fawke.pdf"
                title="Ted Fawke's CV"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
            />
        </Box>
    );
};

export default Experience;
