import React from 'react';
import { View } from '../components/Themed';
import { Button, Divider, Input, Icon, List, ListItem, TopNavigation, TopNavigationAction, Layout, Card, Modal, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default function ManualValidationScreen() {

    return (
        <React.Fragment>
            <TopNavigation
                title='Screen for testing'
            />
            {/* <Input
                placeholder='Place your Text'
            />
            <Button onPress={() => {
                    alert("TODO zvalidovat");
                }}>
                    VALIDATE
            </Button>
            <Divider />
            <ManualValidation /> */}
            <MyModal/>
        </React.Fragment>
    );
};

function MyModal(){
    const [visible, setVisible] = React.useState(false);
  
    return (
      <Layout style={styles.container} level='1'>
  
        <Button onPress={() => setVisible(true)}>
          TOGGLE MODAL
        </Button>
  
        <Modal visible={visible}>
          <Card disabled={true}>
            <Text>Welcome to UI Kitten 😻</Text>
            <Button onPress={() => setVisible(false)}>
              DISMISS
            </Button>
          </Card>
        </Modal>
  
      </Layout>
    );
  }

function ManualValidation() {
    const [value, setValue] = React.useState('');

    const clearSearchBar = () => {
        setValue('');
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearSearchBar}>
            <Icon {...props} name={'close-outline'} />
        </TouchableWithoutFeedback>
    );

    return (
        <View style={styles.searchBox}>
            <Input
                value={value}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Scan QR'
                status='control'
                size='large'
                style={styles.searchBar}
                clearButtonMode='while-editing'
                accessoryRight={renderIcon}
                onChangeText={nextValue => setValue(nextValue)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'column',
        minHeight: 144,
    },
    searchBar: {
        width: '50%',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(80,80,80,0.5)'
    },
    searchBox: {
        backgroundColor: 'transparent',
        height: '70%',
        justifyContent: 'flex-end'
    },
});