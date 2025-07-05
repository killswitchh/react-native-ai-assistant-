import Button from '@components/Buttons/Button';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Chat } from '../types/chat';
import { getChats, createChat } from '../api/chatApi';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const fetchedChats = await getChats();
      setChats(fetchedChats);
    };
    fetchChats();
  }, []);

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatScreen', { chat: item })}>
      <Text style={styles.chatName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleNewChat = async () => {
    const newChat = await createChat('New Chat');
    navigation.navigate('ChatScreen', { chat: newChat });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faBars} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Chats</Text>
        <View />
      </View>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.chatList}
      />
      <Button
        title="New Chat"
        onPress={handleNewChat}
        variant="primary"
        size="large"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatName: {
    fontSize: 18,
  },
});

export default HomeScreen;
