import {
    Button, Heading, Popover, ActionList, Frame, Loading,
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
        <div>
            {/* <Frame>
            <Loading />
        </Frame> */}
            <div className={"navbar"} >

                <div>
                    <h1 className='nav-left' >Products</h1>
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
                            <Heading>
                            <select class="dropdown" >
        <option selected hidden>More Option</option>
        <option value="michel">Option A</option>
        <option value="thiago">Option B</option>
</select>
</Heading>
                        </div>
                    </div>
                    <div className="nav-right-button " >
                        <Button  >
                            Add Product
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}