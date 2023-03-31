import { useEffect, useState } from 'react'
import { Nav, NavItem, NavList, Page, PageSidebar } from '@patternfly/react-core'
import { Link, useLocation } from 'react-router-dom'
import Header from '../Header'
import { isAuth } from '../../services/api'

interface IPageFrameProps {
  children: React.ReactNode
  pageTitle?: string
}

const PageFrame = ({ children, pageTitle = '' }: IPageFrameProps) => {
  const isMobile = window.innerWidth < 768
  const [isNavOpen, setIsNavOpen] = useState(!isMobile)
  const isLogged = isAuth()
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `Todo App - ${pageTitle}`
  }, [pageTitle])

  const pageNav = (
    <Nav>
      <NavList>
        <NavItem itemId={'/todos'} isActive={pathname === '/todos'}>
          <Link to='/todos'>Todos</Link>
        </NavItem>
        <NavItem itemId={'/desempenho'} isActive={pathname === '/desempenho'}>
          <Link to='/desempenho'>Desempenho</Link>
        </NavItem>
      </NavList>
    </Nav>
  )

  const sidebar = <PageSidebar nav={pageNav} isNavOpen={isNavOpen} />

  return (
    <>
      <Header navToggle={() => setIsNavOpen(!isNavOpen)} isLogged={isLogged} />
      <Page sidebar={sidebar}>{children}</Page>
    </>
  )
}

export default PageFrame
