import axios from 'axios'

const BASE_URL = 'https://65a83e3694c2c5762da88316.mockapi.io/items'

export const fetchAllItems = async () => {
  try {
    const response = await axios.get(BASE_URL)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
