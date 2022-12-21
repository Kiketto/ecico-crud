import React, { useEffect, useState  } from 'react'
import { View, ScrollView, StyleSheet, Button, Alert, ActivityIndicator, TextInput } from 'react-native'
import firebase from '../database/firebase'

const imageDetailScreen = (props) => {
  
  const initialState = {
    id: '',
    title: '',
    category: '',
    description: '',
    url:'',
  };

  const [image, setImage] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const getImageyId = async (id) => {
    const dbRef = firebase.db.collection("images").doc(id)
    const doc = await dbRef.get();
    const image = doc.data();
    setImage({
      ...image,
      id: doc.id,
    });
    setLoading(false);
  };

  const deleteImage = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("images")
      .doc(props.route.params.imageId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("imagesList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the Image",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteImage() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateImage = async () => {
    const imageRef = firebase.db.collection("images").doc(image.id);
    await imageRef.set({
      title: image.title,
      category: image.category,
      description: image.description,
      url: image.url
    });
    setImage(initialState);
    props.navigation.navigate('imagesList');
  };

  useEffect(() => {
    getImageyId(props.route.params.imageId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  const handleChangeText = (data, value) => {
        setImage({ ...image, [data]: value });
    }
  
  return (
    <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Título'
                    value={image.title}
                    onChangeText={(value) => handleChangeText('title', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Categoría'
                    value={image.category}
                    onChangeText={(value) => handleChangeText('category', value)}
                />
            </View>
            <View style={styles.inputTextArea}>
                <TextInput 
                    placeholder='Descripción'
                    value={image.description}
                    onChangeText={(value) => handleChangeText('description', value)}
                    multiline={true} numberOfLines={8}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Enlace'
                    value={image.url}
                    onChangeText={(value) => handleChangeText('url', value)}
                />
            </View>
            <View>
                <Button title='Actualizar Imagen' onPress={() => updateImage()} color="#19AC52"/>
                
            </View>
            <View>
                <Button title='Eliminar Imagen' onPress={() => deleteImage()} color="#E37399"/>
            </View>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    inputTextArea: {
        flex: 3,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    }
});

export default imageDetailScreen