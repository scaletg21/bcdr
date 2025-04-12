import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import './App.scss'
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import { Step0 } from './steps/Step0'
import { Step1 } from './steps/Step1'
import { Step2 } from './steps/Step2'
import { Step3 } from './steps/Step3'
import { Step4 } from './steps/Step4'
import { Step5 } from './steps/Step5'
import { Step6 } from './steps/Step6'
import { Step7 } from './steps/Step7'
import { Step8 } from './steps/Step8'
import { Step9 } from './steps/Step9'
import { Step10 } from './steps/Step10'
import { Step11 } from './steps/Step11'
import { Step12 } from './steps/Step12'
import { Step13 } from './steps/Step13'
import { Step14 } from './steps/Step14'
import { Step15 } from './steps/Step15'
import { Step16 } from './steps/Step16'
import { Step17 } from './steps/Step17'
import { Step18 } from './steps/Step18'
import { Step19 } from './steps/Step19'
import { Step20 } from './steps/Step20'
import { Step21 } from './steps/Step21'
import { Step22 } from './steps/Step22'
import { Step23 } from './steps/Step23'
import { Step24 } from './steps/Step24'
import { Step25 } from './steps/Step25'
import { Step26 } from './steps/Step26'
import { Step27 } from './steps/Step27'
import { Step28 } from './steps/Step28'
import { Step29 } from './steps/Step29'
import { Step30 } from './steps/Step30'
import { Step31 } from './steps/Step31'
import { Step32 } from './steps/Step32'
import { Step33 } from './steps/Step33'
import { Step34 } from './steps/Step34'
import { Step35 } from './steps/Step35'
import { Step36 } from './steps/Step36'
import { Step37 } from './steps/Step37'
import { Step38 } from './steps/Step38'
import { Step39 } from './steps/Step39'
import { Step40 } from './steps/Step40'
import { ListQuestions } from './pages/ListQuestions'
import { FinalResults } from './pages/FinalResults'
import { Bcdr } from './pages/Bcdr'
import { Reaction } from './pages/Reaction'
import { Resolve } from './pages/Resolve'
import { Recover } from './pages/Recover'
import { PreFinal } from './pages/PreFinal'
import { CalculateResults } from './pages/CalculateResults'
import { QuestLayout } from  './components/QuestLayout'
//import { useEffect } from 'react'
import axios from "axios"

function App() {
  
  
  return (
   
    <Router>
      <Routes>
        // Landing is our default path so "/" is used.
        <Route path="/" element={<Bcdr />} />
        //Parent 'Layout' and child components below so Layout will be used for all child routes
        <Route element={<QuestLayout/>}>
          <Route path="/ListQuestions" element={<ListQuestions/>} />
          <Route path="/step0" element={<Step0/>} />
          <Route path="/step1/:id" element={<Step1/>} />
          <Route path="/step2" element={<Step2/>} />
          <Route path="/step3" element={<Step3/>} />
          <Route path="/step4" element={<Step4/>} />
          <Route path="/step5" element={<Step5/>} />
          <Route path="/step6" element={<Step6/>} />
          <Route path="/step7" element={<Step7/>} />
          <Route path="/step8" element={<Step8/>} />
          <Route path="/step9" element={<Step9/>} />
          <Route path="/step10" element={<Step10/>} />
          <Route path="/Reaction" element={<Reaction/>} />
          <Route path="/step11" element={<Step11/>} />
          <Route path="/step12" element={<Step12/>} />
          <Route path="/step13" element={<Step13/>} />
          <Route path="/step14" element={<Step14/>} />
          <Route path="/step15" element={<Step15/>} />
          <Route path="/step16" element={<Step16/>} />
          <Route path="/step17" element={<Step17/>} />
          <Route path="/step18" element={<Step18/>} />
          <Route path="/step19" element={<Step19/>} />
          <Route path="/step20" element={<Step20/>} />
          <Route path="/Resolve" element={<Resolve/>} />
          <Route path="/step21" element={<Step21/>} />
          <Route path="/step22" element={<Step22/>} />
          <Route path="/step23" element={<Step23/>} />
          <Route path="/step24" element={<Step24/>} />
          <Route path="/step25" element={<Step25/>} />
          <Route path="/step26" element={<Step26/>} />
          <Route path="/step27" element={<Step27/>} />
          <Route path="/step28" element={<Step28/>} />
          <Route path="/step29" element={<Step29/>} />
          <Route path="/step30" element={<Step30/>} />
          <Route path="/step31" element={<Step31/>} />
          <Route path="/step32" element={<Step32/>} />
          <Route path="/step33" element={<Step33/>} />
          <Route path="/step34" element={<Step34/>} />
          <Route path="/step35" element={<Step35/>} />
          <Route path="/step36" element={<Step36/>} />
          <Route path="/step37" element={<Step37/>} />
          <Route path="/step38" element={<Step38/>} />
          <Route path="/step39" element={<Step39/>} />
          <Route path="/step40" element={<Step40/>} />
          <Route path="/Recover" element={<Recover/>} />
          <Route path="/PreFinal" element={<PreFinal/>} />
          <Route path="/CalculateResults" element={<CalculateResults/>} />
          <Route path="/FinalResults" element={<FinalResults/>} />
        </Route>
      </Routes>
    </Router>

    
  )
}

export default App
