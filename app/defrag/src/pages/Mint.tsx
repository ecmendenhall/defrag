import { useEthers } from '@usedapp/core'
import Button from '../components/Button'
import FullPage from '../layouts/FullPage'

const Mint = () => {
  const { account } = useEthers()

  return (
    <FullPage>
      <div className="font-body text-l">
        <div className="flex flex-col mb-2">
          <p>Mint page goes here</p>
        </div>
      </div>
    </FullPage>
  )
}

export default Mint
