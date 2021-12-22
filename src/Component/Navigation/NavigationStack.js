import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../Screens/Sign/SignIn';
import SignUp from '../../Screens/Sign/SignUp';

const Stack = createStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator
            initialRouteName="SignIn"
            backBehavior='history'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="SignIn" component={SignIn} 
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={SignUp} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigation;