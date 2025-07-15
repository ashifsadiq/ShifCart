import { FlatList, Image, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { memo } from 'react'
import { User } from '../../utils/types/user';
import theme from '../../config/theme';
import TextUI from '../../Components/ui/TextUI';
import H2 from '../../Components/ui/H2';
import H3 from '../../Components/ui/H3';
import RatingStar from '../../Components/RatingStar';
type ProductDetailReviewsType = {
    id: number;
    rating: number;
    title: string;
    comment: string;
    user: User,
}
const userImageWidth = theme.screenWidth * 0.1
const ProductDetailReviews = ({ reviews }: { reviews: ProductDetailReviewsType[] }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <FlatList
            data={reviews}
            ListHeaderComponent={<>
                <H2>Reviews</H2>
            </>}
            style={styles.container}
            renderItem={({ item: review }) => {
                const { user } = review;
                return (
                    <View style={[styles.content,
                    {
                        backgroundColor: isDarkMode ? theme.dark.card : theme.card
                    }
                    ]}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                columnGap: theme.radius
                            }}>
                                <Image
                                    source={{
                                        uri: user.picture
                                    }}
                                    style={styles.userImage}
                                    resizeMode='contain'
                                />
                                <TextUI>{user.name}</TextUI>
                            </View>
                            {/* Report Will Go Here */}
                        </View>
                        <RatingStar ratingProps={{
                            imageSize: theme.radius * 2
                        }} value={review.rating} />
                        <H3 style={{
                            fontWeight: "600"
                        }}>{review.title}</H3>
                        <TextUI>{JSON.stringify(review)}</TextUI>
                    </View>
                )
            }}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={5}
            initialNumToRender={5}
            keyExtractor={(item) => item.id.toString()}
        />
    )
}

export default memo(ProductDetailReviews)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.radius * 1.5,
        rowGap: 10
    },
    content: {
        borderWidth: 1,
        padding: theme.fontSize['text-xs'],
        borderRadius: theme.fontSize['text-xs'],
        borderColor: theme.border,
        rowGap: theme.fontSize['text-xs'] / 2,
    },
    userImage: {
        width: userImageWidth,
        height: userImageWidth,
        borderRadius: userImageWidth / 2,
        overflow: 'hidden',
        marginRight: theme.radius,
    }
})