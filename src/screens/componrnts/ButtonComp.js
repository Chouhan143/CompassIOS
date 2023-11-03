//import liraries
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const ButtonComp = ({
  text = 'PAY',
  onPress = () => {},
  disabled = false,
  btnStyle = {},
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: !disabled ? 'blue' : 'grey',
        ...btnStyle,
      }}
      disabled={disabled}>
      {isLoading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text style={styles.textStyle}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});

//make this component available to the app
export default ButtonComp;
