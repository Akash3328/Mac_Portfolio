import React from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { Download, Icon } from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        <a
          href="files/Akash Odedara.pdf"
          download
          className="cursor-pointer"
          title="Download resume">
          <Download className="icon" />
        </a>
      </div>
      <Document file='files/Akash Odedara.pdf'>
        <Page pageNumber={1} renerTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};
const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
