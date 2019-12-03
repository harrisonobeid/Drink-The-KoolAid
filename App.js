import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';

import Login from "./Login";
import Game from "./Game";
// import GameScreen from "./app/screens/Game";

const AppNavigator = createStackNavigator(
    {
        Login: Login,
        Game: Game
    },
    {
        initialRouteName: "Login"
    });

export default createAppContainer(AppNavigator);