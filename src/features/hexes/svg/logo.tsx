import { printAllHexSVGs } from '@/utils/hex-SVG-coords-converter';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
const Logo = () => {
  const makingLogo = false // set to true to show the download button

  if (makingLogo) {printAllHexSVGs();};
  interface ExportComponentAsImageParams {
    element: HTMLElement;
    imageFileName: string;
  }
  
  const exportComponentAsImage = async (
    element: ExportComponentAsImageParams['element'],
    imageFileName: ExportComponentAsImageParams['imageFileName']
  ): Promise<void> => {
    const canvas: HTMLCanvasElement = await html2canvas(element);
    const image: string = canvas.toDataURL('image/png', 1.0); // 1.0 for maximum quality
    
    // Create a link element to trigger download
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = image;
    link.download = `${imageFileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const componentRef = useRef(null);
  
  const handleDownload = () => {
    if (componentRef.current) {
      exportComponentAsImage(componentRef.current, 'my_component_image');
    }
  };
  
  return (
    <div className="logo-wrapper" ref={makingLogo ? componentRef : null}>
      {makingLogo && <div className="fixed">
        <button onClick={handleDownload} className="download-logo-button" aria-label="Download logo as PNG image" title="Download logo as PNG image">⬇️</button>
      </div>}
      <svg xmlns="http://www.w3.org/2000/svg"
        width="160"
        height="185.6"
        viewBox="0 0 160 185.6"
        className="hex-image logo-svg"
        >
        <polygon points="80,0 160,46 160,139 80,186 0,139 0,46" className="outer-hex" />
        <polygon points="80,23 140,58 140,128 80,162 20,128 20,58" className="middle-hex" />
        <polygon points="80,46 120,70 120,116 80,139 40,116 40,70" className="inner-hex" />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="logo-text title">CF</text>
      </svg>
      </div>
  )
}

export default Logo