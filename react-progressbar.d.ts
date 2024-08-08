declare module 'react-progressbar' {
    import * as React from 'react';
  
    interface ProgressBarProps {
      completed: number;
      bgColor?: string;
      height?: string;
      isLabelVisible?: boolean;
    }
  
    const ProgressBar: React.FC<ProgressBarProps>;
  
    export default ProgressBar;
  }
  