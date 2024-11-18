import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import MyReferrals from './MyReferrals'
import Invitaions from './Invitaions'
import './style.css'

function Activitytabs() {
  return (
    <section className="p-2 py-5 bg-light">
        <div className='container bg-white p-3'>
         <Tabs
      defaultActiveKey="my_referrals"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="my_referrals" title="My Referrals">
        <MyReferrals/>
      </Tab>

      <Tab eventKey="invitations_sent" title="Invitations sent">
        <Invitaions/>
      </Tab>
     
    </Tabs>
    </div>
    </section>
  )
}

export default Activitytabs