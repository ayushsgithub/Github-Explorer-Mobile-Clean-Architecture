import React, { useCallback } from "react";
import { View, Text, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { RectButton, ScrollView } from "react-native-gesture-handler";

import { Button } from "../../../presentation/components";
import { UserModel } from "../../../domain/models";
import { GithubListEnums } from "../../../domain/enums";
import {
  ILoadUserFollowersList,
  ILoadUserFollowingList,
  ILoadUserGistList,
  ILoadUserRepositoryToList,
} from "@/domain/usecases";

import { styles } from "./styles";

type UserInfoTypes = {
  loadUserRepositoryList: (user: string) => ILoadUserRepositoryToList;
  loadUserFollowingList: (user: string) => ILoadUserFollowingList;
  loadUserFollowersList: (user: string) => ILoadUserFollowersList;
  loadUserGistList: (user: string) => ILoadUserGistList;
};

interface IRouteParams {
  userData: UserModel;
}

const UserInfo: React.FC<UserInfoTypes> = ({
  loadUserRepositoryList,
  loadUserFollowingList,
  loadUserFollowersList,
  loadUserGistList,
}: UserInfoTypes) => {
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const routeParams = params as IRouteParams;
  const { userData } = routeParams;

  const handleBack = useCallback(() => {
    goBack();
  }, [navigate]);

  const handleSearchRepos = useCallback((userAccount: UserModel) => {
    try {
      loadUserRepositoryList(userAccount.login)
        .loadAll()
        .then((response) => {
          navigate("SearchResult", {
            searchResult: response,
            type: GithubListEnums.REPOSITORY,
          });
        })
        .catch((error) => console.log("errorrhe", error));
    } catch (error) {
      console.log("catch", error);
    }
  }, []);

  const handleSearchFollowers = useCallback((userAccount: UserModel) => {
    try {
      loadUserFollowersList(userAccount.login)
        .loadAll()
        .then((response) => {
          navigate("SearchResult", {
            searchResult: response,
            type: GithubListEnums.FOLLOWER,
          });
        })
        .catch((error) => console.log("errorrhe", error));
    } catch (error) {
      console.log("catch", error);
    }
  }, []);

  const handleSearchFollowing = useCallback((userAccount: UserModel) => {
    try {
      loadUserFollowingList(userAccount.login)
        .loadAll()
        .then((response) => {
          navigate("SearchResult", {
            searchResult: response,
            type: GithubListEnums.FOLLOWING,
          });
        })
        .catch((error) => console.log("errorrhe", error));
    } catch (error) {
      console.log("catch", error);
    }
  }, []);

  const handleSearchGists = useCallback((userAccount: UserModel) => {
    try {
      loadUserGistList(userAccount.login)
        .loadAll()
        .then((response) => {
          navigate("SearchResult", {
            searchResult: response,
            type: GithubListEnums.GIST,
          });
        })
        .catch((error) => console.log("errorrhe", error));
    } catch (error) {
      console.log("catch", error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.screenTitle}>Github Explorer</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.avatarAndPresentationContainer}>
          <Image
            style={styles.avatarImage}
            source={{ uri: userData.avatar_url }}
          />
          <View style={styles.presentationContainer}>
            <Text style={styles.nameText}>{userData.name}</Text>
            <Text style={styles.companyText}>{userData.company}</Text>
          </View>
        </View>
        <View style={styles.statisticContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
          >
            <RectButton
              style={styles.tabItem}
              onPress={() => handleSearchRepos(userData)}
            >
              <Text style={styles.tabTitle}>Public Repos</Text>
              <Text style={styles.tabNumber}>{userData.public_repos}</Text>
            </RectButton>
            <RectButton
              style={styles.tabItem}
              onPress={() => handleSearchGists(userData)}
            >
              <Text style={styles.tabTitle}>Public Gists</Text>
              <Text style={styles.tabNumber}>{userData.public_gists}</Text>
            </RectButton>
            <RectButton
              style={styles.tabItem}
              onPress={() => handleSearchFollowers(userData)}
            >
              <Text style={styles.tabTitle}>Followers</Text>
              <Text style={styles.tabNumber}>{userData.followers}</Text>
            </RectButton>
            <RectButton
              style={styles.tabItem}
              onPress={() => handleSearchFollowing(userData)}
            >
              <Text style={styles.tabTitle}>Following</Text>
              <Text style={styles.tabNumber}>{userData.following}</Text>
            </RectButton>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleBack}>
          <>
            <FeatherIcon name={"arrow-left"} style={styles.backIcon} />
            {"  "}
            <Text>Back</Text>
          </>
        </Button>
      </View>
    </View>
  );
};

export default UserInfo;
