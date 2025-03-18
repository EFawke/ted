import React from 'react';
import { Flex, Button, Dialog, Text, Avatar } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import axios from 'axios';

class AddImageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image || null,
            file: this.props.file || null,
            open: this.props.open || false,
            uploading: this.props.uploading || false
        };
    }

    handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({ file });
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    
    render() {
        const { image, uploading, file } = this.state;
        return (
            <Dialog.Root open={this.state.open} onOpenChange={open => this.setState({ open })}>
                <Dialog.Trigger>
                    <Button><PlusIcon /> Add Image</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Add Image to Blog Post</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Upload an image for your blog post.
                    </Dialog.Description>

                    <Flex direction="column" gap="3" align="center">
                        {image && <Avatar src={image} size="5" />}
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Upload Image
                            </Text>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={this.handleImageChange}
                                disabled={uploading}
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Button 
                            variant="soft" 
                            color="gray"
                            onClick={() => this.setState({ open: false })}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={() => {
                                this.props.onSave(file)
                                this.setState({ open: false })
                                this.setState({ image: null })
                                this.setState({ file: null })
                                this.setState({ uploading: false })
                            }}
                            disabled={!image || uploading}
                        >
                            {uploading ? 'Uploading...' : 'Save'}
                        </Button>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        );
    }
}

export default AddImageButton;