export enum ResponseMatchType {
    PBI1151 = 'PBI 1151',
    Architect = 'Architect',
    SecureBank = 'Secure Bank',
    MyEbanking = 'My Ebanking',
    Jwaala = "Jwaala",
    NFinia = 'nFinia',
    AlkamiBankingSPA = "Alkami Banking SPA",
    Corillian = 'Corillian',
    ItsMe = "It's Me",
    FirstDataFundsXpress = "Firstdata FundsXpress",
    ComericaPlatform = "Comerica Platform",
    DBank = 'DBank',
    MyVirtualBranch = 'My Virtual Branch',
    D3Banking = 'D3 Banking',
    Aurora = 'Aurora',
    Banno = 'Banno',
    NetTeller = 'NetTeller',
    FIS = 'FIS',
    FISHTML = 'FIS HTML',
    Narmi = 'Narmi',

    StatusError = 'Status Error',
    CaptchaBlock = 'Captcha Block',
    RadwareBlock = 'Radware Block',
    Incapsula = 'Need Incapsula Resource',
    NoJSBlock = 'Javascript Block',
    RequestReject = 'The requested URL was rejected',

    Unknown = 'Unknown'
}

interface MatchRule {
  pattern?: RegExp;
  matcher?: (text: string, cookies: string | null, status: number) => boolean;
  result: ResponseMatchType;
}

const rules: MatchRule[] = [
  // ✅ Complex matcher rules first (higher priority)
  {
    matcher: (text, cookies, status) => {
      return text.includes("This image, known as a CAPTCHA") ||
             text.includes('id="captcha-content"');
    },
    result: ResponseMatchType.CaptchaBlock
  },
  {
    matcher: (text, cookies, status) => {
      return text.includes("securebanklogin.com") &&
             text.includes("okta-signin-username");
    },
    result: ResponseMatchType.SecureBank
  },
  {
    matcher: (text, cookies, status) => {
      return (text.includes("SignonControl_UserIdTextBox") &&
             text.includes("SignonControl_PasswordTextBox"));
    },
    result: ResponseMatchType.ComericaPlatform
  },
  {
    matcher: (text, cookies, status) => {
      return !text.includes("This FI is no longer active") &&
             (text.includes("fundsxpress.com") || text.includes("apiture.com"));
    },
    result: ResponseMatchType.FirstDataFundsXpress
  },
  {
    matcher: (text, cookies, status) => {
      return text.includes("M$layout$content$PCDZ$MMCA7G7$ctl00$webInputForm$txtLoginName") &&
             (cookies?.includes("MyVirtualBranch_LTM") ?? false);
    },
    result: ResponseMatchType.MyVirtualBranch
  },

  // ✅ Simple pattern-based rules
  
  {
    pattern: /Enable JavaScript and cookies to continue/i,
    result: ResponseMatchType.NoJSBlock,
  },
   {
    pattern: /The requested URL was rejected/i,
    result: ResponseMatchType.RequestReject,
  },
  {
    pattern: /validateperfdrive/i,
    result: ResponseMatchType.RadwareBlock,
  },
  {
    pattern: /PBI_PBI1151/i,
    result: ResponseMatchType.PBI1151,
  },
  {
    pattern: /myebanking/i,
    result: ResponseMatchType.MyEbanking,
  },
  {
    pattern: /nFinia/i,
    result: ResponseMatchType.NFinia,
  },
  {
    pattern: /corillian/i,
    result: ResponseMatchType.Corillian,
  },
  {
    pattern: /fis-page-content/i,
    result: ResponseMatchType.FIS,
  },
  {
    pattern: /fis-override/i,
    result: ResponseMatchType.FISHTML,
  },
  {
    pattern: /\/dbank\//i,
    result: ResponseMatchType.DBank,
  },
  {
    pattern: /\/d3rest\//i,
    result: ResponseMatchType.D3Banking,
  },
  {
    pattern: /aurora/i,
    result: ResponseMatchType.Aurora,
  },
  {
    pattern: /itsme247.com/i,
    result: ResponseMatchType.ItsMe,
  },
  {
    pattern: /alkamitech.com/i,
    result: ResponseMatchType.AlkamiBankingSPA,
  },
   {
    pattern: /Narmi/i,
    result: ResponseMatchType.Narmi,
  },
  {
    pattern: /\/User\/AccessSignin\/Start/i,
    result: ResponseMatchType.Jwaala,
    // cookie:Jwaala.Site.User	 - after passed protection
  },
  {
    pattern: /netteller.com/i,
    result: ResponseMatchType.NetTeller,
  },
  {
    pattern: /banno-web/i,
    result: ResponseMatchType.Banno,
  },
];

export function analyzeResponseText(text: string, cookies: string | null, status: number): ResponseMatchType {
  console.log("STATUS: ", status);

      if (status !== 200 && status !== 403 ) {
        return ResponseMatchType.StatusError;
      }

//   const normalizedText = text.toLowerCase();
//   const normalizedCookies = cookies?.toLowerCase() ?? null;

  const matchedRule = rules.find(rule =>
    (rule.matcher && rule.matcher(text, cookies, status)) ||
    (rule.pattern && rule.pattern.test(text)) ||
    (rule.pattern && cookies && rule.pattern.test(cookies))
  );

  return matchedRule?.result || ResponseMatchType.Unknown;
}
