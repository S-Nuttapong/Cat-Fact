import axios from 'axios';
import { FetchCatFact } from './interface';

export const fetchCatFact: FetchCatFact = async () => {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        return response.data.fact;
    } catch (error) {
        console.error(error);
        return "Sorry, we couldn't fetch a cat fact at the moment. Please try again later.";
    }
};
