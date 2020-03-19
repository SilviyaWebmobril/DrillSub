import React from 'react';
import {createAppContainer, createSwitchNavigator    } from 'react-navigation';

import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack';
import Splash from './Splash';
import SignUp from '../SignupStack/SignUp';
import SignIn from '../SignupStack/SignIn';
import Home  from "../HomeStack/Home";
import ChangePassword from '../ChangePasswordStack/ChangePassword';
import SideBar from '../CustomUI/SideBar';
import ForgotPassword from '../SignupStack/ForgotPassword';
import OTP  from '../SignupStack/OTP';
import ResetPassword from '../SignupStack/ResetPassword';
import ContactUs from '../ContactUsStack/ContactUs';
import CategoryDetails from '../HomeStack/CategoryDetails';
import SavedItem from '../SavedItemsStack/SavedItem';
import EditUserDetails from '../EditDetailsStack/EditUserDetails';
import PrivacyPolicy from '../PrivacyPolicyStack/PrivacyPolicy';
import FinalEstimate from '../SavedItemsStack/FinalEstimate';
import SendDetails from '../HomeStack/SendDetails';
import TermsOfUse from '../TermsOfUseStack/TermsOfUse';
import SavedFinalEstimatePdf  from '../SavedPdfs/SavedFinalEstimatePdf';



const PrivacyPolicyStack = createStackNavigator({

    PrivacyPolicy:{
        screen: PrivacyPolicy
    }
})

const savedEstimatePdf = createStackNavigator({

    SavedFinalEstimatePdf :{
        screen : SavedFinalEstimatePdf
    }
}) 

const SavedItemStack =  createStackNavigator({

    SavedItem:{
        screen:SavedItem
    },
    CategoryDetails:{
        screen:CategoryDetails
    },
    FinalEstimate:{
        screen:FinalEstimate
    }
})

const EditDetailsStack =  createStackNavigator({

    EditUserDetails :{
        screen :EditUserDetails
    }
})
const  homeStack = createStackNavigator({

    Home:{
        screen:Home
    },
    CategoryDetails:{
        screen:CategoryDetails
    },
    SendDetails:{
        screen:SendDetails
    }
   
    
});

const ChangePasswordStack  = createStackNavigator({

    ChangePassword :{
        screen:ChangePassword
    }

},{
    initialRouteName:"ChangePassword",
});

const  ContactUsStack = createStackNavigator({

    Contact:{
        screen:ContactUs
    },
   
    
})

const drawerNavigator  = createDrawerNavigator({

   HomeScreen:{
        screen :homeStack
   } ,
   EditUserDetailsScreen:{
       screen :EditDetailsStack
   },
   ChangePasswordScreen :{ 
       screen: ChangePasswordStack
   },
   ContactUsScreen :{ 
        screen: ContactUsStack
    },
    SavedItemScreen:{
        screen:SavedItemStack
    },
    //standaed terms and conditions page
    PrivacyPolicyScreen :{
        screen:PrivacyPolicyStack
    },
    SavedFinalEstimatePdf:{
        screen :savedEstimatePdf
    }
   

    
},{
    initialRouteName:"HomeScreen",
    contentComponent:  SideBar  ,
})
  

const SignUpStack = createStackNavigator({
    SignIn:{
        screen:SignIn,
        navigationOptions:{
            header:null
        }
    },
    SignUp:{
        screen:SignUp,
        navigationOptions:{
            header:null
        }
    }, 
    ForgotPassword:{
        screen:ForgotPassword,
        navigationOptions:{
            header:null
        }
    },
    OTP:{
        screen:OTP,
        navigationOptions:{
            header:null
        }
    },
    ResetPassword:{
        screen:ResetPassword,
        navigationOptions:{
            header:null
        }
    },
    PrivacyPolicy,
    TermsOfUse,



},{
    initialRouteName:"SignIn",
    // headerMode: 'none',
    // navigationOptions: {
    //     headerVisible: false,
    // }
   
})

const AppContainer = createSwitchNavigator({

    Splash : Splash,
    SignUpScreen: SignUpStack,
    HomeDrawer: drawerNavigator

});

export default createAppContainer(AppContainer);