import { FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { memo } from 'react'
import { User } from '../../utils/types/user';
import theme from '../../config/theme';
import TextUI from '../../Components/ui/TextUI';
import H3 from '../../Components/ui/H3';
import { Ionicons, Material } from '../../Components/CustomIcons';
import H2 from '../../Components/ui/H2';
export type AddressProps = {
    id?: number,
    user_id?: User['id'],
    name?: string,
    phone?: string,
    address?: string,
    state?: string,
    city?: string,
    pincode?: string,
};
const AddressList = ({ address, selectedId, onPressAddress }: {
    address: AddressProps[],
    selectedId?: AddressProps['id'],
    onPressAddress?: (id: AddressProps['id']) => void
}) => {
    const isDark = useColorScheme() == "dark";
    return (
        <FlatList
            data={address}
            style={{
                rowGap: theme.fontSize['text-xs'] / 2,
                marginHorizontal: theme.fontSize['text-xs'] / 2,
            }}
            ListHeaderComponent={<H2>Select Address</H2>}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                    onPress={() => {
                        onPressAddress && onPressAddress(item.id)
                    }}
                    style={[
                        styles.listContainer,
                        {
                            backgroundColor: isDark ? theme.dark.card : theme.card
                        }
                    ]}
                >
                    <View>
                        <H3>{item.address}</H3>
                        <TextUI>{item.city},{item.state},{item.pincode}</TextUI>
                    </View>
                    {selectedId == item.id ? <Ionicons color={theme.primary} name='checkmark-circle-outline' /> : null}
                </TouchableOpacity>
            }
        />
    )
}

export default memo(AddressList)

const styles = StyleSheet.create({
    listContainer: {
        padding: theme.fontSize['text-xs'],
        borderRadius: theme.fontSize['text-xs'],
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})