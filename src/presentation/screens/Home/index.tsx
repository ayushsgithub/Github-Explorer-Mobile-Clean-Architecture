import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "../../../presentation/components";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ILoadUserInfo } from "@/domain/usecases";

type HomeTypes = {
  loadUserInfo: (user: string) => ILoadUserInfo;
};

const Home: React.FC<HomeTypes> = ({ loadUserInfo }: HomeTypes) => {
  const { navigate } = useNavigation();
  const [searchUser, setSearchUser] = useState<string>();
  const [searchError, setSearchError] = useState(false);

  const handlePress = useCallback(
    (user: string) => {
      loadUserInfo(user)
        .load()
        .then((response) => {
          navigate("UserInfo", { userData: response });
          setSearchError(false);
        })
        .catch((error) => setSearchError(true));
    },
    [navigate]
  );

  const getInputValue = useCallback((text: string) => {
    setSearchUser(text);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.screenTitle}>Github Explorer</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Input
          icon="user"
          placeholder="Type a valid user"
          getInputValue={getInputValue}
          searchError={searchError}
        />
        {searchError && (
          <Text style={styles.errorText}>Type a valid user, please</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={searchUser ? () => handlePress(searchUser) : undefined}
          enabled={searchUser ? true : false}
        >
          <>
            <FeatherIcon name={"search"} style={styles.searchIcon} />
            {"  "}
            <Text>Search</Text>
          </>
        </Button>
      </View>
    </View>
  );
};

export default Home;
