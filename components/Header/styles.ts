import { THEME } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: THEME.COLORS.GREY_600,
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: THEME.COLORS.GREY_100,
    fontSize: 24,
    fontFamily: THEME.FONTS.BOLD,
  },
  subtitle: {
    fontSize: 14,
    color: THEME.COLORS.GREY_100,
    fontFamily: THEME.FONTS.REGULAR,
  },
  action: {
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.GREY_800,
    marginLeft: 12,
  },
  backAction: {
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.GREY_800,
    marginLeft: -24,
    marginRight: 12,
  },
});
