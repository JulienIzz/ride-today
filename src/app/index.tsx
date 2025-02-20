import { StyleSheet, Text, View } from "react-native";

import { useLocation } from "#modules/location/hooks/useLocation.hook";

export default function Page() {
  const { location, isLoading } = useLocation();
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Ride Today</Text>
        <Text style={styles.subtitle}>Your daily driving check</Text>
        <Text
          style={styles.subtitle}
        >{`Location: ${isLoading ? "Loading..." : JSON.stringify(location)}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    gap: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
