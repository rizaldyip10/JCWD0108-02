import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import generatePDFContent from './salesReport';


const PDFViewerComponent = ({ data }) => {
  const pdfContent = generatePDFContent(data);

  return <PDFViewer style={{ width: '100%', height: '800px' }}>{pdfContent}</PDFViewer>;
};

export default PDFViewerComponent;

