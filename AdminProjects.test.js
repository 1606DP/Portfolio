import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AdminProjects from "./client/src/pages/Admin/AdminProjects";
import rootSlice from "./client/src/redux/rootSlice";

describe("AdminProjects", () => {
  it("renders without crashing when portfolio data has not loaded yet", () => {
    const store = configureStore({
      reducer: {
        root: rootSlice,
      },
      preloadedState: {
        root: {
          loading: false,
          portfolioData: null,
          reloadData: false,
        },
      },
    });

    render(
      <Provider store={store}>
        <AdminProjects />
      </Provider>
    );

    expect(screen.getByRole("button", { name: /add project/i })).toBeInTheDocument();
  });
});
