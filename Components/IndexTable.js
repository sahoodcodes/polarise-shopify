import {
  TextField,
  IndexTable,
  TextStyle,
  Card,
  Filters,
  Select,
  Tabs,
  Heading,
  Modal,
  TextContainer,
  DisplayText,
  rgbaString,
  Button, Popover, ActionList, Checkbox
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
// import Modal from "./Modal"

let checkList = []
export default function IndexTableWithFilteringExample(props) {
  const [mapData, setmapData] = useState([])
  const [modal, setmodal] = useState({})
  const [rating, setRating] = useState({})
  const [filtering, setfiltering] = useState([])
  const getStaticProps = async () => {
    const ref = await fetch('https://fakestoreapi.com/products')
    const data = await ref.json();
    // console.log(data);
    setmapData(data)
    setfiltering(data)
    // checkList = []
  }

  useEffect(() => {
    getStaticProps()
  }, [])

  const resourceName = {
    singular: "customer",
    plural: "mapData",
  };

  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState("");
  // const [sortValue, setSortValue] = useState("today");

  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = () => {
    setQueryValue("")
    getStaticProps()
  }
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);
  // const handleSortChange = useCallback((value) => setSortValue(value), []);

  const filters = [
    {
      key: "taggedWith",
      label: "More Filters",
      filter: (
        <TextField
          label="More Filters"
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
      {
        key: "taggedWith",
        label: disambiguateLabel("taggedWith", taggedWith),
        onRemove: handleTaggedWithRemove,
      },
    ]
    : [];


  const rowMarkup = mapData.map(
    (product, index) => (
      <IndexTable.Row
        id={product.id}
        key={product.id}
        position={index}
        onClick={() => getModal(product)}

      >
        <IndexTable.Cell> <img src={product.image} alt="img"
          style={{ width: "2rem", height: "2.5rem", marginLeft: "1rem" }}
          onClick={() => getModal(product)}
        /> </IndexTable.Cell>

        <IndexTable.Cell>
          <TextStyle variation="strong" >
            <h6 onClick={() => getModal(product)}>{product.title.substring(0, 40) + "..."}</h6>
          </TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell><h6 onClick={() =>
          getModal(product)}>{product.price}</h6></IndexTable.Cell>
        <IndexTable.Cell><h6 onClick={() =>
          getModal(product)}>{product.category}</h6></IndexTable.Cell>
      </IndexTable.Row>

    )
  );


  const [selected, setSelected] = useState(0);
  const [searchvalue, setsearchvalue] = useState(null)
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
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
  function getModal(product) {
    setRating(product.rating)
    setmodal(product)
    setActive(!active)
  }
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);


  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Sales channels
    </Button>
  );

  const [popoverActive2, setPopoverActive2] = useState(false);
  const togglePopoverActive2 = useCallback(
    () => setPopoverActive2((popoverActive2) => !popoverActive2),
    []
  );
  const activator2 = (
    <Button onClick={togglePopoverActive2} disclosure>
      Sales channels
    </Button>
  );

  const setWC = async (set, check, filter) => {
    if (check) {
      set(false)
      checkList = checkList.filter(e => e != filter)
    } else {
      set(true)
      checkList.push(filter)
    }
    const ref = await fetch('https://fakestoreapi.com/products')
    const data = await ref.json();
    setfiltering(data)
    setWC2()
  }

  const setWC2 = async () => {
    let map = []
    if (checkList.length == 0) {
      setmapData(filtering)
    } else {
      filtering.forEach((data) => {
        checkList.forEach((list) => {
          if (data.category == list) {
            map.push(data)
          }
        })
        setmapData(map)
      })
    }
  }
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

  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const handleCheck3 = useCallback((newChecked) => setChecked3(newChecked), []);
  const handleCheck4 = useCallback((newChecked1) => setChecked4(newChecked1), []);
  const handleCheck5 = useCallback((newChecked2) => setChecked5(newChecked2), []);

  //////////////////////RETURN///////////////////////RETURN////////////////////////

  return (

    <div style={{ margin: "8rem", marginTop: "2rem" }} >
      <Card>
        <div></div>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {/* <Card.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </Card.Section> */}
        </Tabs>
        <div style={{ padding: "16px", display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Filters
              queryValue={queryValue}
              filters={filters}
              onQueryChange={search}
              onChange={(e) => search(e.target.value)}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
            />
          </div>
          <div style={{ paddingLeft: "0.25rem", display: "flex" }}>
            <Popover
              active={popoverActive}
              activator={activator}
              autofocusTarget="first-node"
              onClose={togglePopoverActive}
            >
              <Popover.Pane fixed>

              </Popover.Pane>
              <Popover.Pane>
                <ActionList
                  actionRole="menuitem"
                  items={[
                    {
                      content: <Checkbox
                        label="Women's Clothing"
                        checked={checked}
                        onChange={() => setWC(setChecked, checked, "women's clothing")}
                      />
                    },
                    {
                      content: <Checkbox
                        label="Men's Clothing "
                        checked={checked1}
                        onChange={() => setWC(setChecked1, checked1, "men's clothing")}
                      />
                    },
                    {
                      content: <Checkbox
                        label="Jewelery"
                        checked={checked2}
                        onChange={() => setWC(setChecked2, checked2, "jewelery")}
                      />
                    },
                  ]}
                />
              </Popover.Pane>
            </Popover>

            <Popover
              active={popoverActive2}
              activator={activator2}
              autofocusTarget="first-node"
              onClose={togglePopoverActive2}
            >
              <Popover.Pane fixed>

              </Popover.Pane>
              <Popover.Pane>
                <ActionList
                  actionRole="menuitem"
                  items={[
                    {
                      content: <Checkbox
                        label="Online Store"
                        checked={checked3}
                        onChange={handleCheck3}
                      />
                    },
                    {
                      content: <Checkbox
                        label="Point of Sale "
                        checked={checked4}
                        onChange={handleCheck4}
                      />
                    },
                    {
                      content: <Checkbox
                        label="Buy Button"
                        checked={checked5}
                        onChange={handleCheck5}
                      />
                    },
                  ]}
                />
              </Popover.Pane>
            </Popover>

          </div>
        </div>
        <div>
          <IndexTable
            resourceName={resourceName}
            itemCount={mapData.length}
            // secondaryActions={[{ content: 'About', onAction: log }]}
            headings={[
              { title: "Product" },
              { title: "Name" },
              { title: "Price" },
              { title: "Category" },
            ]}
            selectable={false}
          >
            {rowMarkup}
          </IndexTable>
        </div>
      </Card>
      <div>
        <div style={{ height: "500px" }}>
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
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case "More Filters":
        return `More Filters`;
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