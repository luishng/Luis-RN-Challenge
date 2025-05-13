import { View, Text, ViewStyle } from 'react-native';
import { ReactNode } from 'react';
import { styles } from './styles';

type HeaderRootProps = {
  children: ReactNode;
  style?: ViewStyle;
};

function Root({ children, style }: HeaderRootProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

type TitleProps = {
  title: string;
};

function Title({ title }: TitleProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

type ActionsProps = {
  children: ReactNode;
};

function Action({ children }: ActionsProps) {
  return <View style={styles.action}>{children}</View>;
}

export const Header = {
  Root,
  Title,
  Action,
};

