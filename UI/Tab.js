import { useState } from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

const TabBarCS = (props) => {
  let tabBarWidth = props.layoutWidth / (props.itemLen < 3 ? 5 : 10);
  return (
    <TabBar
      {...props}
      // android_ripple={false}
      pressColor="#f0f0f0"
      indicatorStyle={{ display: "none" }}
      // tabStyle={styles.tabContainer}
      style={[styles.tabBar, { marginHorizontal: tabBarWidth }]}
      renderLabel={({ route, focused, color }) => (
        <View style={[styles.tabItem, focused && styles.activeTabItem]}>
          <Text style={styles.tabText}>{route.title}</Text>
        </View>
      )}
    />
  );
};

const TabViewCS = (props) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const { renderTab, routes } = props;

  const renderScene = SceneMap(renderTab);

  return (
    <TabView
      style={styles.tabContainer}
      renderTabBar={(props) => (
        <TabBarCS
          itemLen={routes.length}
          {...props}
          layoutWidth={layout.width}
        />
      )}
      // renderTabBar={() => null}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default TabViewCS;

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 16,
    paddingBottom: 8,
  },
  tabBar: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  tabItem: {
    marginHorizontal: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#ebecef",
  },
  activeTabItem: {
    backgroundColor: "#cbd6f5",
  },
  tabText: {
    fontWeight: 700,
  },
});
