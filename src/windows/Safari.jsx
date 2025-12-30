import { WindowControls } from "#components";
import  WindowWrapper  from "#hoc/WindowWrapper.jsx"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";

import React from "react";

const Safari = () => {
  return (
    <>
      <div id='window-header'>
        <WindowControls target='safari' />
        <PanelLeft className='ml-10 icon' />
        <div className='flex items-center gap-1 ml-5'>
          <ChevronLeft className='icon' />
          <ChevronRight className='icon' />
        </div>
        <div className='flex-1 flex-center gap-3'>
          <ShieldHalf className='icon' />
          <div className='search'>
            <Search className='icon' />
            <input
              type='text'
              placeholder='Search or enter website name'
              className='flex-1'
            />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <Share className='icon' />
          <Plus className='icon' />
          <Copy className='icon' />
        </div>
      </div>
      <div className="blog">
        <h2>My Developer Blog is comming soon</h2>

        <div className="space-y-8">
          <p>
            I'm currently working on my developer blog, where I share my
            knowledge and experiences in the world of web development.
          </p>
          <p>
            Stay tuned for updates and don't miss out on the latest
            developments in the tech industry.
          </p>
        </div>
      </div>
    </>
  );
};
const SafariWindow = WindowWrapper(Safari , "safari");

export default SafariWindow;
