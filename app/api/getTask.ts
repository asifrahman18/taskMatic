import axios from "axios"

export async function getTask() {
    try {
        const response = await axios.get("https://taskmatic-8c8be-default-rtdb.firebaseio.com/tasks.json");
        console.log(response);
        return response
    } catch (error) {
        return error
    }
}
