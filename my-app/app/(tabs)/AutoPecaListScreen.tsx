import { StyleSheet, TouchableOpacity, Text} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import AutoPeca from '@/components/autopecas/Autopeca';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IAutoPecas } from '@/interfaces/IAutoPecas';
import AutoPecaModal from   '@/components/modals/AutoPecaModal';

export default function AutoPecaListScreen() {
    const [autopecas, setAutopecas] = useState<IAutoPecas[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAdd = (name: string, description: string) => {
        const newAutoPeca: IAutoPecas = {
            cod: Math.random() * 1000,
            name: name,
            description: description
            };

        const autopecasPlus: IAutoPecas[] = [
            ...autopecas,
            newAutoPeca
            ];
        setAutopecas(autopecasPlus);
        setModalVisible(false)
    };
    const openModal = () => {
        setModalVisible(true);
        };

    const closeModal = () => {
        setModalVisible(false);
        };


    return(
        <MyScrollView headerBackgroundColor= {{ light: '#A1CEDC', dark: '#1D3D47'}}>
            <ThemedView style= {styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}>+</Text>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.container}>

            {autopecas.map(autopeca => <AutoPeca key={autopeca.cod} name={autopeca.name} description={autopeca.description} />)}

            </ThemedView>

            <AutoPecaModal visible={modalVisible}
            onCancel = {closeModal}
            onAdd = {onAdd}
            />
        </MyScrollView>
        );

    }


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'gray',
        },
        headerContainer: {
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerButton: {
          fontWeight: 'bold',
          fontSize: 32,
          paddingHorizontal: 20,
        },
      });
      

   