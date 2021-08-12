import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function TopGames() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:4000/top-games')
      let dataArray = result.data.Data.data
      let finalArray = dataArray.map((game) => {
        let newURL = game.box_art_url
          .replace('{width}', '570')
          .replace('{height}', '760')
        game.box_art_url = newURL
        return game
      })
      setGames(finalArray)
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate my-4">
          Top Live Games
        </h2>
      </div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-14 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {games.map((game) => (
          <li key={game.id} className="relative">
            <div className="group block w-full h-full rounded-md aspect-w-10 overflow-hidden">
              <Image
                className="object-cover pointer-events-none"
                width={285}
                height={380}
                src={game.box_art_url}
                alt={game.name}
              />
            </div>
            <div className="mt-2 block text-sm font-medium text-gray-900 truncate cursor-pointer">
              <Link href="/games/[slug]" as={`/games/${game.name}`} passHref>
                <p className="text-gray-800">{game.name}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
