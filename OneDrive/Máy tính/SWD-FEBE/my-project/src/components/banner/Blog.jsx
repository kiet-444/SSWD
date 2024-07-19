import React from 'react';
import BlogHomePage from '../../assets/img/banner/blog.png';

const App = () => {
  return (
    <div className="flex justify-between">
      <div className="w-1/2 p-10 mt-32 left-content">
        <h1 className="text-3xl text-bloom">Blog</h1>
        <p className="mt-3 text-xl">
        If diamonds are a girl's best friend, why can they be so intimidating? We believe that a moment in time, 
        a memory to be cherished, and a uniquely custom diamond creation should be pure magic. 
        We're here to reclaim that magic and redefine fine jewelry.
        <br/>
        <br/>
        From our unique position as both diamond suppliers and personal jewelers, we have unparalleled access to 
        the most coveted stones to fit any budget. Whether you're looking for a timeless engagement ring, a stunning 
        anniversary gift, or a bespoke piece that captures your unique vision, we have the expertise and passion to 
        bring your dreams to life.
        <br/>
        <br/>
        Our commitment to excellence means we source only the highest quality diamonds, ensuring that every piece we 
        create is nothing short of spectacular. With our personalized service, we guide you through every step of the 
        journey, from selecting the perfect stone to designing a masterpiece that exceeds your expectations.
        <br/>
        <br/>
        We're not just jewelers; we're your personal jewelry concierge, dedicated to putting the magic back into your 
        most cherished moments. Let us help you create a legacy of beauty and elegance that will be remembered for 
        generations to come. If you can dream it, we can make it happen—and still surpass your wildest dreams.
        </p>
        <button className="px-4 py-2 mt-5 text-hemp bg-bloom">Learn More</button>
      </div>
      <div className="relative w-1/2 right-content">
        <img src={BlogHomePage} alt="Woman with diamonds" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default App;