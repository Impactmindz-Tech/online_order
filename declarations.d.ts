declare module 'aos' {
    const AOS: {
      init: (options?: { [key: string]: any }) => void;
      refresh: () => void;
    };
    export default AOS;
  }
  