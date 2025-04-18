// App.js
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel, Container, Flex, Section, Heading, HoverCard, Text, Link } from "@radix-ui/themes";
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import Links from "./links.js";
import BlogNav from "./blogNav.js";
import EditPage from './EditPage.js';
import ViewPage from './ViewPage.js';
import Header from './Header.js';
import { useEffect } from 'react';
import ReactGA from "react-ga4";
import { AuthProvider } from './authentication/AuthContext.js';
import { useAuth } from './authentication/AuthContext.js';
// import { useAuth } from './authentication/AuthContext.js';
import { ProtectedRoute } from './ProtectedRoute';
import Login from './login.js';
import './css/App.css';

const trackingId = "G-YB6KV33SG7";

function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

function Home() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

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
            </HoverCard.Root>
            <Links />
          </Flex>
        </Section>
        <Section id="right_page">
          <Flex gap="4" direction="column">
            <Header />
            <BlogNav isAdmin={isAdmin} />
          </Flex>
        </Section>
      </Flex>
    </Container>
  );
}

function App() {
  useEffect(() => {
    ReactGA.initialize(trackingId);
    ReactGA.send("pageview");
  }, []);

  return (
    <Theme appearance="dark" accentColor="blue" grayColor="mauve" scaling="90%">
      <AuthProvider>
        <Router>
          <TrackPageViews />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={
              <ProtectedRoute adminOnly>
                <EditPage />
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute adminOnly>
                <EditPage />
              </ProtectedRoute>
            } />
            <Route path="/view" element={<ViewPage />} />
            <Route path="/view/:id" element={<ViewPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Theme>
  );
}

export default App;