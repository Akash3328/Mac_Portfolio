import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { socials } from "#constants";
import { WindowControls } from "#components";

import { Mail, Search } from "lucide-react";
const Contact = () => {
  return (
    <>
      <div id='window-header'>
        <WindowControls target='contact' />
        <h2>Contact Me</h2>
      </div>
      <div className='p-5 space-y-5'>
        <img
          src='/images/myphotoR1.jpg'
          alt='Adrian'
          className='w-20 rounded-full'
        />
        <h3>Let's Connect</h3>

        <p>
          Feel free to reach out to me via email or connect with me on social
          media. I'd love to hear from you!
           <a
          href='mailto:akashodedara@gmail.com'
          className='text-blue-600 underline font-medium hover:text-blue-800 transition'>
          {" "}
          akashodedara@gmail.com
        </a>
        </p>
       
        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                title={text}>
                <img src={icon} alt={text} className='size-5' />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
