import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel, Container, Flex, Section, Heading } from "@radix-ui/themes";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Links from "./links.js";
import BlogNav from "./blogNav.js";
import EditPage from './EditPage.js';
import Header from './Header.js';
import { useState } from 'react';

function Home() {
  const [loggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Container size="4">
      <Flex gap="4" direction="row" justify="between" id="weird_flex_bro">
        <Section id="left_page" top="0">
          <Flex justify="between" height="100%" direction="column">
            <Flex gap="4" direction="column">
              <Heading mt="6" size="9">Ted Fawke</Heading>
              <Heading weight="medium" size="6">Some words about coding</Heading>
            </Flex>
            <Links loggedIn = {loggedIn} isAdmin = {isAdmin} />
          </Flex>
        </Section>
        <Section id="right_page">
          <Flex gap="4" direction="column">
            <Header/>
            <BlogNav loggedIn = {loggedIn} isAdmin = {isAdmin} />
          </Flex>
        </Section>
      </Flex>
    </Container>
  );
}

function App() {
  return (
    <Theme appearance="dark" accentColor="blue" grayColor="mauve" scaling="90%">
      {/* <ThemePanel /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
