import App from "./App.jsx";
import SearchResult from "./pages/SearchResult/SearchResult.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "searchresult",
    element: <SearchResult />,
  },
];

export default routes;
