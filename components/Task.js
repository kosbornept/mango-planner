import { Text } from "react-native";

const Task = (props) => {
    return (
        <Text className="font-psugar text-green text-2xl border-green border-4 p-4 m-4 text-center items-center justify-center">{props.text}</Text>
    )
}

export default Task;