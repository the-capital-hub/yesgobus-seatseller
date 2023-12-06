import React, { useEffect } from 'react';

export const TranslateProvider = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,kn',
          layout: window.google.translate.TranslateElement.InlineLayout.TOP_RIGHT,
        },
        'google_translate_elementt'
      );
    };
  }, []);

  return null;
};
