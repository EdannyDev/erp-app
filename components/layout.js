import { LayoutContainer, MainContent, PageContent } from '../styles/layout.styles'
import Sidebar from '../components/sidebar'
import Navbar from '../components/navbar'

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Navbar />
        <PageContent>{children}</PageContent>
      </MainContent>
    </LayoutContainer>
  )
}