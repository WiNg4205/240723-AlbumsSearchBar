import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [albums, setAlbums] = useState([])

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      axios.get('http://localhost:5000/search', {
        params: { query: inputValue }
      })
        .then(response => {
          const albums = Object.values(response.data)
          Object.keys(albums)
          console.log(albums)
          setAlbums(albums)
        })
    }
  };

  return <>
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold mt-8">Search for an Album or Artist</div>
      <input
        className="bg-gray-200 p-2 pl-4 text-2xl mt-6"
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>

      {albums.map((album, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold">{album['Album']}</h3>
          <p className="text-gray-600">{album['Artist Name']}</p>
          <p className="text-gray-400">{album['Release Date']}</p>
          <p className="text-gray-500">Ranking: {album['Ranking']}</p>
        </div>
      ))}       

  </>
}

export default App