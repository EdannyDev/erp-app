import styled from '@emotion/styled'

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

export const MainContent = styled.main`
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

export const PageContent = styled.div`
  margin-top: 60px;
  padding: 1rem 1.5rem;
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 60px);
`