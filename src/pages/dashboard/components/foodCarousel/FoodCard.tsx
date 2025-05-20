import { Image, View, Text } from "react-native";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useMemo } from "react";
import { FoodDetails } from "./FoodDetails";
import { IFood } from "../../../../types/food";

type Props = {
  food: IFood;
};

export const FoodCard = ({ food }: Props) => {
  const mockImageAPI = "https://picsum.photos/500/1000";

  const isFavouriteFood = true;
  const FavouriteIcon = useMemo(() => {
    return isFavouriteFood ? (
      <RiHeart3Fill size="2em" />
    ) : (
      <RiHeart3Line size="2em" />
    );
  }, [isFavouriteFood]);

  return (
    <View
      style={{
        flex: 2,
        alignItems: "center",
        position: "relative",
      }}
    >
      <View style={{ width: "80%" }}>
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
          }}
        >
          {FavouriteIcon}
        </View>
        <Image
          source={{ uri: mockImageAPI }}
          style={{ height: 300, width: "100%" }}
        />
        <View style={{ position: "relative", transform: "" }}>
          <FoodDetails food={food} />
        </View>
      </View>
    </View>
  );
};
