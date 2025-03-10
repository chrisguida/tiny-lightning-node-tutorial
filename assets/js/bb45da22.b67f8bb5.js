"use strict";(self.webpackChunktiny=self.webpackChunktiny||[]).push([[107],{8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>d});var t=i(6540);const o={},s=t.createContext(o);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(s.Provider,{value:n},e.children)}},8638:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>c,frontMatter:()=>r,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"node","title":"Lightning Node","description":"Skip this page if you\'re using Albyhub with LDK, and just proceed straight to setting up Albyhub.","source":"@site/docs/node.md","sourceDirName":".","slug":"/node","permalink":"/tiny-lightning-node-tutorial/node","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"Lightning Node","sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Initialization","permalink":"/tiny-lightning-node-tutorial/initialization"},"next":{"title":"Lightning Hub","permalink":"/tiny-lightning-node-tutorial/hub"}}');var o=i(4848),s=i(8453);const r={title:"Lightning Node",sidebar_position:3},d="Lightning Node",l={},a=[{value:"Phoenixd",id:"phoenixd",level:2},{value:"Install and run the Docker image",id:"install-and-run-the-docker-image",level:3},{value:"Run some important commands",id:"run-some-important-commands",level:3},{value:"List all available commands",id:"list-all-available-commands",level:4},{value:"Back up your seed words",id:"back-up-your-seed-words",level:4},{value:"Open a channel/Get inbound liquidity",id:"open-a-channelget-inbound-liquidity",level:4}];function h(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"lightning-node",children:"Lightning Node"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.em,{children:["Skip this page if you're using Albyhub with LDK, and just proceed straight to ",(0,o.jsx)(n.a,{href:"hub#albyhub",children:"setting up Albyhub"}),"."]})}),"\n",(0,o.jsx)(n.h2,{id:"phoenixd",children:"Phoenixd"}),"\n",(0,o.jsx)(n.h3,{id:"install-and-run-the-docker-image",children:"Install and run the Docker image"}),"\n",(0,o.jsxs)(n.p,{children:["We will use the Docker image from ",(0,o.jsx)(n.a,{href:"https://github.com/sethforprivacy/phoenixd-docker/pkgs/container/phoenixd",children:"sethforprivacy's ghcr repo"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["First create the data volume:","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"docker volume create phoenixd_data"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["Now run the image:","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"docker run -d --name phoenixd -p 9740:9740 -v phoenixd_data:/phoenix --restart unless-stopped ghcr.io/sethforprivacy/phoenixd"})}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["You can optionally ",(0,o.jsx)(n.a,{href:"https://github.com/sethforprivacy/phoenixd-docker",children:"build it yourself"})," rather than pulling from ghcr","\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"probably do this on an Apple Silicon Mac, since the OPi will take ages to do the build"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"run-some-important-commands",children:"Run some important commands"}),"\n",(0,o.jsx)(n.h4,{id:"list-all-available-commands",children:"List all available commands"}),"\n",(0,o.jsx)(n.p,{children:"Once the container is running, be sure to list all available commands:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"docker exec -it phoenixd /phoenix/bin/phoenix-cli --help\n"})}),"\n",(0,o.jsx)(n.h4,{id:"back-up-your-seed-words",children:"Back up your seed words"}),"\n",(0,o.jsxs)(n.p,{children:["Write down your seed and put it somewhere secret/safe (",(0,o.jsx)(n.strong,{children:"VERY IMPORTANT BEFORE PUTTING MONEY ON THE NODE"}),"):"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"docker exec -it phoenixd cat /phoenix/.phoenix/seed.dat\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Phoenixd will make an encrypted backup of your channel database and send it to ACINQ. It can be recovered using your seed and is kept up-to-date every time your channel state changes. Thus, in the event that you lose your channel database, the seed can be used to fully recover all your funds, as long as you trust ACINQ to give you your encrypted data back."}),"\n",(0,o.jsx)(n.li,{children:"This is one way in which a full Lightning node such as CLN is more sovereign than Phoenixd. But you can always upgrade later. And if you just don't lose your data (ie make your own backups), then this disadvantage doesn't apply."}),"\n"]}),"\n",(0,o.jsx)(n.h4,{id:"open-a-channelget-inbound-liquidity",children:"Open a channel/Get inbound liquidity"}),"\n",(0,o.jsx)(n.p,{children:"By default, phoenixd will request 2Msat of inbound liquidity from the ACINQ LSP, whenever it runs out of inbound liquidity. This of course includes when you first start the node and receive your very first payment. ACINQ charges 1% of the amount of inbound liquidity requested, which is 20ksat (plus the mining fee). Since 20ksat is about US$20 at the time of writing, and since we don't need this much inbound liquidity for a workshop, we instead configure phoenixd not to request inbound liquidity."}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.em,{children:"(Note: if you actually want 2M sats of inbound liquidity, just omit this. If you go this route, you should send ~25ksats as your first payment, most of which will be taken by ACINQ for the fee)"}),":"]}),"\n",(0,o.jsx)(n.p,{children:"Edit the phoenixd config:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'sudo nano "$(docker inspect -f \'{% raw %}{{ range .Mounts }}{{ if eq .Destination "/phoenix" }}{{ .Source }}/.phoenix/phoenix.conf{{ end }}{{ end }}{% endraw %}\' phoenixd)"\n'})}),"\n",(0,o.jsx)(n.p,{children:"Add these two lines to the config file (this should be fine as long as mining fees are lower than 5k):"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"auto-liquidity=off\nmax-mining-fee=5000\n"})}),"\n",(0,o.jsx)(n.p,{children:"Now save and exit (ctrl+s, ctrl+x)."}),"\n",(0,o.jsx)(n.p,{children:"Restart your container to pick up the new settings:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"docker restart phoenixd\n"})}),"\n",(0,o.jsx)(n.p,{children:"Next, we deposit 5ksats into our node:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'docker exec -it phoenixd /phoenix/bin/phoenix-cli createinvoice --amountSat=5000 --desc="initial deposit"\n'})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Copy the resulting bolt11 (",(0,o.jsx)(n.code,{children:"lnbc..."}),")"]}),"\n",(0,o.jsx)(n.li,{children:"Create a QR of your bolt11:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"qrencode -t ANSIUTF8 <lnbc....>\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Scan it with your lightning wallet and pay"}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Congrats, now you have a tiny Lightning server!"})," Let's hook up a point-of-sale system to allow your customers to buy things with it at your shop!"]})]})}function c(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}}}]);