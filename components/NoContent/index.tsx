import { Text, View } from "react-native";

import { styles } from "./styles";

type NoContentProps = {
  text: string
}

export function NoContent({ text }: NoContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}