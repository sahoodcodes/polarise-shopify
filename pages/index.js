import {
  AppProvider,
} from "@shopify/polaris";
import Navbar from '../Components/Navbar';
import Table2 from '../Components/Table2';
import translations from "@shopify/polaris/locales/en.json";

export default function Home() {

  return (
    <AppProvider
    i18n={translations}>

      <div>
        <Navbar />
        <div>
          <Table2 />
        </div>
      </div>

    </AppProvider>

  )
}
