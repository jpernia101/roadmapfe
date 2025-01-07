import axios from "axios";

export const alive = async () =>{
    try {
        const res = await axios.get('http://localhost:3001/alive')
        
        console.log('RES', res);
        
    } catch (error) {
        console.log(error);
    }
}