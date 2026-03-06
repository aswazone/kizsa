import { View, Text } from 'react-native'
import React from 'react'
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';

const TabsLayout = () => {

    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return null;

    if (!isSignedIn) {
        return <Redirect href={"/(auth)"} />;
    }

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Chats</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="message" md="chat" selectedColor={'#70ace4bf'} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Icon sf="safari" md="explore" selectedColor={'#70ace4bf'} />
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" selectedColor={'#70ace4bf'} />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}

export default TabsLayout;