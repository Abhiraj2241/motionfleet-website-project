import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-muted-foreground" />
      <div className="flex gap-1">
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="h-8 px-3"
        >
          English
        </Button>
        <Button
          variant={language === 'hi' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('hi')}
          className="h-8 px-3"
        >
          हिंदी
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
