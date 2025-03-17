import { Link } from 'react-router-dom';
import { Box, Flex } from "@radix-ui/themes";
import { Pencil2Icon, LinkedInLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons"


function AddNewPostButton() {
  return (
    <Flex>
      <Link to="/edit"><Pencil2Icon height="30" width="30" className="socials"/></Link>
    </Flex>
  );
}

export default AddNewPostButton;
