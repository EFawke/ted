import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel, Container, Flex, Section, Heading } from "@radix-ui/themes";
import './App.css';
import Links from "./links.js";
import BlogNav from "./blogNav.js";


function App() {
  return (
    <Theme appearance="light" accentColor="blue" grayColor="mauve" scaling="90%">
      <ThemePanel />
      <Container size="4">
        <Flex gap="4" direction="row" justify="between" id="weird_flex_bro">
          <Section id="left_page" top="0">
            <Flex justify="between" height="100%" direction="column">
              <Flex gap="4" direction="column">
                <Heading mt="6" size="9">Ted Fawke</Heading>
                <Heading weight="medium" size="6">Some words about coding</Heading>
              </Flex>
              {/* <Navigation /> */}
              {/* <TinyAbout /> */}
              <Links />
            </Flex>
          </Section>
          <Section id="right_page">
            <Flex gap="4" direction="column">
              <BlogNav />
            </Flex>
          </Section>
        </Flex>
      </Container>
    </Theme>
  );
}

export default App;
