import '@/styles/globals.css'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const noLayoutRoutes = ['/login', '/register']
  const isNoLayout = noLayoutRoutes.includes(router.pathname)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token && !isNoLayout) {
      router.replace('/login')
    }
  }, [router.pathname])

  return isNoLayout ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}