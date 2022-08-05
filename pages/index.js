import {
  AppProvider,
  Page,
  Card,
  ResourceList,
  Avatar,
  TextStyle,
} from "@shopify/polaris";
import Navbar from '../Components/Navbar';
import IndexTable from '../Components/IndexTable';


export default function Home() {

  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: "Sort by",
            defaultItemSingular: "item",
            defaultItemPlural: "items",
            showing: "Showing {itemsCount} {resource}",
            Item: {
              viewItem: "View details for {itemName}",
            },
          },
          Common: {
            checkbox: "checkbox",
          },
        },
      }}>

      <div>
        <Navbar />
        <div>
          <IndexTable />
        </div>
      </div>

    </AppProvider>

  )
}
