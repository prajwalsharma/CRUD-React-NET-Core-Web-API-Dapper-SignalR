import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";

import "./custom.css";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Layout>
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/fetch-data" component={FetchData} />
            <ProtectedRoute path="/create" component={Create} />
            <ProtectedRoute path="/edit/:id" component={Edit} />
          </Layout>
        </Switch>
      </>
    );
  }
}
