import styled from '@emotion/styled'

export const DashboardContainer = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`

export const Avatar = styled.div`
  background-color: #0070f3;
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`

export const RoleLabel = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0.3rem 0;
`

export const DateText = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin-top: 0.2rem;
`

export const WelcomeMessage = styled.p`
  font-size: 1.1rem;
  color: #444;
  max-width: 700px;
  margin: 1.5rem 0;
`

export const QuoteBox = styled.div`
  background-color: #f5f8ff;
  border-left: 4px solid #0070f3;
  padding: 1.2rem 1.5rem;
  font-style: italic;
  font-size: 1rem;
  color: #333;
  max-width: 600px;
  border-radius: 8px;
`