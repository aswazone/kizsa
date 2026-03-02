import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthScreen = () => {
  return (
    // <ScrollView contentInsetAdjustmentBehavior="automatic"> // another way
    // one way - to make the layout inside the best view
    <SafeAreaView>  
        <Text>AuthScreen</Text>
    </SafeAreaView>
    // </ScrollView>
  )
}

export default AuthScreen;