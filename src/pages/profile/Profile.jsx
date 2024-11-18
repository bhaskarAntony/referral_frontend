import React, { useContext } from 'react'
import './style.css'
import AuthContext from '../../components/context/AuthContext'
import { Tab, Tabs } from 'react-bootstrap'
import RewardsPage from './RewardsPage'

function Profile() {
    const {user, logout, isAuthenticated} = useContext(AuthContext)
  return (
    <div className="p-0 p-md-5 bg-light">
        <section className="container bg-white rounded">
            {/* <div className="top">
                <img src="https://wallpapers.com/images/hd/placeholder-profile-icon-8qmjk1094ijhbem9.jpg" alt="" />
                <div className='text-white'>
                    <h1 className="fs-4">{user.name}</h1>
                    <p className="fs-6">{user.couponCode}</p>
                </div>
            </div> */}
             <div className="rewards row mt-3">
           <div className="col-md-4 mb-3">
           <div className="card p-3 mt-3 h-100">
              <p className="fs-6 fw-bold"> <img src="https://i.gifer.com/origin/9b/9be3cc63d40d8ea231322e87d6aab7ca_w200.gif" alt="" /> Earned Cash Rewards :</p>
              <h1 className="fs-1 fw-bold"> &#8377; {user?.sharesData?.filter((share) => share.isregistered).length * 4}</h1>
            </div>
           </div>

          <div className="col-md-4 mb-3">
          <div className="card p-3 mt-3 h-100">
              <p className="fs-6 fw-bold"><img src="https://cdn.pixabay.com/animation/2023/11/29/03/39/03-39-03-19_512.gif" alt="" /> Earned Worthable Vouchers </p>
              <h1 className="fs-1 fw-bold">&#8377; {user?.sharesData?.filter((share) => share.isregistered).length * 6}</h1>
            </div>
          </div>

        <div className="col-md-4 mb-3">
        <div className="card p-3 mt-3 h-100">
              <p className="fs-6 fw-bold"><img src="https://img1.picmix.com/output/stamp/thumb/0/1/1/6/1456110_56f42.gif" alt="" /> Earned Worthable coins</p>
            <h1 className="fs-1 fw-bold">{user?.sharesData?.filter((share) => share.isregistered).length * 0.5}</h1>
          </div>
        </div>
          
          </div>
            <div className="p-2 p-md-5 mt-3">
               
            <Tabs
      defaultActiveKey="shares"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
         <Tab eventKey="shares" title={`My Shares (${user?.sharesData?.filter((share) => share.isregistered).length})`}>
      <RewardsPage/>
      </Tab>
      <Tab eventKey="my_referrals" title={`My Referrals (${user?.referrals?.filter((share) => share.isregistered).length})`}>
        
      </Tab>

     
     
     
    </Tabs>
            </div>
        </section>
    </div>
  )
}

export default Profile