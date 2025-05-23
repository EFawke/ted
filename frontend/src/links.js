import "@radix-ui/themes/styles.css";
import { Box, Flex, Link } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons"
import AddNewPostButton from "./newPostButtonLinks.js";
import { useAuth } from './authentication/AuthContext.js';

const Links = () => {
    const { user } = useAuth();
    const isAdmin = user?.isAdmin;

    if (!isAdmin) {
        return (
            <Box mb="7" id="links">
                <Flex gap="5" direction="row">
                    <Link href="mailto:teduardof@gmail.com">
                        <EnvelopeClosedIcon height="30" width="30" className="socials" />
                    </Link>
                    <Link href="https://github.com/EFawke">
                        <GitHubLogoIcon height="30" width="30" className="socials" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/ted-fawke-34b658231/">
                        <LinkedInLogoIcon height="30" width="30" className="socials" />
                    </Link>
                </Flex>
            </Box>
        )
    } else {
        return <AddNewPostButton />
    }
}

export default Links;