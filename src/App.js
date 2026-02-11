import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReplyMessage from './Components/ReplyMessage/ReplyMessage'
import MakeIntroduction from './Components/MakeIntroduction/MakeIntroduction';
import NewMessage from './Components/NewMessage/NewMessage';
import MyMembership from './Components/MyMembership/MyMembership';
import MyContacts from './Components/MyContacts/MyContacts';
import MyProfile from './Components/MyProfile/MyProfile';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import EmailSignature from './Components/EmailSignature/EmailSignaature';
import EmailTemplate from './Components/EmailTemplate/EmailTemplate';
import NewContacts from './Components/NewContacts/NewContacts';
import Test from './Components/Test';
import Test2 from './Components/Test2';
import ViewMessage from './Components/ViewMessage/ViewMessage';
import AppHelp from './Components/AppHelp/AppHelp';
import Invoice from './Components/Invoice/Invoice';
import Home from './Components/Home/Home';
import Pricing from './Components/PRICING/Pricing';
import Partner from './Components/Partner/Partner';
import About_us from './Components/ABOUT_US/About_us';
import Contact from './Components/Contact/Contact';
import Faq from './Components/Faq/Faq';
import  Network  from './Components/Network/Network';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register'
import HelpSection2 from './Components/Help2/HelpSection2'
import Help2 from './Components/Help2/Help2'
import HelpDescription2 from './Components/Help2/HelpDescription2'
import TracsReply from './Components/TracsReply';
import TracsSignIn from './Components/TracsSignIn';
import FaqIem from './Components/FaqItem';
import Help from './Components/Help/Help';
import TracsContactUS from './Components/TracsContactUs';
import { HelpCircle, Sidebar } from 'lucide-react';
import TracsPayment from './Components/TracsPayment';
import ContactUs from './Components/ContactUs/ContactUs';
import HistoryDetails from './Components/HistoryDetails/HistoryDetails';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import MakeIntro from './Components/MakeIntro/MakeIntro'
import Sidebar2 from './Components/Sidebar/Sidebar2';
import TestQuill from './Components/TestQuill.js';
import NewMakeIntroduction from './Components/NewMakeIntroduction/NewMakeIntroduction.js';


const App = () => {
  return (
    <div>
     <Router>
      <Routes>
        <Route path="/replyMessage/:subject/:user_id/:replies_code" element={<ReplyMessage />} />
        <Route path='/make-Introduction' element={<MakeIntroduction />}/>
        <Route path='/dashboard' element={<NewMessage />}/>
        <Route path='/myMembership' element={<MyMembership />} />
        <Route path='/myContacts' element={<MyContacts />} />
        <Route path='/myProfile' element={<MyProfile />}/>
        <Route path='/changePassword' element={<ChangePassword />}/>
        <Route path='/emailSignature' element={<EmailSignature/>}/>
        <Route path='/emailTemplate' element={<EmailTemplate />}/>
        <Route path='/newContacts' element={<NewContacts/>}/>
        <Route path='/test' element={<Test/>}/>
          <Route path='/makeIntro' element={<MakeIntro/>}/>
        <Route path='/viewMessage/:subject/:user_id/:replies_code' element={<ViewMessage/>} />
          <Route path='/test2' element={<Test2/>}/>
          <Route path='/appHelp' element={<AppHelp />}/>
          <Route path='/invoice/:id' element={<Invoice />}/>
            <Route path='/' element={<Home />}/>
            <Route path='/pricing' element={<Pricing />}/>
            <Route path='/partner' element={<Partner />}/>
            <Route path='/about_us' element={<About_us />}/>
       <Route path='/help2' element={<Help2 />}/>
       <Route path="/helpSection2/:id" element={<HelpSection2 />}/>
<Route path="/helpDescription2/:id" element={<HelpDescription2 />}/>
            <Route path='/faq' element={<Faq />}/>
            <Route path='/network' element={<Network />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/tracsReply' element={<TracsReply />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/tracsSignIn' element={<TracsSignIn />}/>
            <Route path='/faqIem' element={<FaqIem />}/>
            <Route path='/contactUs' element={<TracsContactUS />}/>
            <Route path='/tracsPayment' element={<TracsPayment />}/>
            <Route path='/contact' element={<ContactUs />} />
            <Route path="/historyDetails/:id" element={<HistoryDetails />}/>
            <Route path='/forgotPassword' element={<ForgotPassword />}/>
            <Route path='/resetPassword' element={<ResetPassword />}/>
            <Route path='/sidebar' element={<Sidebar2 />}/>
            <Route path='/testingQuill' element={<TestQuill />}/>
            <Route path='/newMakeIntro' element={<NewMakeIntroduction />}/>
      </Routes>
     </Router>
    </div>
  )
}

export default App
