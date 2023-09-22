import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_09mdgfl', 'template_hxitikd', form.current, 'I59mHqfMF093XbTav')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

  return (
   <div className='text-center bg-[#ebebeb]'>
      <form ref={form} onSubmit={sendEmail} classsName=" mx-auto">
      <label className=' shadow-md text-black'>Name</label>
      <input type="text" name="user_name" className='border p-15 py-3 m-5' />
      <br />
      <label className='shadow-md text-black'>Email</label>
      <input type="email" name="user_email" className='border m-5 py-3 p-15 ' />
      <br />
      <label className='shadow-md text-black'>Message</label>
      <textarea name="message " className='border m-2  h-10' />
      <br />
      <input type="submit" value="Send"className=" p-5" />
    </form>
    </div>
  );
}

export default Contact;
