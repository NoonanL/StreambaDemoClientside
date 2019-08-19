import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dashboard as dashboardRoutes, auth as authRoutes } from "./index";

import DashboardLayout from "../components/layouts/Dashboard";
import AuthLayout from "../components/layouts/Auth";

function ChildRoutes({ layout: Layout, routes }) {
  return (
    <Layout>
      <Switch>
        {routes.map((category, index) =>
          category.children ? (
            // Route item with children
            category.children.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact
                component={route.component}
              />
            ))
          ) : (
            // Route item without children
            <Route
              key={index}
              path={category.path}
              exact
              component={category.component}
            />
          )
        )}
      </Switch>
    </Layout>
  );
}

function Routes() {
  return (
    <Router>
      <Switch>
        {/* Auth routes */}
        <Route
          path="/auth/*"
          exact
          component={() => (
            <ChildRoutes layout={AuthLayout} routes={authRoutes} />
          )}
        />

        {/* Dashboard routes */}
        <Route
          path="/*"
          exact
          component={() => (
            <ChildRoutes layout={DashboardLayout} routes={dashboardRoutes} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
