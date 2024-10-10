import React, { useEffect, useState } from 'react'; 
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native'; // Thêm import

export default function GiaoDien2({navigation}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Sử dụng useFocusEffect để gọi lại dữ liệu khi màn hình này được hiển thị
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = () => {
        fetch('https://66f606b5436827ced975b8c7.mockapi.io/bai7')
          .then(response => response.json())
          .then(data => {
            setTasks(data);
            setFilteredTasks(data); // Cập nhật danh sách đã lọc
          })
          .catch(error => console.error('Error fetching data:', error));
      };
      
      fetchData(); // Gọi hàm fetchData khi màn hình được hiển thị
    }, [])
  );

  const handleSearch = () => {
    const filtered = tasks.filter(task => {
      const titleMatch = task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const tasksMatch = task.tasks && task.tasks.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || tasksMatch;
    });
    setFilteredTasks(filtered); // Cập nhật danh sách công việc đã lọc
  };

  const handleAddTask = () => {
    const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
    
    const newTask = {
      id: maxId + 1,  // Tạo ID mới dựa trên ID lớn nhất hiện có
      title: 'New Task',
      completed: false,
    };
  
    fetch('https://66f606b5436827ced975b8c7.mockapi.io/bai7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(data => {
      console.log('New task added:', data);
      setTasks(prevTasks => [...prevTasks, data]);
      setFilteredTasks(prevTasks => [...prevTasks, data]);
    })
    .catch(error => console.error('Error adding task:', error));
  };
  

  const hoanthanh = (taskID) => {
    const task = tasks.find(task => task.id === taskID);
    task.completed = !task.completed;
    fetch(`https://66f606b5436827ced975b8c7.mockapi.io/bai7/${taskID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(() => {
      setTasks([...tasks]);
      setFilteredTasks([...tasks]);
    })
    .catch(error => console.error('Error updating task:', error));
  };

  const handleEditTask = (task) => {
    navigation.navigate('GiaoDien3', { task });
  };

  return (
    <View style={styles.container}> 
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity style={styles.nutback} onPress={() => navigation.navigate("GiaoDien1")}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Image 
            source={require("../img/goyong.jpg")}  
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Go Yoon Jung</Text>
            <Text style={styles.subText}>Have a great day ahead</Text>
          </View>
        </View>

        {/* Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearch} style={styles.reachTouch}>
            <Icon name="search" size={22} color="gray"/>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </TouchableOpacity>
        </View>

        {/* Danh sách công việc */}
        <View style={styles.danhsach_cv}>
          {filteredTasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <View style={styles.checkbox}>
                <TouchableOpacity onPress={() => hoanthanh(task.id)}>
                  <Icon name={task.completed ? "check" : "close"} size={24} color={task.completed ? "green" : "red"}/>
                </TouchableOpacity>
              </View>
              <Text style={styles.taskText}>{task.title}</Text>
              <TouchableOpacity onPress={() => handleEditTask(task)}>  
                <Icon name="edit" size={24} color="red"/>
              </TouchableOpacity>
            </View>
          ))} 
        </View>

        {/* Thêm nút thêm công việc */}
        <View style={styles.hienthinut_button}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    justifyContent:'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 40,  // Hình tròn
    marginRight: 10,
  },
  nutback:{
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  reachTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    height: '100%',
  },
  danhsach_cv:{
    marginTop: 10,
    
    
  },
  taskItem:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    marginBottom:10,
    backgroundColor: 'pink',
    borderRadius: 15,
  },
  checkbox:{
    marginRight: 10,  
  },
  taskText:{
    flex: 1,
    fontSize: 20,
    fontStyle: 'times new roman',
  },
  hienthinut_button:{
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  addButton: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
},
addButtonText: {
    fontSize: 30,
    color: 'pink',
    fontWeight: 'bold',
    
},

});
