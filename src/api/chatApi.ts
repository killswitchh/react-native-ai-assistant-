
import { Chat, Message } from '../types/chat';
import mockData from './mockData.json';

export const getChats = async (): Promise<Chat[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData as Chat[]);
    }, 500);
  });
};

export const getChat = async (id: string): Promise<Chat | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const chat = (mockData as Chat[]).find(c => c.id === id);
      resolve(chat);
    }, 500);
  });
};

export const createChat = async (name: string): Promise<Chat> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newChat: Chat = {
        id: Math.random().toString(),
        name,
        messages: [],
      };
      resolve(newChat);
    }, 500);
  });
};

export const sendMessage = async (chatId: string, text: string): Promise<Message> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };
      // In a real app, you would save the message to the chat.
      resolve(newMessage);
    }, 500);
  });
};
