import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Task } from '../services/type';
import { storage } from '../services/storage';

const TASKS_KEY = "TASKS";

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loaded = await storage.load<Task[]>(TASKS_KEY);
    if (loaded) {
      setTasks(loaded);
    }
  };
  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.details}>
        {item.date} | {item.priority.toUpperCase()} | {item.status}
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor:'#E2DCDE' },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  taskItem: {
    backgroundColor: "#F1E4E8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontSize: 18 },
  details: { color: "#666" },
});