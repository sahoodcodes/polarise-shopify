import {
     Button, Heading, Popover, ActionList, 
} from "@shopify/polaris";
import { useCallback, useState } from 'react';

export default function Navbar() {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []);

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            More actions
        </Button>);
        
    return (
        <div className={"navbar"} >
            <div>
                <h1 className='nav-left' >polarise test</h1>
            </div>
            <div className="nav-right" >
                <div className="nav-right-Header" >
                    <Heading  >Export</Heading>
                </div>
                <div className="nav-right-Header" >
                    <Heading  >import</Heading>
                </div>
                <div className="nav-right-drop" >
                    <div>
                        <Popover
                            active={popoverActive}
                            activator={activator}
                            autofocusTarget="first-node"
                            onClose={togglePopoverActive}
                        >
                            <ActionList
                                actionRole="menuitem"
                                items={[{ content: "Import" }, { content: "Export" }]}
                            />
                        </Popover>
                    </div>
                </div>
                <div className="nav-right-button " >
                    <Button  >
                        Add Product
                    </Button>
                </div>
            </div>
        </div>
    )
}