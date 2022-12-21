import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from "../database/firebase"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

const createImageScreen = (props) => {

    const [state, setState] = useState({
        title:'',
        category:'',
        description:'',
        url:''
    })

    const handleChangeText = (data, value) => {
        setState({ ...state, [data]: value });
    }

    const addNewImage = async () => {
        if(state.title === '' && state.url === ''){
            alert("El campo título es obligatorio");
        } else {
            try {
                await firebase.db.collection("images").add({
                title: state.title,
                category: state.category,
                description: state.description,
                url: state.url
            });
            props.navigation.navigate('imagesList');
            } catch (error) {
                console.log(error);
            } 
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Título'
                    onChangeText={(value) => handleChangeText('title', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Categoría'
                    onChangeText={(value) => handleChangeText('category', value)}
                />
            </View>
            <View style={styles.inputTextArea}>
                <TextInput 
                    placeholder='Descripción' 
                    onChangeText={(value) => handleChangeText('description', value)}
                    multiline={true} numberOfLines={8}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Enlace'
                    onChangeText={(value) => handleChangeText('url', value)}
                />
            </View>
            <View>
                <Button title='Guardar Imagen' onPress={() => addNewImage()}/>
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

export default createImageScreen