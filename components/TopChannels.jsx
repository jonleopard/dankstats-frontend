import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

export default function TopChannels() {
  const [channelData, setChannelData] = useState([])
  const [viewers, setViewers] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://127.0.0.1:4000/top-channels`)
      let dataArray = result.data.Data.data
      let finalArray = dataArray.map((channel) => {
        let newUrl = channel.thumbnail_url
          .replace('{width}', '440')
          .replace('{height}', '248')
        channel.thumbnail_url = newUrl
        return channel
      })

      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count
      }, 0)
      setViewers(totalViewers)
      setChannelData(finalArray)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate my-4">
            Top Live Channels
          </h2>
          <p className="text-sm text-gray-400"> {viewers} total viewers </p>
        </div>
      </div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-16 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {channelData.map((channel) => (
          <li key={channel.id} className="relative">
            <div className="group block w-full h-full aspect-w-10 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              <Image
                className="object-cover pointer-events-none group-hover:opacity-75"
                width={440}
                height={148}
                src={channel.thumbnail_url}
                alt=""
              />
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">
                  View details for {channel.title}
                </span>
              </button>
            </div>
            <p className="block text-sm font-medium text-gray-500 pointer-events-none truncate">
              {channel.title}
            </p>
            <p className="block text-sm font-medium text-gray-500 truncate pointer-events-none">
              {channel.viewer_count} viewers
            </p>
            <p className="block text-sm font-medium text-gray-900 pointer-events-none">
              {channel.user_name}
            </p>
          </li>
        ))}
      </ul>{' '}
    </>
  )
}
