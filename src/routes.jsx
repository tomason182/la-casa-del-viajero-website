import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import SearchResult from "./pages/SearchResult/SearchResult.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "searchresult",
    element: <SearchResult />,
  },
];

export default routes;
