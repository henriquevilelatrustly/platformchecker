// lib/testRules.ts

import { checkResponse } from './fetcher';
import { ResponseMatchType } from './rules';

const testCases: { expected: ResponseMatchType; url: string }[] = [
  { expected: ResponseMatchType.Banno, url: 'https://my.evabank.com/login' },
  { expected: ResponseMatchType.PBI1151, url: 'https://www.suttonbank.com/' },
  { expected: ResponseMatchType.MyEbanking, url: 'https://alliancebanking.myebanking.net/#/' }, // - Proxy  
  {expected: ResponseMatchType.MyVirtualBranch, url: 'https://secure.myvirtualbranch.com/AdamsCommunity0001/SignIn.aspx?p_r=1' }, // - Captcha
  { expected: ResponseMatchType.NFinia, url: 'https://online.expeditioncu.com' },
  { expected: ResponseMatchType.Corillian, url: 'https://online.accesscreditunion.com/auth/SignIn?wa=wsignin1.0&wtrealm=https%3A%2F%2Fonline.accesscreditunion.com%2Fbanking%2F&wctx=rm=0&id=passive&ru=/banking/' },
  { expected: ResponseMatchType.FIS, url: 'https://cibng.ibanking-services.com/eAM/Credential/Index?FIORG=49U&orgId=49U_075911713&FIFID=075911713&brand=49U_075911713&appId=ceb' },
  { expected: ResponseMatchType.FISHTML, url: 'https://olb.bankoffrankewing.com/login/' },
  { expected: ResponseMatchType.DBank, url: 'https://onlinebanking.abileneteachersfcu.org/dbank/live/app/login/consumer' },
  { expected: ResponseMatchType.D3Banking, url: 'https://digitalbanking.associatedbank.com' },
  { expected: ResponseMatchType.Aurora, url: 'https://adrianbank.onlineaurora.com/BankBin/Login' },
  { expected: ResponseMatchType.ItsMe, url: 'https://beta.itsme247.com/288/authentication/username' },
{ expected: ResponseMatchType.AlkamiBankingSPA, url: 'https://digitalbanking.calbanktrust.com/#pre-auth/login' }, // - Incapsula 
{ expected: ResponseMatchType.Jwaala, url: 'https://olb.logixbanking.com/User/AccessSignin/Start' }, // - JS Error
{ expected: ResponseMatchType.NetTeller, url: 'https://cm.netteller.com/login2008/Authentication/Views/Login.aspx?fi=ksstatebank&bn=87ee6f2f4fbc5948&burlid=ab320668defbc660' },
{ expected: ResponseMatchType.FirstDataFundsXpress, url: 'https://abfny.banking.apiture.com/DigitalBanking/fx?iid=ABFNY' }, // - Url Rejected  
{  expected: ResponseMatchType.ComericaPlatform, url: 'https://webbanking.comerica.com/' }, // - Status Error
{ expected: ResponseMatchType.SecureBank, url: 'https://auth.securebanklogin.com/?brand=crawford' },
];

async function runTests() {
  for (const testCase of testCases) {
    const { expected, url } = testCase;

    console.log(`🔍 Testing for: ${expected}`);
    try {
      const result = await checkResponse(url);
      const status = result === expected ? '✅ PASSED' : `❌ FAILED (got: ${result})`;

      console.log(`${status} → ${url}\n`);
    } catch (err) {
      console.error(`🔥 ERROR while testing ${expected} → ${url}:`, err);
    }
  }
}

runTests();
