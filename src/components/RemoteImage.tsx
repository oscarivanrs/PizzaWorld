import { Image } from 'react-native';
import React, { ComponentProps, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BUCKET } from '@/constants/Database';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    console.log("Path is " + path)
    if (!path) return;
    (async () => {
      setImage('');
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .download(path);

      if (error) {
        console.log(error);
      }
      console.log("DATA IS ")
      console.log(data)
      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path]);

  if (!image) {
  }

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;