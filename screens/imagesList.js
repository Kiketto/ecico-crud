import React,  { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button, StyleSheet, Image,  Dimensions } from 'react-native'
import firebase from "../database/firebase";
import { ListItem } from 'react-native-elements'

const imagesList = (props) => {
  
  const [images, setImages] = useState({});

  useEffect(() => {
    firebase.db.collection("images").onSnapshot((querySnapshot) => {
      const images = [];
      querySnapshot.docs.forEach((doc) => {
        const { title, category, description, url } = doc.data();
        images.push({
          id: doc.id,
          title,
          category,
          description,
          url,
        });
      });
      setImages(images);
    });
  }, []);
  
  return (
    <ScrollView>
      <Button title="Crear Imagen" onPress={() => props.navigation.navigate("createImageScreen")} />
    
      {
        Array.from(images).map(image => {
          return (
            <ListItem key={image.id}
              bottomDivider
              onPress={() => {
              props.navigation.navigate("imageDetailScreen", {
                imageId: image.id,
              });
            }}
            >
              <ListItem.Chevron />
              <ListItem.Content>
                <Image
                style={styles.imageStyle}
                  source={image.url}
                />
                <ListItem.Title>{image.title}</ListItem.Title>
                <ListItem.Subtitle>{image.category}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })
      }

    </ScrollView>
    
  );
}

export default imagesList

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
});