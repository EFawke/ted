import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel, Container, Flex, Section, Heading, HoverCard, Text, Link } from "@radix-ui/themes";
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import './App.css';
import Links from "./links.js";
import BlogNav from "./blogNav.js";
import EditPage from './EditPage.js';
import ViewPage from './ViewPage.js';
import Header from './Header.js';
import { useState, useEffect } from 'react';
import ReactGA from "react-ga4";
import { AuthProvider } from './AuthContext.js';


const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;

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
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Flex gap="4" direction="column">
                  <Heading mt="6" size="9">Ted Fawke</Heading>
                  <Heading weight="medium" size="6">Some words about coding</Heading>
                </Flex>
              </HoverCard.Trigger>
              <HoverCard.Content side="top" sideOffset="8" align="start">
                <Flex gap="2" direction="column">
                  <Text>Hey I'm Ted Fawke, a web developer currently based in London.</Text>
                  <Text>For work, I split my time between making e-commerce websites at <Link href="https://paramountwebtechnology.com/">Paramount Web Technology</Link>, and building Shopify apps at <Link href="https://eloquentintelligence.com/.stag1ng/">Eloquent</Link>.</Text>
                  <Text>In my free time I enjoy learning new frameworks and technologies, and building slick, <Link href="https://evesubsystemanalysis.com">Analytics Dashboards</Link> for Eve Online.</Text>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
            <Links loggedIn={loggedIn} isAdmin={isAdmin} />
          </Flex>
        </Section>
        <Section id="right_page">
          <Flex gap="4" direction="column">
            <AuthProvider>
              <Header />
            </AuthProvider>
            <BlogNav loggedIn={loggedIn} isAdmin={isAdmin} />
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
    <Theme appearance="dark" accentColor="iris" grayColor="mauve" scaling="90%">
      {/* <ThemePanel /> */}
      <Router>
        <TrackPageViews />
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
