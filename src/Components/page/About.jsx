import React from 'react'

function About() {
  return (
    <>
    <div className='h-auto w-auto pt-20 text-center'>
        <h1 className=' text-5xl font-semibold '>About <span className='text-yellow-300'>Elite Eleven</span> </h1>
        <div>
            <p className='pt-4 text-1xl  rounded bg-white shadow-sm hover:shadow-xl transition-shadow duration-300'>Elite Eleven is more than just an online store — it’s a celebration of the beautiful game. Born out of a passion for football and a<br /> dream to connect fans with authentic gear, Elite Eleven brings together style, sport, and spirit under one brand.</p>
        </div>
        <div>
            <h3 className='text-3xl font-semibold pt-4'>💡 Our Story</h3>
            <p className='text-1xl rounded bg-white shadow-sm hover:shadow-xl transition-shadow duration-300'>Founded by true football lovers, Elite Eleven was created to bridge the gap between fans and the football lifestyle.<br /> Whether you're on the pitch, in the stands, or scrolling from home, our goal is to give you access to the gear, fashion, and inspiration that fuels the global football community.</p>
            </div>
        <div>
            <h3 className='text-3xl font-semibold pt-4'>🎯 Our Mission</h3>
            <p className='text-1xl rounded bg-white shadow-sm hover:shadow-xl transition-shadow duration-300'>To deliver high-quality, affordable, and stylish football products to fans and players <br />around the world — making every customer feel like part of the team.</p>
            <h3 className='text-3xl font-semibold pt-4'>What We Offer</h3>
            <div className='flex justify-center '>
           <ul className='list-disc list-outside pl-6 text-left pt-3 rounded bg-white shadow-sm hover:shadow-xl transition-shadow duration-300'>
            <li>Official Jerseys & Club Merchandise</li>
            <li>Premium Football Boots & Accessories</li>
            <li>Fan Apparel & Lifestyle Gea</li>
            <li>Limited Edition Drops & Player-Inspired Collections</li>
            <p className='text-1xl'>From grassroots to greatness, we've got your back.</p>
           </ul>
      
           </div>
            <h3 className='text-3xl font-semibold pt-4'>🌍 Our Values</h3>
           <div className=' pt-4 flex justify-center'>
             <ul className='list-disc list-outside pl-6 text-left pt-3  rounded bg-white shadow-md hover:shadow-xl transition-shadow duration-300'>
            <li><span className='text-1xl font-semibold'>Passion:</span> Football is our heart, and our products reflect it.</li>
            <li><span  className='text-1xl font-semibold'>Authenticity:</span> Every item we offer is carefully curated and quality-checked.</li>
            <li><span  className='text-1xl font-semibold'>Accessibility:</span> Great gear should be available to everyone, everywhere.</li>
            <li><span  className='text-1xl font-semibold'>Community:</span> We celebrate the fans, the players, and the culture that unite us.</li>
            </ul>
           </div>
            <h3 className='text-3xl font-semibold pt-4'> 🚀 Why Choose Us?</h3>
           <div className=' pt-4 flex justify-center'>
             <ul className='list-disc list-outside pl-6 text-left pt-3 rounded bg-white shadow-md hover:shadow-xl transition-shadow duration-300'>
            <li>Fast, reliable shipping</li>
            <li>Secure payments & smooth checkout.</li>
            <li>Easy returns.</li>
            <li>Dedicated customer support.</li>
            <li>Always updated with the latest in football fashion.</li>
            </ul>
           </div>
           <p className='text-1xl font-semibold pt-4'>Join the Elite Eleven family — where football lives, and legends shop.</p>
           <p className='text-2xl font-semibold'>Elite Eleven – Live the Game. Wear the Passion...</p>
            </div>
    </div>
    </>
  )
}

export default About;