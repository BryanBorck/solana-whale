/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
// import { neynar } from 'frog/hubs'
import { neynar } from 'frog/middlewares'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'

const neynarMiddleware = neynar({
  apiKey: 'NEYNAR_FROG_FM',
  features: ['interactor', 'cast'],
})

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  imageAspectRatio: '1.91:1',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
}).frame('/:fundname', (c) => {
  const fundname = c.req.param('fundname')
  return c.res({
    action: `/${fundname}/page/0`,
    image: (
      <div
      style={{
        alignItems: 'center',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'url(https://i.imgur.com/3uydTdB.png)',
        backgroundSize: '140% 100%',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        fontSize: 36,
        overflow: 'hidden', 
      }}
    >
    </div>
    ),
    intents: [
      <Button>Apply</Button>,
    ],
  })
}).frame('/:fundname/page/0', neynarMiddleware, (c) => {
  const fundname = c.req.param('fundname')
  const { displayName } = c.var.interactor || {}
  return c.res({
    action: `/${fundname}/page/1`,
    image: (
      <div
      style={{
        alignItems: 'center',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'url(https://i.imgur.com/Kk6E7er.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        fontSize: 36,
        overflow: 'hidden', 
      }}
    >
     <p>Hello {displayName || 'there'}, welcome to Whale Finance</p>

     {/* Modify this to any name of house */}

     <p style={{
        marginTop: 20,
      }}>Let's start your deposit to our vault {fundname}!</p>

    </div>
    ),
    intents: [
      <Button>Let`s Go!</Button>,
    ],
  })
}).frame('/:fundname/page/1', neynarMiddleware, (c) => {
  const fundname = c.req.param('fundname')
  const { displayName } = c.var.interactor || {}
  const transactionId = c.transactionId
  return c.res({
    image: (
      <div
      style={{
        alignItems: 'center',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: 'url(https://i.imgur.com/Kk6E7er.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        fontSize: 36,
        overflow: 'hidden', 
      }}
    >
     <div tw="flex flex-col items-center justify-center w-full h-full font-bold text-5xl">
        {transactionId
          ? `${transactionId.slice(0, 6)}...${transactionId.slice(-6)}`
          : 'Send Transaction'}
      </div>
    </div>
    ),
    intents: transactionId
    ? [
        <Button.Link
          href={`https://base-sepolia.blockscout.com/tx/${transactionId}`}
        >
          View on Block Explorer
        </Button.Link>,
      ]
    : [
      <Button.Transaction action={`/${fundname}/finish`} target="/send">
        Send Transaction
      </Button.Transaction>,
      <Button action={`/${fundname}/finish`}>Next</Button>,
    ],
  })
}).frame('/:fundname/finish', neynarMiddleware, (c) => {
const { buttonValue, inputText } = c;
const value = inputText || buttonValue;
const {
  username,
  displayName,
  followerCount,
  pfpUrl,
} = c.var.interactor || {}
const { frameData } = c
const { fid }: any = frameData
return c.res({
  image: (
    <div
    style={{
      alignItems: 'center',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundImage: 'url(https://i.imgur.com/Kk6E7er.png)',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      fontSize: 36,
      overflow: 'hidden', 
    }}
  >
    <p>Deposit submitted 📨</p>
    <p style={{
      fontSize: 36,
      marginTop: 20,
    }}>Thank you, now share with your {followerCount || 'many'} followers!</p>
  </div>
  ),
  intents: [
    <Button.Redirect location="https://warpcast.com/~/compose?embeds[]=https://whale-frame.vercel.app//api">Share</Button.Redirect>,
    <Button.Redirect location="https://twitter.com/Whale_dApp">Follow us</Button.Redirect>,
    <Button.Redirect location="https://solana-whale.vercel.app/">Website</Button.Redirect>,
  ],
})
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
