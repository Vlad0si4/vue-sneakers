// import axios from 'axios'

// const BASE_URL = 'https://65a83e3694c2c5762da88316.mockapi.io/items'

// export const fetchAllItems = async () => {
//   try {
//     const response = await axios.get(BASE_URL)
//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const fetchSortThunk = async (sortBy) => {
//   try {
//     const response = await axios.get(`${BASE_URL}?sortBy=${sortBy}`)
//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const fetchSearchThunk = async (word) => {
//   try {
//     const response = await axios.get(`${BASE_URL}?search=${word}`)
//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const fetchFavorites = async () => {
//   try {
//     const response = await axios.get('https://65a83e3694c2c5762da88316.mockapi.io/favorites')
//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const AddFavoritesThunk = async (id) => {
//   try {
//     const { data } = await axios.post('https://65a83e3694c2c5762da88316.mockapi.io/favorites', {
//       productId: id
//     })

//     return data
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const DeleteFavoritesThunk = async (id) => {
//   try {
//     const { data } = await axios.delete(
//       `https://65a83e3694c2c5762da88316.mockapi.io/favorites/${id}`
//     )

//     return data
//   } catch (error) {
//     console.error(error)
//   }
// }
