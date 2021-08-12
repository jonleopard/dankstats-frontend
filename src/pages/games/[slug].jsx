import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import Page from '../../components/Page'

function GameDetailPage({ page }) {
  const router = useRouter()
  return (
    <Page>
      {router.isFallback ? (
        <div tw="text-blue-700 text-sm">Loading...</div>
      ) : (
        <>
          <h1>Hello World</h1>
          <div page={page} />
        </>
      )}
    </Page>
  )
}

export const GetStaticProps = async () => {
  const { page } = await axios.get(`http://localhost:4000/top-games`)

  return {
    props: {
      page,
    },
  }
}

export default GameDetailPage
