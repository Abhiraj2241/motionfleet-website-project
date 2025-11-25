import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Hero Section
    'hero.title': 'Drive & Earn with MotionFleet',
    'hero.subtitle': 'Turn your auto or rickshaw into a moving billboard and earn extra income without changing your routine',
    
    // Benefits Section
    'benefits.title': 'Why Join MotionFleet?',
    'benefits.subtitle': 'Partnership benefits designed with drivers in mind',
    'benefit.income.title': 'Extra Income',
    'benefit.income.desc': 'Earn ₹3,000 - ₹8,000 per month just by driving your regular routes',
    'benefit.flexible.title': 'Flexible Commitment',
    'benefit.flexible.desc': 'No change to your schedule or routes. Drive as you normally would',
    'benefit.installation.title': 'Free Installation',
    'benefit.installation.desc': 'Professional installation and removal at no cost to you',
    'benefit.support.title': 'Dedicated Support',
    'benefit.support.desc': '24/7 support team ready to help with any questions or concerns',
    'benefit.vehicle.title': 'No Vehicle Damage',
    'benefit.vehicle.desc': "Premium materials that protect your vehicle's original paint",
    'benefit.payment.title': 'Regular Payments',
    'benefit.payment.desc': 'On-time monthly payments directly to your bank account',
    
    // How It Works
    'process.title': 'Simple 4-Step Process',
    'process.subtitle': 'From signup to earning in less than a week',
    'process.step1.title': 'Sign Up',
    'process.step1.desc': 'Fill out the simple application form with your details and vehicle information',
    'process.step2.title': 'Verification',
    'process.step2.desc': 'Our team verifies your documents and vehicle condition (takes 1-2 days)',
    'process.step3.title': 'Installation',
    'process.step3.desc': 'Professional installation of ads at your convenience (30-45 minutes)',
    'process.step4.title': 'Start Earning',
    'process.step4.desc': 'Drive normally and receive monthly payments directly to your account',
    
    // Requirements
    'requirements.title': 'Basic Requirements',
    'req1': 'Valid driving license and vehicle registration',
    'req2': 'Auto-rickshaw or E-rickshaw in good condition',
    'req3': 'Active in Mumbai, Delhi, Bangalore, or Pune (expanding to more cities)',
    'req4': 'Willing to maintain ad quality and report any damage',
    'req5': 'Drive at least 6 hours daily on regular routes',
    
    // Form
    'form.title': 'Join Our Fleet Today',
    'form.subtitle': 'Fill out the form below and our team will contact you within 24 hours',
    'form.name': 'Full Name',
    'form.name.placeholder': 'Enter your full name',
    'form.email': 'Email',
    'form.email.placeholder': 'your.email@example.com',
    'form.phone': 'Phone Number',
    'form.phone.placeholder': '+91 98765 43210',
    'form.city': 'City',
    'form.city.placeholder': 'Mumbai, Delhi, Bangalore, etc.',
    'form.vehicle.type': 'Vehicle Type',
    'form.vehicle.type.placeholder': 'Auto-rickshaw / E-rickshaw',
    'form.vehicle.model': 'Vehicle Model',
    'form.vehicle.model.placeholder': 'e.g., Bajaj RE',
    'form.vehicle.year': 'Vehicle Year',
    'form.vehicle.year.placeholder': 'e.g., 2020',
    'form.license': 'Driving License Number',
    'form.license.placeholder': 'Enter your license number',
    'form.license.photo': "Driver's License Photo",
    'form.license.photo.hint': "Upload a clear photo of your driver's license (max 5MB)",
    'form.registration.photo': 'Vehicle Registration Photo',
    'form.registration.photo.hint': 'Upload a clear photo of your vehicle registration (max 5MB)',
    'form.additional': 'Additional Information',
    'form.additional.placeholder': 'Tell us about your daily routes, operating hours, etc.',
    'form.submit': 'Submit Application',
    'form.submitting': 'Submitting...',
    'form.disclaimer': 'By submitting, you agree to our terms and conditions. We respect your privacy and will never share your information.',
    'form.success.title': 'Application Received!',
    'form.success.desc': 'Thank you for your interest. Our team will contact you within 24 hours.',
    'form.error.title': 'Submission Failed',
    'form.error.desc': 'There was an error submitting your application. Please try again.',
    
    // Testimonials
    'testimonials.title': 'What Our Driver Partners Say',
    'testimonial1.quote': 'Extra ₹6,000 every month without any extra work. Best decision I made this year!',
    'testimonial1.name': 'Ramesh Yadav',
    'testimonial1.location': 'Mumbai',
    'testimonial2.quote': 'The team is very professional. Installation was quick and payments are always on time.',
    'testimonial2.name': 'Suresh Kumar',
    'testimonial2.location': 'Delhi',
    'testimonial3.quote': 'I was worried about my vehicle\'s paint, but they use quality materials. Highly recommend!',
    'testimonial3.name': 'Prakash Singh',
    'testimonial3.location': 'Bangalore',
  },
  hi: {
    // Hero Section
    'hero.title': 'MotionFleet के साथ ड्राइव करें और कमाएं',
    'hero.subtitle': 'अपने ऑटो या रिक्शा को चलते-फिरते विज्ञापन बोर्ड में बदलें और बिना अपनी दिनचर्या बदले अतिरिक्त आय अर्जित करें',
    
    // Benefits Section
    'benefits.title': 'MotionFleet में क्यों शामिल हों?',
    'benefits.subtitle': 'ड्राइवरों को ध्यान में रखकर डिज़ाइन किए गए साझेदारी लाभ',
    'benefit.income.title': 'अतिरिक्त आय',
    'benefit.income.desc': 'अपने नियमित मार्गों पर ड्राइव करके हर महीने ₹3,000 - ₹8,000 कमाएं',
    'benefit.flexible.title': 'लचीली प्रतिबद्धता',
    'benefit.flexible.desc': 'आपके शेड्यूल या मार्गों में कोई बदलाव नहीं। जैसे सामान्य रूप से ड्राइव करते हैं वैसे ही करें',
    'benefit.installation.title': 'मुफ्त इंस्टालेशन',
    'benefit.installation.desc': 'आपके लिए बिना किसी लागत के पेशेवर इंस्टालेशन और हटाना',
    'benefit.support.title': 'समर्पित सहायता',
    'benefit.support.desc': '24/7 सहायता टीम किसी भी प्रश्न या चिंता में मदद के लिए तैयार',
    'benefit.vehicle.title': 'वाहन को कोई नुकसान नहीं',
    'benefit.vehicle.desc': 'प्रीमियम सामग्री जो आपके वाहन के मूल पेंट की रक्षा करती है',
    'benefit.payment.title': 'नियमित भुगतान',
    'benefit.payment.desc': 'समय पर मासिक भुगतान सीधे आपके बैंक खाते में',
    
    // How It Works
    'process.title': 'सरल 4-चरण प्रक्रिया',
    'process.subtitle': 'साइनअप से लेकर एक सप्ताह से भी कम समय में कमाई तक',
    'process.step1.title': 'साइन अप करें',
    'process.step1.desc': 'अपने विवरण और वाहन की जानकारी के साथ सरल आवेदन फॉर्म भरें',
    'process.step2.title': 'सत्यापन',
    'process.step2.desc': 'हमारी टीम आपके दस्तावेजों और वाहन की स्थिति को सत्यापित करती है (1-2 दिन लगते हैं)',
    'process.step3.title': 'इंस्टालेशन',
    'process.step3.desc': 'आपकी सुविधानुसार विज्ञापनों की पेशेवर इंस्टालेशन (30-45 मिनट)',
    'process.step4.title': 'कमाई शुरू करें',
    'process.step4.desc': 'सामान्य रूप से ड्राइव करें और मासिक भुगतान सीधे अपने खाते में प्राप्त करें',
    
    // Requirements
    'requirements.title': 'बुनियादी आवश्यकताएं',
    'req1': 'वैध ड्राइविंग लाइसेंस और वाहन पंजीकरण',
    'req2': 'अच्छी स्थिति में ऑटो-रिक्शा या ई-रिक्शा',
    'req3': 'मुंबई, दिल्ली, बैंगलोर, या पुणे में सक्रिय (अधिक शहरों में विस्तार हो रहा है)',
    'req4': 'विज्ञापन की गुणवत्ता बनाए रखने और किसी भी क्षति की रिपोर्ट करने के लिए तैयार',
    'req5': 'नियमित मार्गों पर प्रतिदिन कम से कम 6 घंटे ड्राइव करें',
    
    // Form
    'form.title': 'आज ही हमारे फ्लीट में शामिल हों',
    'form.subtitle': 'नीचे दिया गया फॉर्म भरें और हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी',
    'form.name': 'पूरा नाम',
    'form.name.placeholder': 'अपना पूरा नाम दर्ज करें',
    'form.email': 'ईमेल',
    'form.email.placeholder': 'your.email@example.com',
    'form.phone': 'फोन नंबर',
    'form.phone.placeholder': '+91 98765 43210',
    'form.city': 'शहर',
    'form.city.placeholder': 'मुंबई, दिल्ली, बैंगलोर, आदि',
    'form.vehicle.type': 'वाहन का प्रकार',
    'form.vehicle.type.placeholder': 'ऑटो-रिक्शा / ई-रिक्शा',
    'form.vehicle.model': 'वाहन मॉडल',
    'form.vehicle.model.placeholder': 'उदा., बजाज RE',
    'form.vehicle.year': 'वाहन वर्ष',
    'form.vehicle.year.placeholder': 'उदा., 2020',
    'form.license': 'ड्राइविंग लाइसेंस नंबर',
    'form.license.placeholder': 'अपना लाइसेंस नंबर दर्ज करें',
    'form.license.photo': 'ड्राइविंग लाइसेंस की फोटो',
    'form.license.photo.hint': 'अपने ड्राइविंग लाइसेंस की स्पष्ट फोटो अपलोड करें (अधिकतम 5MB)',
    'form.registration.photo': 'वाहन पंजीकरण की फोटो',
    'form.registration.photo.hint': 'अपने वाहन पंजीकरण की स्पष्ट फोटो अपलोड करें (अधिकतम 5MB)',
    'form.additional': 'अतिरिक्त जानकारी',
    'form.additional.placeholder': 'हमें अपने दैनिक मार्गों, संचालन के घंटों आदि के बारे में बताएं',
    'form.submit': 'आवेदन जमा करें',
    'form.submitting': 'जमा किया जा रहा है...',
    'form.disclaimer': 'जमा करके, आप हमारे नियम और शर्तों से सहमत हैं। हम आपकी गोपनीयता का सम्मान करते हैं और कभी भी आपकी जानकारी साझा नहीं करेंगे।',
    'form.success.title': 'आवेदन प्राप्त हुआ!',
    'form.success.desc': 'आपकी रुचि के लिए धन्यवाद। हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।',
    'form.error.title': 'सबमिशन विफल',
    'form.error.desc': 'आपका आवेदन जमा करने में एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
    
    // Testimonials
    'testimonials.title': 'हमारे ड्राइवर साथी क्या कहते हैं',
    'testimonial1.quote': 'बिना किसी अतिरिक्त काम के हर महीने अतिरिक्त ₹6,000। इस साल मेरा सबसे अच्छा निर्णय!',
    'testimonial1.name': 'रमेश यादव',
    'testimonial1.location': 'मुंबई',
    'testimonial2.quote': 'टीम बहुत पेशेवर है। इंस्टालेशन त्वरित था और भुगतान हमेशा समय पर होता है।',
    'testimonial2.name': 'सुरेश कुमार',
    'testimonial2.location': 'दिल्ली',
    'testimonial3.quote': 'मुझे अपनी गाड़ी के पेंट की चिंता थी, लेकिन वे गुणवत्ता सामग्री का उपयोग करते हैं। अत्यधिक अनुशंसित!',
    'testimonial3.name': 'प्रकाश सिंह',
    'testimonial3.location': 'बैंगलोर',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'hi' ? 'hi' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
