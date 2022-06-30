import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import ManageExpense from "./Screens/ManageExpense";
import RecentExpense from "./Screens/RecentExpense";
import AllExpenses from "./Screens/AllExpenses";

enum NameRoute {
  MANAGE_EXPENSE = "ManageExpense",
  RECENT_EXPENSES = "RecentExpenses",
  ALL_EXPENSES = "AllExpenses",
  EXPENSES_OVERVIEW = "ExpensesOverview",
}

type RootStackParamList = {
  [NameRoute.MANAGE_EXPENSE]: undefined;
  [NameRoute.EXPENSES_OVERVIEW]: undefined;
};

type RootBottomTabsParamList = {
  [NameRoute.RECENT_EXPENSES]: undefined;
  [NameRoute.ALL_EXPENSES]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootBottomTabsParamList>();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name={NameRoute.RECENT_EXPENSES}
        component={RecentExpense}
      />
      <BottomTabs.Screen
        name={NameRoute.ALL_EXPENSES}
        component={AllExpenses}
      />
    </BottomTabs.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={NameRoute.EXPENSES_OVERVIEW}>
          <Stack.Screen
            name={NameRoute.EXPENSES_OVERVIEW}
            component={ExpensesOverview}
          />
          <Stack.Screen
            name={NameRoute.MANAGE_EXPENSE}
            component={ManageExpense}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
