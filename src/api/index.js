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

export const fetchSortThunk = async (sortBy) => {
  try {
    const response = await axios.get(`${BASE_URL}?sortBy=${sortBy}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const fetchSearchThunk = async (word) => {
  try {
    const response = await axios.get(`${BASE_URL}?search=${word}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
