import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Image, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react'
import { iUserData } from '@/types/UserData';
import Prof from '@/components/ProfileContainer';
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';
import { useMutation } from '@tanstack/react-query';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState<iUserData[]>([])
  const [selectedProf, setSelectedProf] = useState<iUserData | null>(null)

  const { data, isPending, error, mutate } = useMutation({ mutationFn: () => getProfile() });
  const getProfile = async (): Promise<iUserData> => {
    const sanUsername = search.toLowerCase().replace(/\s/g, '')
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}${sanUsername}`)
    if (!response.ok) {
      throw new Error('No such username');
    }
    return response.json();
  };

  useEffect(() => {
    if (data) {
      setProfileData((prevProfiles) => [data, ...prevProfiles.filter(i => i.response.uuid !== data.response.uuid)])
    }

  }, [data]);

  const openModal = (profile: iUserData) => {
    setSelectedProf(profile);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProf(null);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder='username'
        placeholderTextColor={'gray'}
        onChangeText={(text) => { setSearch(text) }}
        autoCapitalize='none'
      />
      <TouchableOpacity style={styles.pressable} onPress={() => { mutate() }}>
        <Text style={styles.text}>search</Text>
      </TouchableOpacity>

      <Text style={{ ...styles.found, color: Colors[colorScheme ?? 'light'].text }}>
        Profiles found:
      </Text>

      <View>
        {isPending ? (
          <ActivityIndicator size='large' style={styles.isLoading} />
        ) : error ? (
          <Text style={{ ...styles.text, color: Colors[colorScheme ?? 'light'].text }}>
            {error.message}
          </Text>
        ) : (
          <FlatList
            data={[...new Set(profileData)]}
            keyExtractor={(item) => item.response.uuid}
            renderItem={({ item }) => (
              <Prof
                onPress={() => openModal(item)}
                picture={item.response.picture}
                username={item.response.username}
                rank={item.response.rank}
              />
            )}
            contentContainerStyle={{ marginTop: isPending ? 20 : 0 }}
          />
        )}
      </View>

      {selectedProf && (
        <Modal
          animationType='slide'
          presentationStyle='pageSheet'
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={{ backgroundColor: Colors[colorScheme ?? 'light'].background, flex: 1 }}>
            <View style={styles.profile}>
              <Image
                source={{ uri: selectedProf.response.picture }}
                style={styles.image}
              />

              <View style={styles.infoContainer}>
                <Text style={{ ...styles.lighterText, color: Colors[colorScheme ?? 'light'].text }}>
                  Username:
                </Text>
                <Text style={{ ...styles.found, color: Colors[colorScheme ?? 'light'].text, }}>
                  {selectedProf.response.username}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={{ ...styles.lighterText, color: Colors[colorScheme ?? 'light'].text }}>
                  Rank:
                </Text>
                <Text style={{ ...styles.found, color: Colors[colorScheme ?? 'light'].text }}>
                  {selectedProf.response.rank}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 25
  },
  input: {
    height: 80,
    backgroundColor: 'white',
    marginHorizontal: 25,
    marginBottom: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 40,
    alignContent: 'center',
    fontSize: 25,
    fontFamily: 'Outfit',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.1,
  },
  pressable: {
    height: 80,
    backgroundColor: 'white',
    marginHorizontal: 25,
    marginBottom: 25,
    padding: 15,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Outfit',
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.1,
  },
  text: {
    fontSize: 25,
    fontFamily: 'Outfit',
    alignSelf: 'center'
  },
  inner: {
    margin: 15,
  },
  profile: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 60,
    marginBottom: 25,
    borderColor: 'gray',
    borderWidth: 1
  },
  infoContainer: {
    marginBottom: 10,
    alignItems: 'center'
  },
  isLoading: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  found: {
    fontSize: 30,
    fontFamily: 'Outfit',
    marginBottom: 15
  },
  lighterText: {
    fontSize: 15,
    fontFamily: 'Outfit',
    opacity: 0.6
  },
});
