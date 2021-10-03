import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";

import "./custom.css";
import Create from "./components/Create";
import Edit from "./components/Edit";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/fetch-data" component={FetchData} />
          <Route path="/create" component={Create} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="*" component={Home} />
        </Switch>
      </Layout>
    );
  }
}
