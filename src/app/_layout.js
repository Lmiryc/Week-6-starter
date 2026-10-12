import { Tabs } from 'expo-router';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { store } from '../store';
export default function Layout() { return <Provider store={store}><StatusBar style="light" /><Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#e8b84a', tabBarInactiveTintColor: '#85899b', tabBarStyle: { backgroundColor: '#11121a', borderTopColor: '#272938' } }}><Tabs.Screen name="index" options={{ title: 'Search', tabBarIcon: () => null }} /><Tabs.Screen name="favorites" options={{ title: 'Favorites', tabBarIcon: () => null }} /><Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: () => null }} /><Tabs.Screen name="movie/[id]" options={{ href: null }} /></Tabs></Provider>; }
