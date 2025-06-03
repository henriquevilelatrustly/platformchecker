# Platform Checker v0.0.2

A platform checker to see which platform a bank belongs to once a URL (or batch with URLs) is/are provided.

## Ruuning the application

Enter in the application folder:
```bash
cd platformchecker
```

Be sure that you have and is running an updated version of node (recomended **v22.16.0**, but can work smoothly with version above 20.0.0):
```bash
node --version
```
To be sure install the recomended node version (example with NVM):
```bash
nvm install v22.16.0
nvm use v22.16.0
```

Install the dependencies
```bash
npm install
```

Finally, run the development server:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## More Info

### FIs covered on this version (and possible issues not solved yet)

| FI                      | Possible Issue |
|-------------------------|----------------|
| Banno                   | -              |
| PBI1151                 | -              |
| MyEbankingnet           | Proxy          |
| MyVirtualBranch         | Captcha        |
| NFinia                  | -              |
| Corillian               | -              |
| FISHTML                 | -              |
| DBank                   | -              |
| D3Bankingcom            | -              |
| AuroraBankBin           | -              |
| ItsMeauthentication     | -              |
| AlkamiBankingSPA        | Incapsula      |
| Jwaala                  | JS Error       |
| NetTeller               | -              |
| FirstDataFundsXpresscom | Url Reject     |
| ComericaPlatform        | -              |
| SecureBank              | -              |

---

### Tips

For better performance on requests (and less blocks or timeouts, for example, from PBI 1151 FIs), try to enable US VPN for US Banks.

Now, the .csv batch file SHOULD HAVE this specific format and fields to work correctly:
| FI_ID | NAME_Original | URL                        | Platform Identified | FI Already on Native? |
|-------|---------------|----------------------------|---------------------|-----------------------|
| NN    | Fi name...    | https://xxxxxxx.xxxxx.xxx/ |                     |                       |
| NNNN  | Fi name....   | https://xxxxxxx.xxxxx.xxx/ |                     |                       |

On CSV text plain: 

```
FI_ID,NAME_Original,URL,Platform Identified ,FI Already on Native?

NNNN,FiName,url,,

NNNN,FiName,url,,
```

The only field checked and changed is the **URL** field. Another fields, on output file, will be kept same as in the original file.

---

### Troubleshooting
If some problemas happens during `npm install` command, try to delete local *package-lock.json* file and try run `npm install` again.

--- 

### Observations
 - To skip simple CORS block this aplication create an own api server to fetch the data to frontend.
 Maybe, in the future, some improvements can be done on this conection to support proxy access and another features.
 - This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) with following options enabled:
    - Next JS v.15
    - TypeScript
    - Taiwind (for css)