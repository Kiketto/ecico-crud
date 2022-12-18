import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'

const createImageScreen = () => {

    const [state, setState] = useState({
        title:'',
        category:'',
        description:''
    })

    const handleChangeText = (data, value) => {
        setState({ ...state, [data]: value });
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
                    onChangeText={(value) => handleChangeText('title', value)}
                />
            </View>
            <View style={styles.inputTextArea}>
                <TextInput 
                    placeholder='Descripción' 
                    onChangeText={(value) => handleChangeText('title', value)}
                    multiline={true} numberOfLines={8}
                />
            </View>
            <View>
                <Button title='Guardar Imagen'/>
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