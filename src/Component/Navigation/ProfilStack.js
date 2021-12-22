import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddCarrier from '../../Screens/AddCarrier/AddCarrier';
import Profil from '../../Screens/Profil/Profil';
import UpdateProfil from '../../Screens/Profil/UpdateProfil';
import UpdateJob from '../../Screens/AddCarrier/UpdateJob';
import JobViewer from '../../Screens/AddCarrier/JobViewer';
import Help from '../../Screens/Help/Help';

function ProfilStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Profil"
            backBehavior='history'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Profil" component={Profil} />
            <Stack.Screen name="AddCarrier" component={AddCarrier} />
            <Stack.Screen name="UpdateProfil" component={UpdateProfil} />
            <Stack.Screen name="UpdateJob" component={UpdateJob} />
            <Stack.Screen name="JobViewer" component={JobViewer} />
            <Stack.Screen name="Help" component={Help} />
        </Stack.Navigator>
    )
}

export default ProfilStack;