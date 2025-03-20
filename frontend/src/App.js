import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel, Container, Flex, Section, Heading } from "@radix-ui/themes";
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import './App.css';
import Links from "./links.js";
import BlogNav from "./blogNav.js";
import EditPage from './EditPage.js';
import ViewPage from './ViewPage.js';
import Header from './Header.js';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";

const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

console.log(trackingId);

function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

function Home() {
  const [loggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

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
  useEffect(() => {
    ReactGA.initialize(trackingId);
    ReactGA.send("pageview"); // Tracks initial page load
  }, []);
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <Theme appearance="dark" accentColor="blue" grayColor="mauve" scaling="90%">
      {/* <ThemePanel /> */}
      <Router>
        <TrackPageViews/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<EditPage isAdmin={isAdmin} />} />
          <Route path="/edit/:id" element={<EditPage isAdmin={isAdmin} />} />
          <Route path="/view" element={<ViewPage isAdmin={isAdmin} />} />
          <Route path="/view/:id" element={<ViewPage isAdmin={isAdmin} />} />
        </Routes>
      </Router>
    </Theme>
  );
}

export default App;
