import {
    TextField,
    IndexTable,
    TextStyle,
    Card,
    ChoiceList,
    Filters,
    useIndexResourceState,
    Select,
    Tabs,
    Heading,
    Frame,
    Loading,
    Badge,
    Modal,
    TextContainer,
    DisplayText,
    rgbaString,
    Button, Popover, ActionList, Checkbox
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import translations from "@shopify/polaris/locales/en.json";
// import Modal from "./Modal"

let checkList = []
var List = []

export default function IndexTableWithFilteringExample(props) {
    const [availability, setAvailability] = useState(null);
    const [productType, setProductType] = useState(null);
    const [taggedWith, setTaggedWith] = useState(null);
    const [queryValue, setQueryValue] = useState(null);
    const [filtering, setfiltering] = useState([])
    const [mapData, setmapData] = useState([])
    const [rating, setRating] = useState({})
    const [cancel, setCancel] = useState(false)
    const [searchvalue, setsearchvalue] = useState(null)
    const [modal, setmodal] = useState({})
    const [active, setActive] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);

    const getStaticProps = async () => {
        const ref = await fetch('https://fakestoreapi.com/products')
        const data = await ref.json();
        setmapData(data)
        setfiltering(data)
    }
    useEffect(() => {
        getStaticProps()
    }, [])

    const handleAvailabilityChange = useCallback(
        async (value) => {
            // setCancel(!cancel)
            setAvailability(value)

            setWork()

        }
        , []);
    const handleProductTypeChange = useCallback(
        (value) => setProductType(value),
        []
    );
    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        []
    );
    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        []
    );
    const handleAvailabilityRemove = useCallback(() => setAvailability(null), []);
    const handleProductTypeRemove = useCallback(() => setProductType(null), []);
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
    const handleQueryValueRemove = () => {
        setQueryValue("")
        getStaticProps()
    }
    const handleFiltersClearAll = useCallback(() => {
        handleAvailabilityRemove();
        handleProductTypeRemove();
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [
        handleAvailabilityRemove,
        handleQueryValueRemove,
        handleProductTypeRemove,
        handleTaggedWithRemove,
    ]);

    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            setSelected(selectedTabIndex)
            if(selectedTabIndex){
                getStaticProps()
            }else{
                setmapData([])
            }
        },
        []
      );
    const tabs = [
        {
          id: "all-customers-1",
          content: "All",
          accessibilityLabel: "All customers",
          panelID: "all-customers-content-1",
        },
        {
          id: "accepts-marketing-1",
          content: "Active",
          panelID: "accepts-marketing-content-1",
        },
        {
          id: "repeat-customers-1",
          content: "Draft",
          panelID: "repeat-customers-content-1",
        },
        {
          id: "prospects-1",
          content: "Archived",
          panelID: "prospects-content-1",
        },
      ];

    const filters = [
        {
            key: "productType",
            label: "Product type",
            filter: (
                <ChoiceList
                    title="Availability"
                    titleHidden
                    choices={[
                        { label: "Women's Clothing", value: "women's clothing" },
                        { label: "Men's Clothing", value: "men's clothing" },
                        { label: "Jewelery", value: "jewelery" },
                    ]}
                    selected={availability || []}
                    onChange={handleAvailabilityChange}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
        {
            key: "availability",
            label: "Availability",
            filter: (
                <ChoiceList
                    title="Product type"
                    titleHidden
                    choices={[
                        { label: "T-Shirt", value: "T-Shirt" },
                        { label: "Accessory", value: "Accessory" },
                        { label: "Gift card", value: "Gift card" },
                    ]}
                    selected={productType || []}
                    onChange={handleProductTypeChange}
                    allowMultiple
                />
            ),
            shortcut: true,
        },
        {
            key: "taggedWith",
            label: "Tagged with",
            filter: (
                <TextField
                    label="Tagged with"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    autoComplete="off"
                    labelHidden
                />
            ),
        },
    ];

    const appliedFilters = [];
    if (!isEmpty(availability)) {
        const key = "availability";
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, availability),
            onRemove: handleAvailabilityRemove,
        });
        checkList = availability
    }
    if (!isEmpty(productType)) {
        const key = "productType";
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, productType),
            onRemove: handleProductTypeRemove,
        });

    }
    if (!isEmpty(taggedWith)) {
        const key = "taggedWith";
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, taggedWith),
            onRemove: handleTaggedWithRemove,
        });

    }


    async function setWork() {
        let map = []
        const ref = await fetch('https://fakestoreapi.com/products')
        const data = await ref.json();
        if (checkList.length == List.length) {
            console.log(checkList, List, "hjk");
            getStaticProps()
        } else {
            data.forEach((data) => {
                checkList.forEach((list) => {
                    if (data.category == list) {
                        map.push(data)
                    }
                })
            })
            List = [...checkList]
            console.log(checkList, List);

            setmapData(map)
            console.log(map);
        }
    }
    const resourceName = {
        singular: "customer",
        plural: "mapData",
    };
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(mapData);
    const rowMarkup = mapData.map(
        (product, index) => (
            <IndexTable.Row
                id={product.id}
                key={product.id}
                position={index}
            // onClick={() => getModal(product)}

            >
                <IndexTable.Cell> <img src={product.image} alt="img"
                    style={{ width: "2rem", height: "2.5rem"}}
                    onClick={() => getModal(product)}
                /> </IndexTable.Cell>

                <IndexTable.Cell>
                    <TextStyle variation="strong" >
                        <h6 onClick={() => getModal(product)}>{product.title.substring(0, 40) + "..."}</h6>
                    </TextStyle>
                </IndexTable.Cell>
                <IndexTable.Cell><h6 onClick={() =>
                    getModal(product)}> <Badge></Badge></h6></IndexTable.Cell>
                    <IndexTable.Cell><h6 onClick={() =>
                    getModal(product)}>Rs. {product.price}</h6></IndexTable.Cell>
                <IndexTable.Cell><h6 onClick={() =>
                    getModal(product)}>{product.category}</h6></IndexTable.Cell>
            </IndexTable.Row>

        )
    );

    const search = async (value = '') => {
        console.log(value);
        if (!value == "") {
            setQueryValue(value)
            const ref = await fetch('https://fakestoreapi.com/products')
            const map = await ref.json();
            console.log(map);
            const newFilter = map.filter((valu) => {
                var title = valu.title.toLowerCase();
                return title.includes(value.toLowerCase());
            })
            setmapData(newFilter)
        }
        else {
            handleQueryValueRemove()
        }
    }

    function getModal(product) {
        setRating(product.rating)
        setmodal(product)
        setActive(!active)
      }
    return (

        <div style={{ margin: "8rem", marginTop: "2rem" }}>
           
            <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {/* <Card.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Card.Section> */}
        </Tabs>
                <div style={{padding:"1rem"}} >
                <Card.Section>
                    <Filters
                        queryValue={queryValue}
                        filters={filters}
                        // appliedFilters={appliedFilters}
                        onQueryClear={handleQueryValueRemove}
                        onClearAll={handleFiltersClearAll}
                        onQueryChange={search}
                        onChange={(e) => search(e.target.value)}
                    />
                </Card.Section>
                <IndexTable
                    resourceName={resourceName}
                    itemCount={mapData.length}
                    selectedItemsCount={
                        allResourcesSelected ? "All" : selectedResources.length
                    }
                    onSelectionChange={handleSelectionChange}
                    headings={[
                        { title: "Name" },
                        { title: "Title" },
                        { title: "Status" },
                        { title: "Price" },
                        { title: "Catogory" },
                    ]}
                    selectable={false}
                >
                    {rowMarkup}
                </IndexTable>
                <div>
        <div >
          <Modal
            open={active}
            onClose={handleChange}
            title={modal.title}
          >
            <Modal.Section>
              <TextContainer>
                <div className="modal-container">
                  <div className="modal-image">
                    <img src={modal.image} alt="" />
                  </div>
                  <div className="modal-horzondal"></div>
                  <div className="modal-description"
                    style={{ marginLeft: "2rem" }}>
                    <h1>Description:</h1> <br />
                    <p>{modal.description}</p>
                  </div>
                  <div className="modal-horzondal"></div>
                  <div className="modal rating"
                    style={{ marginLeft: "2rem" }}>
                    <h1>Rating:</h1> <br />
                    <span style={{ fontWeight: "bolder", }} > Rating: </span>
                    <span> &nbsp;{rating.rate}</span>  <br />
                    <span style={{ fontWeight: "bolder", }} > Rated by: </span>
                    <span> &nbsp;{rating.count}</span>
                  </div>
                </div>
              </TextContainer>
            </Modal.Section>
          </Modal>
        </div>
        <Modal props={{ modal, rating }} />
      </div>
      </div>
            </Card>
            <Frame>
            <Loading />
        </Frame>
        </div>
        
    );

    function disambiguateLabel(key, value) {

        switch (key) {
            case "taggedWith":
                return `Tagged with ${value}`;
            case "availability":
                return value.map((val) => `Available on ${val}`).join(", ");
            case "productType":
                return value.join(", ");
            default:
                return value;
        }

    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === "" || value == null;
        }
    }
}