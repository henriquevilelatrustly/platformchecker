This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

---

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

---

### Troubleshooting
If some problemas happens during `npm install` command, try to delete local *package-lock.json* file and try run `npm install` again.

--- 

### Observartion
 To skip simple CORS block this aplication create an own api server to fetch the data to frontend.
 Maybe, in the future, some improvements can be done on this conection to support proxy access and another features.