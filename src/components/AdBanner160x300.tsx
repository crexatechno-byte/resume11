import React from "react";

interface AdBannerProps {
  className?: string;
  showLabel?: boolean;
}

export const AdBanner160x300: React.FC<AdBannerProps> = ({
  className = "",
  showLabel = true,
}) => {
  const adHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : 'c9f8676c5298f3fcc59c137f81230b99',
      'format' : 'iframe',
      'height' : 300,
      'width' : 160,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/c9f8676c5298f3fcc59c137f81230b99/invoke.js"></script>
</body>
</html>`;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {showLabel && (
        <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase mb-1">
          Advertisement
        </span>
      )}
      <div className="w-[160px] h-[300px] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-2xs flex items-center justify-center">
        <iframe
          title="Sponsored Advertisement"
          srcDoc={adHtml}
          width="160"
          height="300"
          className="w-[160px] h-[300px] border-0"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
        />
      </div>
    </div>
  );
};
