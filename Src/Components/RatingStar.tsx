import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Rating, SwipeRatingProps } from 'react-native-ratings';
import theme from '../config/theme';
import TextUI from './ui/TextUI';
type RatingStarProps = {
    value: number;
    count?: number;
    ratingProps?: SwipeRatingProps;
}
const RatingStar = ({ value = 0, count = 0, ratingProps = {} }: RatingStarProps) => {
    if (!value) return null;
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.starContainer}>
            <Rating
                type="custom"
                ratingCount={5}
                imageSize={ratingProps.imageSize ?? theme.fontSize['text-base']}
                startingValue={value}
                tintColor={isDarkMode ? theme.dark.card : theme.card}
                ratingBackgroundColor="#ccc"
                // Custom star color
                ratingColor="#CC6600" // not always respected, so we rely on starStyle below
                style={styles.starStyle}
                readonly={true}
                {...ratingProps}
            />
            {count ? <TextUI style={{
                color: isDarkMode ? theme.dark.mutedForeground : theme.mutedForeground
            }}>({count})</TextUI> : null}
        </View>
    );
};

export default RatingStar;
const styles = StyleSheet.create({
    starContainer: {
        // alignSelf: 'flex-start',
        flexDirection: "row",
        columnGap: theme.fontSize['text-xs'],
        width: "100%",
    },
    starStyle: {
        paddingVertical: 2,
    },
    count: {
    }
});