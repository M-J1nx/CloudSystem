import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CampaignsEdit from "./pages/CampaignsEdit";
import CampaignsAdd from "./pages/CampaignsAdd";
import CreateAccount from "./pages/CreateAccount";
import SignIn from "./pages/SignIn";
import Campaigns from "./pages/Campaigns";
import Templates from "./pages/Templates";
import TemplateEdit from "./pages/TemplateEdit";
import TemplateAdd from "./pages/TemplateAdd";
import Mails from "./pages/Mails";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    if (pathname.startsWith('/campaigns-edit/')) {  // 동적 경로
      title = "";
      metaDescription = "";
    }

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/dashboard":
        title = "";
        metaDescription = "";
        break;
      case "/main":
        title = "";
        metaDescription = "";
        break;
      case "/customers":
        title = "";
        metaDescription = "";
        break;
      case "/campaigns-edit":
        title = "";
        metaDescription = "";
        break;
        case "/campaigns-add":
          title = "";
          metaDescription = "";
          break;
      case "/create-account":
        title = "";
        metaDescription = "";
        break;
      case "/sign-in":
        title = "";
        metaDescription = "";
        break;
      case "/campaigns":
        title = "";
        metaDescription = "";
        break;
      case "/templates":
        title = "";
        metaDescription = "";
        break;
      case "/template-add":
        title = "";
        metaDescription = "";
        break;
        case "/template-edit":
          title = "";
          metaDescription = "";
          break;
      case "/mails":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/main" element={<Main />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/campaigns-edit/:event_id" element={<CampaignsEdit />} />
      <Route path="/campaigns-add" element={<CampaignsAdd />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/template-add" element={<TemplateAdd />} />
      <Route path="/templates/:templateName/edit" element={<TemplateEdit />} />
      <Route path="/mails" element={<Mails />} />
    </Routes>
  );
}
export default App;
