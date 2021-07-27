import { ReactNode } from "react"
import { Head } from "blitz"
import {
  CalendarIcon,
  CursorClickIcon,
  HomeIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/outline"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Siren"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row min-h-screen w-full">
        <div className="flex flex-col flex-shrink-0 min-h-screen w-80 bg-gray-800">
          <span className="nav-hero">StarBugs Siren</span>
          <nav className="flex-grow block px-4 pt-4 pb-0 space-y-2 overflow-y-auto">
            <button className="nav-btn active">
              <HomeIcon />
              <span>Dashboard</span>
            </button>
            <button className="nav-btn">
              <UserIcon />
              <span>Teams</span>
            </button>
            <button className="nav-btn">
              <CalendarIcon />
              <span>Rounds</span>
            </button>
            <button className="nav-btn">
              <PencilIcon />
              <span>Exploits</span>
            </button>
            <button className="nav-btn">
              <CursorClickIcon />
              <span>Tasks</span>
            </button>
          </nav>
        </div>
        <div className="flex-grow p-5 overflow-y-auto">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout
