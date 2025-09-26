import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportElementToPDF(el: HTMLElement, fileName = 'estimate.pdf') {
  const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null });
  const imgData = canvas.toDataURL('image/png');


  
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  console.log('Canvas generated:', pdf.internal.pageSize.getHeight());
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    pdf.addPage();
    position = -(imgHeight - heightLeft);
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}
