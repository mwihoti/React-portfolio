import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_09mdgfl', 'template_hxitikd', form.current, 'I59mHqfMF093XbTav')
        .then((result) => {
            console.log(result.text,"sent");
        }, (error) => {
            console.log(error.text);
        });
        form.current.reset();
    };
   

  return (
    <>
   <div className='bg-#94a3b8'>
   <h2 class="text-2xl pb-3 font-bold underline text-teal-700 text-center m-2" >
        Send Message
    </h2>
    
      <form ref={form} onSubmit={sendEmail} className="text-center mx-auto ">
     
        <div>
      <label className='  text-2xl flex flex-col mb-3'>Name</label>
      <input type="text" name="user_name" className='border w-96 p-4' />
      </div>
      <div>
      <label className=' text-2xl flex flex-col mb-3'>Email</label>
      <input type="email" name="user_email" className='border w-96 p-4' />
      </div>
      <div>
      <label className=" flex flex-col mb-3  text-2xl">Message</label> 
      <textarea type=" text" rows="4" name="message"
      className='px-3 py-2  border w-96 focus:outline-none  focus:text-red-500' />
      </div>
     
      
    </form>
   
    </div>
    <div className=' flex justify-center'>
    <button type="button" onClick={sendEmail} className="  justify-self-center p-4 bg-zinc-800 rounded-lg text-lg hover:font-bold text-sky-500" >
        Send
      </button>
      </div>
    
    </>
  );
}

export default Contact;
