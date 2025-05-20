import { Text, View } from "react-native";
import { IFood } from "../../../../types/food";

type Props = { food: IFood };

export const FoodDetails = ({ food }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: "black",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{food.name}</Text>
      <Text style={{ fontWeight: "200" }}>{food.descriptions}</Text>
      <View style={{ width: "100%", height: 1 }} />
    </View>
  );
};
