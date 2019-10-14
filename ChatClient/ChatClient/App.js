import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {AccessToken} from 'react-native-fbsdk';
import {fromRight, zoomIn} from 'react-navigation-transitions';

import HomeScreen from './src/Home';
import LoginScreen from './src/Login';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    transitionConfig: () => fromRight(),
  },
);

const Auth = createAppContainer(AppNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: '',
    };
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken().then(data => {
      if (data !== null) {
        this.setState({
          loginStatus: data.userID,
        });
      }
    });
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#222" barStyle="light-content" />
        {this.state.loginStatus ? <HomeScreen /> : <Auth />}
      </>
    );
  }
}

export default App;