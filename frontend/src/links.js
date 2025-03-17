import "@radix-ui/themes/styles.css";
import { Box, Flex, Link } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons"
import AddNewPostButton from "./newPostButtonLinks.js";


const Links = (props) => {
    const loggedIn = props.loggedIn;
    const isAdmin = props.isAdmin;
    if (!loggedIn || !isAdmin) {
        return (
            <Box mb="7" id="links">
                <Flex gap="5" direction="row">
                    <Link href="mailto:teduardof@gmail.com">
                        <EnvelopeClosedIcon height="30" width="30" className="socials" />
                    </Link>
                    <Link href="https://github.com/EFawke">
                        <GitHubLogoIcon height="30" width="30" className="socials" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/eduardo-fawke-34b658231/">
                        <LinkedInLogoIcon height="30" width="30" className="socials" />
                    </Link>
                </Flex>
            </Box>
        )
    } else {
        return (
            <AddNewPostButton />
        )
    }
}

export default Links;