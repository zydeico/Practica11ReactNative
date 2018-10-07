import React, { Component } from "react";
import { StatusBar, TouchableOpacity, Text } from "react-native";
import { Router, Scene, Stack, Actions } from "react-native-router-flux";
import { Heroes, Hero, HeroAdd } from "./sections/";
import * as api from "../api/";
import * as Colors from "./../commons/colors";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import * as reducers from "../redux/";
const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
);

const sceneDefaultStyles = {
  navigationBarStyle: { backgroundColor: Colors.primay },
  backButtonTintColor: "white",
  backButtonTextStyle: { color: "white" },
  titleStyle: { color: "white" }
};

const AddHeroButton = props => (
  <TouchableOpacity onPress={() => Actions.heroAdd()}>
    <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
      {"  +  "}
    </Text>
  </TouchableOpacity>
);

export default class App extends Component {
  componentWillMount() {
    api.configure();
    StatusBar.setBarStyle("light-content");
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root">
            <Scene
              key="heroes"
              component={Heroes}
              hideNavBar={false}
              initial={true}
              title="SPIDER-RN"
              renderRightButton={AddHeroButton}
              {...sceneDefaultStyles}
            />
            <Scene key="hero" component={Hero} {...sceneDefaultStyles} />
            <Scene
              key="heroAdd"
              title={"ADD NEW SPIDEY"}
              component={HeroAdd}
              {...sceneDefaultStyles}
            />
          </Stack>
        </Router>
      </Provider>
    );
  }
}
