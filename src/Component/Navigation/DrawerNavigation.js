import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Avatar, Icon, Image } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import StackNavigation from './NavigationStack';
import Home from '../../Screens/Home/Home';
import Search from '../../Screens/Search/Search';
import ProfilStack from './ProfilStack';
import About from '../../Screens/About/About';
import Contact from '../../Screens/Contact';
import { connector } from '../../connector';
import Footer from '../Footer';

const Drawer = createDrawerNavigator();

function DrawerNavigation(props) {
    const { user, isLogged } = props;
    const [isShow, setIsShow] = useState(false);
    // console.log(user);

    const openDrawer = async (navigation) => {
        // await setIsShow(!isShow);
        navigation.toggleDrawer();
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='Home'
                backBehavior='history'
                screenOptions={({navigation}) => {
                    return {
                        headerRight: () => <HeaderRight navigation={navigation} isLogged={isLogged} 
                            isShow={isShow} user={user}
                        />,
                        headerTitle: '',
                        headerLeft: () => <Image source={require('../../Images/logo.png')} 
                            containerStyle={styles.avatar}
                            onPress={() => navigation.navigate('Home')}
                        />,
                        drawerStyle: styles.drawerStyle,
                        overlayColor: 'transparent',
                        drawerLabelStyle: styles.drawerLabelStyle,
                        drawerActiveTintColor: '#ff7a59',
                        drawerPosition: 'left',
                    }
                }}
            >
                <Drawer.Screen name="Home" component={Home} 
                    options={{ title: "Page d'accueil" }}
                />
                <Drawer.Screen name='Search' component={Search} 
                    options={{ title: "Parcourir" }}
                    initialParams={{ jobValue: '', cityValue: '' }}
                />
                <Drawer.Screen name='About' component={About} 
                    options={{ title: "A propos" }}
                />
                <Drawer.Screen name='Contact' component={Contact} 
                    options={{ title: "Contact" }}
                />
                {!isLogged && <Drawer.Screen name='Sign' component={StackNavigation} 
                    options={{ title: "Connecter" }}
                    /> }
                {isLogged && <Drawer.Screen name='ProfilStack' component={ProfilStack} 
                    options={{ title: "Mon Profil" }}
                />}
                <Drawer.Screen name='Footer' component={Footer} 
                    options={{ title: null, drawerLabel: () => null,
                        drawerItemStyle: { height: 0, width: 0 }
                    }}
                />
                <Drawer.Screen name='Sign' component={StackNavigation} 
                    options={{ title: null, drawerLabel: () => null,
                        drawerItemStyle: { height: 0, width: 0 }
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

function HeaderRight(props) {
    const { isLogged, navigation, isShow, user } = props;

    return (
        <View style={[{ flexDirection: 'row' }, styles.icon_right]}>
            {isLogged ?
                <Avatar source={user.image ? {uri: user.image} : 
                    require('../../Images/avatar.png')} rounded size={35} 
                    onPress={() => navigation.navigate('ProfilStack', 
                    { screen: 'Profil', params: { id: user._id } })}
                /> :
                <TouchableOpacity
                    onPress={() => navigation.navigate('Sign')}
                >
                    <Text style={styles.text}>Connecter</Text>
                </TouchableOpacity>
            }
            <Icon color="rgba(0, 0, 0, 0.6)" type="ionicon" name={isShow ? "menu-outline" : "menu-outline"}
                onPress={() => navigation.toggleDrawer()} size={32}
                containerStyle={styles.icon}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    icon_right: { marginRight: 15 },
    text: { fontSize: 16, borderColor: "grey", borderWidth: 1, padding: 5, borderRadius: 5 },
    icon: { marginLeft: 15 },
    drawerLabelStyle: { fontWeight: '500', fontSize: 18 },
    drawerStyle: { marginTop: 55, paddingTop: 20, width: '100%' },
    avatar: { width: 100, height: 25, marginLeft: 15 },
});

export default connector(DrawerNavigation);