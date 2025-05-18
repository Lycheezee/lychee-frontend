import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles/dashboard.style";
import { useState } from "react";
import { InputField } from "../../../components/InputField";

export const DashboardHeader = () => {
  const userName = "Linh";
  const [isSearchState, setIsSearchState] = useState(false);

  return (
    <View style={styles.header}>
      {isSearchState ? (
        <InputField name="searchTerm" label="" />
      ) : (
        <View>
          <Text style={styles.greeting}>Good Morning, {userName}!</Text>
          <Text style={styles.subGreeting}>What do you want to eat?</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => setIsSearchState((prev) => !prev)}
      >
        <Icon name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
