import { StyleSheet } from "react-native";

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#00cba9",
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subGreeting: {
    fontSize: 16,
    color: "#e0f7f5",
    marginTop: 4,
  },
  searchIcon: {},
  featuredContainer: {
    marginTop: -40,
    alignItems: "center",
  },
  featuredImage: {
    width: "90%",
    height: 200,
    borderRadius: 15,
  },
  featuredInfo: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  heartButton: {
    backgroundColor: "#00cba9",
    padding: 8,
    borderRadius: 20,
  },
  categorySection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  categoryScroll: {
    marginTop: 10,
  },
  categoryItem: {
    backgroundColor: "#f2f2f2",
    marginRight: 10,
    padding: 15,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  recommendedSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    color: "#00cba9",
    fontSize: 14,
  },
  recommendedImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },
});

export default dashboardStyles;
