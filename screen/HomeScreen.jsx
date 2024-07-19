import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import config from '../config';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppContext} from '../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList, faListAlt } from '@fortawesome/free-solid-svg-icons';
import SmallListView from './components/ListScreenComponents/SmallListView';
import GridListView from './components/ListScreenComponents/LargeListView';

const HomeScreen = ({navigation}) => {
  const {token} = useAppContext();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [seeLoad, setSeeLoader] = useState(false);
  const [disableNext,setDisableNext] = useState(false);
  const [listView,setListView] = useState('list');

  function paginator(action){
    if(action == "Next"){
      setPage(page+1);
    }else{
      if((page-1) != 0){
        setPage(page-1)
      }
    }
  }

  function changeViewStyle(){
    if (listView == "list"){
      setListView('grid')
    }else{
      setListView('list')
    }
  }

  useEffect(() => {
    setSeeLoader(true);
    async function fetchData() {
      const url = config.BASE_URL + 'api/product?page=' + page;
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Response was not ok.',
        });
        setSeeLoader(false);
      }
      response = await response.json();
      if (response.length == '0') {
        setDisableNext(true);
        setData(data => null);
        Toast.show({
          type: 'error',
          text1: 'No item found on this page ' + page +".",
          text2: 'please go to previous page.'
        });
        setSeeLoader(false);
      }else{
        setDisableNext(false);
        setData(data => response);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Item Load Successful.',
        // });
        setSeeLoader(false);
      }
    }
    fetchData();
  }, [page]);

  return (
    <>
      {seeLoad ? (
        <Text>Loading...</Text>
      ) : (
        
        <SafeAreaView style={styles.container}>
          {listView == "list" ?( 

            <FlatList
              data={data}
              renderItem={({item}) => <SmallListView data={item}  />}
              keyExtractor={item => item.id}
            />
          ):(
            <FlatList
              data={data}
              renderItem={({item}) => <GridListView data={item}  />}
              keyExtractor={item => item.id}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, page - 1 == 0 && styles.disabledButton]}
              onPress={() => paginator("Prev")}
              disabled={page - 1 == 0}
            >
              <Text style={styles.buttonText}>{page - 1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.currentButton]}
              disabled={true}
            >
              <Text style={styles.buttonText}>{page}</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={[styles.button, disableNext && styles.nextDisabledButton]}
              onPress={() => paginator("Next")}
              disabled={disableNext}
            >
              <Text style={styles.buttonText}>{page + 1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
          onPress={changeViewStyle}
        >
          {listView === "list" ? (
        <FontAwesomeIcon icon={faList}  />
      ) : (
        <FontAwesomeIcon icon={faListAlt}  />
      )}
        </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#c0c0c0',
  },
  currentButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  nextDisabledButton: {
    backgroundColor: 'red',
  }
});

export default HomeScreen;
