// import { Image, StyleSheet, Platform } from 'react-native';

// const api = 'https://dummyjson.com/todos';

// type Todo = {
//   readonly id: number;
//   todo: string;
//   completed: boolean;
//   userId: number;
// }

// const Item = ({todo, onPress}:)

// export default function HomeScreen() {
//   return (

//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const api = 'https://dummyjson.com/todos';
// Тип одного завдання
type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  // const [showInProgressOnly, setshowInProgressOnly] = useState(false);
  const [filter, setFilter] = useState<'all'|'completed'|'in_progress'>('all');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setTodos(data.todos);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'in_progress':
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={[styles.todoText, item.completed && styles.completed]}>
      {item.id}. {item.todo}
      </Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            filter === 'all' && styles.switchActive,
          ]}
          onPress={() => setFilter('all')}>
          <Text style={filter === 'all' && styles.activeText}>Всі</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, filter === 'completed' && styles.switchActive]}
          onPress={() => setFilter('completed')}>
          <Text style={filter === 'completed' && styles.activeText}>Виконані</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, filter === 'in_progress' && styles.switchActive]}
          onPress={() => setFilter('in_progress')}>
          <Text style={filter === 'in_progress' && styles.activeText}>Невиконані</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getFilteredTodos()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  todoItem: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    width:300,
    alignSelf:'center'
  },
  todoText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#00994d',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  switchActive: {
    backgroundColor: '#00994d',
    borderColor: '#00994d',
    color: '#fff',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});