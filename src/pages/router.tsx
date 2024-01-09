import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layout";

import HomePage from "./HomePage/HomePage";
import ErrorPage from "./ErrorPage/ErrorPage";
import NewEventPage from "./NewEventPage/NewEventPage";
import VotePage from "./VotePage/VotePage";
import CompletedPage from "./CompletedPage/CompletedPage";
import ActionsPage from "./ActionsPage/ActionsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage />} />
        <Route path="new" element={<NewEventPage />} />
        <Route path="vote" element={<VotePage />} />
        <Route path="completed/:did" element={<CompletedPage />} />
        <Route path="actions" element={<ActionsPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

export default router;
