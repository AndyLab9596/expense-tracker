import { StatusBar } from "expo-status-bar";
// Screens
import IconButton from "./components/UI/IconButton";
import RecentExpense from "./Screens/RecentExpense";
import AllExpenses from "./Screens/AllExpenses";
import ManageExpense from "./Screens/ManageExpense";
// Navigators
import {
  CompositeScreenProps,
  NavigationContainer,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

// Colors
import { GlobalStyles } from "./constants/styles";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

export enum NameRoute {
  MANAGE_EXPENSE = "ManageExpense",
  RECENT_EXPENSES = "RecentExpenses",
  ALL_EXPENSES = "AllExpenses",
  EXPENSES_OVERVIEW = "ExpensesOverview",
}

export type RootStackParamList = {
  [NameRoute.MANAGE_EXPENSE]:
    | {
        expenseId: string;
      }
    | undefined;
  [NameRoute.EXPENSES_OVERVIEW]: undefined;
};

export type RootBottomTabsParamList = {
  [NameRoute.RECENT_EXPENSES]: undefined;
  [NameRoute.ALL_EXPENSES]: undefined;
};

export type ExpensesScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList>,
  BottomTabScreenProps<RootBottomTabsParamList>
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootBottomTabsParamList>();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }: ExpensesScreenNavigationProps) => ({
        // Header
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        // Bottom tab
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        // button top right corner
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor ? tintColor : ""}
            onPress={() => {
              navigation.navigate(NameRoute.MANAGE_EXPENSE);
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name={NameRoute.RECENT_EXPENSES}
        component={RecentExpense}
        options={{
          title: "Recent Expense",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name={NameRoute.ALL_EXPENSES}
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={NameRoute.EXPENSES_OVERVIEW}
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: "white",
          }}
        >
          {/* Initial Page with Bottom Tabs  */}
          <Stack.Screen
            name={NameRoute.EXPENSES_OVERVIEW}
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          {/*  */}
          <Stack.Screen
            name={NameRoute.MANAGE_EXPENSE}
            component={ManageExpense}
            options={{
              // title: "Manage Expense",
              // this is how the page was shown
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
