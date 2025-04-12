import { Outlet, useNavigate } from "react-router-dom"
import scaleLogoBig from '../assets/images/scale-logo-pp.png'
import scaleIcon from '../assets/images/scale-icon.png'

export function QuestLayout() {

   

    return (

        <main className="question-wrapper">
            <div className="row">
                <div className="col-md-2">
                    <img src={scaleLogoBig} alt="" className="img-fluid main"></img>
                </div>
                <div className="col-md-2 offset-md-8">
                <span className="text-gray-500 ms-2 scale-app">BCDR ASSESMENT - SCALETG.COM</span>
                </div>
            </div>
            
            
            <div className="question-inner">
                <div className="question-wrapper">
                    <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative">
                        <div className="wd-50 bg-white p-2 rounded-circle shadow-lg position-absolute translate-middle top-0 start-50">
                            <img src={scaleIcon} alt="" className="img-fluid"></img>
                        </div>
                        <div className="card-body p-sm-5 text-center">
                            <div>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
       
    )
}