import React from 'react';
import { View } from '../components/Themed';
import { Button, Divider, Input, Icon, List, ListItem, TopNavigation, TopNavigationAction, Layout, Card, Modal, Text, Toggle, IndexPath, Drawer, DrawerItem } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

export default function SettingsScreen({itemToValidate, setItemToValidate, setMarkAsUsed}) {

    const ticket_pieces = [
        { column: "registration", name: "Registrace" },
        { column: "dinner_fri", name: "Večeře pátek" },
        { column: "breakfast_sat", name: "Snídaně sobota" },
        { column: "lunch_sat", name: "Oběd sobota" },
        { column: "dinner_sat", name: "Večeře sobota" },
        { column: "breakfast_sun", name: "Snídaně neděle" },
        { column: "snack_sun", name: "Balíček na cestu" },
    ]

    const indexToColumnName = (index) => {
        return ticket_pieces[index-1].column;
    };



    // ticket_pieces.find(o => o.column === "registration").name


    // toggle
    const [validate, setValidate] = React.useState(true);
    const onValidateChange = (validate) => {
        setValidate(validate);
        setMarkAsUsed(validate);
    };

    // drawer
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(new IndexPath(0));

    return (

        <>

            {/* <TopNavigation
                title='Settings'
            /> */}
            <Toggle checked={validate} onChange={onValidateChange}>
                {`Validate: ${validate}`}
            </Toggle>
            <Drawer
                selectedIndex={selectedItemIndex}
                onSelect={index => {
                    setSelectedItemIndex(index);
                    setItemToValidate(indexToColumnName(index));
                }}>
                {ticket_pieces.map((type, index) =>
                    <DrawerItem key={index} title={type.name} />
                )}
            </Drawer>
        </>
    );
};

const styles = StyleSheet.create({
});