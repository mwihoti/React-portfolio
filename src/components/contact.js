import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const form = useRef();
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_09mdgfl', 'template_hxitikd', form.current, 'I59mHqfMF093XbTav')
        .then((result) => {
            setMessage("YaY _ Message sent successfully!");
            setIsSent(true);
        }, (error) => {
            console.log(error.text);
            setMessage("Oops! Something went wrong");
        });
        form.current.reset();
    };

    return (
        <div className='dark:bg-slate-900 py-8 px-4'>
            <div className="max-w-lg mx-auto bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center  mb-6">
                    Send me a message
                </h2>
                
                {isSent && (
                    <div className="text-center border rounded p-8 mb-4">
                        {message}
                    </div>
                )}

                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className=''>
                        <label className='block text-lg font-medium mb-2 dark:text-teal-400'>Name</label>
                        <input
                            type="text"
                            name="user_name"
                            className='border dark:bg-slate-800 dark:text-white text-black rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        />
                    </div>
                    <div>
                        <label className='block text-lg font-medium mb-2 dark:text-teal-400'>Email</label>
                        <input
                            type="email"
                            name="user_email"
                            className='border dark:bg-slate-800 dark:text-white text-black rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2 dark:text-teal-400">Message</label>
                        <textarea
                            rows="4"
                            name="message"
                            className='border dark:bg-slate-800 dark:text-white text-black rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        />
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg text-lg hover:bg-teal-700 transition duration-300">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
