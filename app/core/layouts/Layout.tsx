import { Suspense, ReactNode } from "react"
import { Link, BlitzRouter, Head, useRouter } from "blitz"
import {
  CalendarIcon,
  ClipboardListIcon,
  CursorClickIcon,
  HomeIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/outline"

type LayoutProps = {
  title?: string
  children: ReactNode
}

type ButtonMetadata = {
  text: string
  Icon: React.ElementType
  isActive(router: BlitzRouter): boolean
  redirect: string
}

const NAV_BUTTONS: ButtonMetadata[] = [
  {
    text: "Dashboard",
    Icon: HomeIcon,
    isActive: (router: BlitzRouter) => router.asPath === "/",
    redirect: "/",
  },
  {
    text: "Teams",
    Icon: UserIcon,
    isActive: (router: BlitzRouter) => router.asPath.startsWith("/teams"),
    redirect: "/teams",
  },
  {
    text: "Rounds",
    Icon: CalendarIcon,
    isActive: (router: BlitzRouter) => router.asPath.startsWith("/rounds"),
    redirect: "/rounds",
  },
  {
    text: "Problems",
    Icon: ClipboardListIcon,
    isActive: (router: BlitzRouter) => router.asPath.startsWith("/problems"),
    redirect: "/problems",
  },
  {
    text: "Exploits",
    Icon: PencilIcon,
    isActive: (router: BlitzRouter) => router.asPath.startsWith("/exploits"),
    redirect: "/exploits",
  },
  {
    text: "Tasks",
    Icon: CursorClickIcon,
    isActive: (router: BlitzRouter) => router.asPath.startsWith("/tasks"),
    redirect: "/tasks",
  },
]

const Layout = ({ title, children }: LayoutProps) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title ? `Siren - ${title}` : "Siren"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row min-h-screen w-full">
        <div className="flex flex-col flex-shrink-0 min-h-screen w-80 bg-gray-800">
          <span className="nav-hero">StarBugs Siren</span>
          <nav className="flex-grow block px-4 pt-4 pb-0 space-y-2 overflow-y-auto">
            {NAV_BUTTONS.map(({ text, Icon, isActive, redirect }) => (
              <Link href={redirect} key={text}>
                <button className={`nav-btn ${isActive(router) ? "active" : ""}`}>
                  <Icon />
                  <span>{text}</span>
                </button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-grow p-5 overflow-y-auto">
          <Suspense fallback="Loading...">
            <main>{children}</main>
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Layout
