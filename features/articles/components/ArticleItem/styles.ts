import { THEME } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.GREY_700,
    marginBottom: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    overflow: 'hidden',
    height: 90,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: THEME.COLORS.GREY_100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleWithURL: {
    color: THEME.COLORS.BRAND_LIGHT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: THEME.COLORS.GREY_300,
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    paddingRight: 8,
  },
  icon: {
    padding: 8,
  },
});