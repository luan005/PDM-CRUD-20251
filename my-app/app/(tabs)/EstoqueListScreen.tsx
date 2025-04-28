import { StyleSheet, TouchableOpacity, Text} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Estoque from '@/components/estoque/Estoque';
import MyScrollView from '@/components/MyScrollView';
import { useState } from 'react';
import { IEstoque } from '@/interfaces/IEstoque';
import EstoqueModal from '@/components/modals/EstoqueModal';

export default function AutoPecaListScreen() {
    const [estoque, setEstoque] = useState<IEstoque[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAdd = (name: string, description: string, tipo: string, quantidade_em_estoque: string, valor_unitario: string) => {
        const newEstoque: IEstoque = {
            cod: Math.random() * 1000,
            name: name,
            tipo: tipo,
            quantidade_em_estoque: quantidade_em_estoque,
            valor_unitario: valor_unitario
        };

        const estoquePlus: IEstoque[] = [
            ...estoque,
            newEstoque
            ];
        setEstoque(estoquePlus);
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

            {estoque.map(estoque => <Estoque key={estoque.cod} name={estoque.name} tipo={estoque.tipo} quantidade_em_estoque={estoque.quantidade_em_estoque} valor_unitario={estoque.valor_unitario}/>)}

            </ThemedView>

            <EstoqueModal visible={modalVisible}
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
      

   