import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import Prof from '@/components/ProfileContainer';
import { iUserList, iUserListResponse } from '@/types/UserList';
import { useQuery } from '@tanstack/react-query';

const fetchLeaderboard = async (): Promise<iUserListResponse[]> => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}get_user_leaderboard`)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = (await response.json() as iUserList).response;
  return data.map((item, index) => ({ ...item, rank: index + 1 }))
};

export default function TabOneScreen() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => fetchLeaderboard(),
  });

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loading} >
          <ActivityIndicator size='large' />
        </View>
      )}
      {error && <Text>{error.message}</Text>}
      <FlatList
        renderItem={({ item, index }) => {
          return (
            <Prof
              picture={item.picture}
              username={item.username}
              rank={item.rank || 0}
              style={{ marginTop: index === 0 ? 10 : 0 }}
            />
          );
        }}
        data={data}
        keyExtractor={(item) => item._id}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        showsVerticalScrollIndicator={false}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});