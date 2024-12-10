// Hook React per il download dell'immagine
import { useState, useEffect } from 'react';
import { BUCKET } from '@/constants/Database';
import { supabase } from '@/lib/supabase';

export const useDownloadImage = (path: string | null | undefined) => {
  const [imagePath, setImagePath] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!path) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase.storage
          .from(BUCKET)
          .download(path);

        if (error) {
          throw error;
        }
        if (data) {
          const fr = new FileReader();
          fr.readAsDataURL(data);
          fr.onload = () => {
            setImagePath(fr.result as string);
            setIsLoading(false);
          };
        }
      } catch (error) {
        console.error("Error downloading image:", error);
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [path]);

  return { imagePath, isLoading };
};
