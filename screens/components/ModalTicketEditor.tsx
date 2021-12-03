import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Modal, Card, Divider, Toggle, Select, SelectItem, ViewPager, Layout, TabBar, Tab } from '@ui-kitten/components';

export default function ModalTicketEditor({selectedTicket, onClose, visible}: any) {
  const Header = (props: any) => (
    <View {...props}>
      <Text category='h3'>{selectedTicket.name}</Text>
      <Text category='s1'>{selectedTicket.ID}</Text>
    </View>
  );

  const Footer = (props: any) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'
        onPress={onClose}>
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        status='info'
        onPress={onClose}>
        UPDATE
      </Button>
    </View>
  );

  function CardAccessoriesShowcase() {
    const options = [ "--", "Maso", "Nemaso" ];
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedPage, setSelectedPage] = React.useState(0);
    const shouldLoadComponent = (index) => index === selectedPage;

    return (
      <Card style={styles.card} header={Header} footer={Footer}>
        <View style={ styles.bodyContainer }>
          <Text>Registration:</Text>
          <Text style={{ textTransform: 'capitalize' }}>{ selectedTicket.registration }</Text>
        </View>
        <View style={[ styles.bodyContainer, { marginBottom: 12 } ]}>
          <Text>Balance:</Text>
          <Text>{ selectedTicket.balance } CZK</Text>
        </View>

        <Divider />
        <TabBar
          selectedIndex={selectedPage}
          onSelect={index => setSelectedPage(index)}>
          <Tab title='Friday'/>
          <Tab title='Saturday'/>
          <Tab title='Sunday'/>
        </TabBar>

        <ViewPager selectedIndex={selectedPage} shouldLoadComponent={shouldLoadComponent}>
          <Layout level='2' style={{ backgroundColor: 'white' }}>
            <Divider />
            <View style={ styles.bodyContainer }>
              <Text category='h6'>Dinner:</Text>
              <Select
                style={{ padding: 4, flexGrow: 1, marginLeft: 8 }}
                value={ options[selectedIndex] }
                onSelect={index => setSelectedIndex(index.row)}>
                { options.map(item => (<SelectItem title={item} />)) }
              </Select>
            </View>
          </Layout>
          <Layout level='2' style={{ backgroundColor: 'white' }}>
          <Divider />
            <View style={ styles.bodyContainer }>
              <Text category='h6'>Breakfast:</Text>
              <Toggle style={{ padding: 4 }} />
            </View>
            <Divider />
            <View style={ styles.bodyContainer }>
              <Text category='h6'>Lunch:</Text>
              <Select
                style={{ padding: 4, flexGrow: 1, marginLeft: 8 }}
                value={ options[selectedIndex] }
                onSelect={index => setSelectedIndex(index.row)}>
                <SelectItem title='--' />
                <SelectItem title='Maso'/>
                <SelectItem title='Nemaso'/>
              </Select>
            </View>
            <Divider />
            <View style={ styles.bodyContainer }>
              <Text category='h6'>Dinner:</Text>
              <Select
                style={{ padding: 4, flexGrow: 1, marginLeft: 8 }}
                value={ options[selectedIndex] }
                onSelect={index => setSelectedIndex(index.row)}>
                <SelectItem title='--' />
                <SelectItem title='Maso'/>
                <SelectItem title='Nemaso'/>
              </Select>
            </View>
          </Layout>
          <Layout level='2' style={{ backgroundColor: 'white' }}>
          <Divider />
            <View style={ styles.bodyContainer }>
              <Text category='h6'>Breakfast:</Text>
              <Toggle style={{ padding: 4 }} />
            </View>
            <Divider />
            <View style={ styles.bodyContainer }>
              <Text category='h6'>Lunch:</Text>
              <Select
                style={{ padding: 4, flexGrow: 1, marginLeft: 8 }}
                value={ options[selectedIndex] }
                onSelect={index => setSelectedIndex(index.row)}>
                <SelectItem title='--' />
                <SelectItem title='Maso'/>
                <SelectItem title='Nemaso'/>
              </Select>
            </View>
            <Divider />
            <View style={ styles.bodyContainer }>
              <Text category='h6'>Dinner:</Text>
              <Select
                style={{ padding: 4, flexGrow: 1, marginLeft: 8 }}
                value={ options[selectedIndex] }
                onSelect={index => setSelectedIndex(index.row)}>
                <SelectItem title='--' />
                <SelectItem title='Maso'/>
                <SelectItem title='Nemaso'/>
              </Select>
            </View>
          </Layout>
        </ViewPager>
      </Card>
    );
  }

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}>
      <CardAccessoriesShowcase />
    </Modal>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
