// Hook React per il download dell'immagine
import { useState, useEffect } from 'react';
import { BUCKET } from '@/constants/Database';
import { supabase } from '@/lib/supabase';
import { randomUUID } from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

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

export const useUploadImage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedPath, setUploadedPath] = useState<string | null>(null);

    const uploadImage = async (imageUri: string | null) => {
        if (!imageUri || !imageUri.startsWith('file://')) {
        setError('Invalid image URI');
        return;
        }

        setIsUploading(true);
        try {
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from(BUCKET)
            .upload(filePath, decode(base64), { contentType });

        if (error) {
            throw error;
        }

        if (data) {
            setUploadedPath(data.path);
            return data.path;
        }
        } catch (err) {
        console.error('Error uploading image:', err);
        setError('Error uploading image');
        } finally {
        setIsUploading(false);
        }
    };

    return {
        uploadImage,
        isUploading,
        error,
        uploadedPath,
    };
};
