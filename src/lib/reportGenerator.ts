import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface QTGTest {
  id: string;
  name: string;
  cat: string;
  status: 'pending' | 'approved' | 'rejected';
  ref_val: string;
  tol: string;
}

export const generateQTGReport = (tests: QTGTest[], metadata: any) => {
  const doc = new jsPDF() as any;

  // Header - MODENA / CEAC
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('REPORTE DE CALIFICACIÓN FSTD', 105, 18, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('MODENA Air Service / CEAC — 6XSIM R44 II', 105, 28, { align: 'center' });
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 105, 34, { align: 'center' });

  // Aeronave y Especificaciones
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Especificación de la Aeronave', 14, 55);
  doc.setLineWidth(0.5);
  doc.line(14, 58, 196, 58);

  const aircraftData = [
    ['Modelo', 'Robinson R44 II Raven II'],
    ['Nivel Solicitado', 'FTD Nivel 3 / FFS Nivel B'],
    ['Sistema Visual', 'Mixed Reality - Varjo XR4'],
    ['Normativa', 'RAAC Parte 60 / ANAC Argentina']
  ];

  doc.autoTable({
    startY: 62,
    head: [],
    body: aircraftData,
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 2 },
    columnStyles: { 0: { fontStyle: 'bold', width: 40 } }
  });

  // Resultados QTG
  doc.setFontSize(14);
  doc.text('Resultados de Pruebas QTG', 14, doc.lastAutoTable.finalY + 15);
  doc.line(14, doc.lastAutoTable.finalY + 18, 196, doc.lastAutoTable.finalY + 18);

  const tableData = tests.map(t => [
    t.id,
    t.name,
    t.ref_val,
    t.tol,
    t.status.toUpperCase()
  ]);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 22,
    head: [['ID', 'Nombre de la Prueba', 'Referencia POH', 'Tolerancia', 'Estado']],
    body: tableData,
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    styles: { fontSize: 8 },
    columnStyles: {
        4: { fontStyle: 'bold' }
    },
    didParseCell: (data: any) => {
      if (data.section === 'body' && data.column.index === 4) {
        if (data.cell.raw === 'APPROVED') data.cell.styles.textColor = [34, 197, 94];
        if (data.cell.raw === 'REJECTED') data.cell.styles.textColor = [239, 68, 68];
      }
    }
  });

  // Footer / Signatures
  const finalY = doc.lastAutoTable.finalY + 30;
  
  if (metadata.signature) {
    try {
        doc.addImage(metadata.signature, 'PNG', 35, finalY - 20, 45, 18);
    } catch (e) {
        console.error('Error adding signature to PDF', e);
    }
  }

  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('__________________________', 40, finalY);
  doc.setFont('helvetica', 'bold');
  doc.text(metadata.evaluator || 'Inspector ANAC / CEAC', 40, finalY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Firma Autorizada', 40, finalY + 10);
  
  doc.setFontSize(10);
  doc.text('__________________________', 130, finalY);
  doc.setFont('helvetica', 'bold');
  doc.text('Responsable Técnico 6XSIM', 130, finalY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Ingeniería de Sistemas FSTD', 130, finalY + 10);

  // Save
  doc.save(`QTG_Report_R44_${new Date().toISOString().split('T')[0]}.pdf`);
};
