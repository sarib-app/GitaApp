const ChapterListData = [   
    {
     Id:1,
     Title:"Title of chapter 1",
     Description:"The description of the chapter!"
    },
    {
        Id:2,
        Title:"Title of chapter 2",
        Description:"The description of the chapter!"
    },
    {
        Id:3,
        Title:"Title of chapter 3",
        Description:"The description of the chapter!"
       },
       {
           Id:4,
           Title:"Title of chapter 4",
           Description:"The description of the chapter!"
       },
       {
        Id:5,
        Title:"Title of chapter 5",
        Description:"The description of the chapter!"
       },
       {
           Id:6,
           Title:"Title of chapter 6",
           Description:"The description of the chapter!"
       },
]

const SettingOptions = [
    {
      id:1,
      title:"Account Settings",
      routeTo:"AccountScreen"
    },
    {
        id:1,
        title:"Language Settings",
        routeTo:"SelectLanguage"
      },
      
      // {
      //   id:1,
      //   title:"Playback Settings",
      //   routeTo:""
      // },  
      
      {
        id:1,
        title:"Terms & Conditions",
        routeTo:"TermsConditionsScreen"
      },  {
        id:1,
        title:"Privacy Policy",
        routeTo:"PrivacyPolicyScreen"
      },  {
        id:1,
        title:"Contact Us",
        routeTo:"contactUs"
      },
      {
        id:1,
        title:"About Us",
        routeTo:"AboutUsScreen"
      },
]
const SettingOptionsHindi = [
  {
    id:1,
    title:"खाता सेटिंग्स",
    routeTo:"AccountScreen"
  },
  {
      id:1,
      title:"भाषा सेटिंग्स",
      routeTo:"SelectLanguage"
    }, 
    
    // {
    //   id:1,
    //   title:"प्लेबैक सेटिंग्स",
    //   routeTo:""
    // },   
    
    {
      id: 1,
      title: "नियम और शर्तें",
      routeTo: "TermsConditionsScreen"
    },
    {
      id: 1,
      title: "गोपनीयता नीति",
      routeTo: "PrivacyPolicyScreen"
    },
    {
      id: 1,
      title: "संपर्क करें",
      routeTo: "contactUs"
    },
    {
      id: 1,
      title: "हमारे बारे में",
      routeTo: "AboutUsScreen"
    }
]


const SettingOptionsGujrati = [
  {
    id:1,
    title:"ખાતા સેટિંગ્સ",
    routeTo:"AccountScreen"
  },
  {
      id:1,
      title:"ભાષા સેટિંગ્સ",
      routeTo:"SelectLanguage"
    },  
    
    {
      id: 1,
      title: "શરતો અને નિયમો",
      routeTo: "TermsConditionsScreen"
    },
    {
      id: 1,
      title: "ગોપનીયતા નીતિ",
      routeTo: "PrivacyPolicyScreen"
    },
    {
      id: 1,
      title: "સંપર્ક કરો",
      routeTo: "contactUs"
    },
    {
      id: 1,
      title: "અમારા વિશે",
      routeTo: "AboutUsScreen"
    }
]


const SettingOptionsMarathi = [
  {
    id:1,
    title:"खाते सेटिंग्स",
    routeTo:"AccountScreen"
  },
  {
      id:1,
      title:"भाषा सेटिंग्स",
      routeTo:"SelectLanguage"
    },  {
      id:1,
      title:"प्लेबॅक सेटिंग्स",
      routeTo:""
    }, {
      id: 1,
      title: "नियम आणि अटी",
      routeTo: "TermsConditionsScreen"
    },
    {
      id: 1,
      title: "गोपनीयता धोरण",
      routeTo: "PrivacyPolicyScreen"
    },
    {
      id: 1,
      title: "संपर्क साधा",
      routeTo: ""
    },
    {
      id: 1,
      title: "आमच्याबद्दल",
      routeTo: "AboutUsScreen"
    }
]
const Languages = [
  {
    id:1,
    title:"English",
  },
  {
    id:2,
    title:"Hindi",
  },
  {
    id:3,
    title:"Gujrati",
  },
  // {
  //   id:4,
  //   title:"Marathi",
  // }
]

export {ChapterListData,SettingOptions,Languages,SettingOptionsHindi,SettingOptionsGujrati,SettingOptionsMarathi}