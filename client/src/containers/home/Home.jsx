import React from 'react'
import './home.css'
import { NewPostSlides, Posts } from '../../containers'
import Sidebar from '../layout/sidebar/Sidebar'
import MainLayout from '../layout/main-layout/MainLayout'

const Home = () => {
  return (
    <MainLayout>
      <NewPostSlides/>
      <div className='section-margin-top-small body-container'>
        <Posts/>
        <Sidebar/>
      </div>
    </MainLayout>
  )
}

export default Home