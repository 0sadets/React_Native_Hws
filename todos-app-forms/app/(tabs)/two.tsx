import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Task } from '../services/type';
import { storage } from '../services/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'

const TASKS_KEY = "TASKS";

export default function TabTwoScreen() {

  const { control, handleSubmit, reset } = useForm<Task>({
    defaultValues: {
      title: "",
      date: "",
      priority: "low",
      status: "to-do",
    },
  });
  const onSubmit = async (data: Omit<Task, "id">) => {
    const newTask: Task = {
      ...data,
      id: Date.now().toString(), 
    };

    const existing = (await storage.load<Task[]>(TASKS_KEY)) || [];
    const updated = [...existing, newTask];
    await storage.save<Task[]>(TASKS_KEY, updated);
    reset(); 
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Додати завдання</Text>

      <Text style={styles.labelText}>Назва:</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} value={value} onChangeText={onChange} />
        )}
      />

      <Text style={styles.labelText}>Дата:</Text>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} value={value} onChangeText={onChange} />
        )}
      />

      <Text style={styles.labelText}>Пріоритет:</Text>
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value } }) => (
          <Picker
           style={styles.select}
            selectedValue={value}
            onValueChange={onChange}>
            <Picker.Item label="Обрати пріоритет..." value="" enabled={false} />
            <Picker.Item label="Низький" value="low" />
            <Picker.Item label="Середній" value="medium" />
            <Picker.Item label="Високий" value="high" />
          </Picker>
        )}
      />

      <Button color={"#CEB1BE"} title="Додати завдання" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor:'#E2DCDE'  },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  select:{
    height:40,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 13,
    backgroundColor: 'transparent',
    borderColor:"#ccc"
  },
  labelText:{
    fontSize: 18,
    marginBottom: 5,
  }
});