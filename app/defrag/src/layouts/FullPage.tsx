import Network from '../components/Network'
import Connect from '../components/Connect'
import Nav from '../components/Nav'
import Notifications from '../components/Notifications'

interface Props {
  children: React.ReactNode
}

const FullPage = ({ children }: Props) => {
  return (
    <div className="p-16 min-h-screen">
      <Notifications />
      <div className="window mb-4">
        <h1 className="title-bar">
          <span className="title-bar-text">
            <img src="img/defrag.png" alt="Defrag icon" className="w-6 mr-2 inline" />
            Defrag
          </span>
        </h1>
        <div className="window-body flex flex-col">
          <Connect />
          <Nav />
          {children}
          <Network />
        </div>
      </div>
    </div>
  )
}

export default FullPage
