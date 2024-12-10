import { ActivityIndicator, Image, Text } from 'react-native';
import React, { ComponentProps} from 'react';
import { useDownloadImage } from '@/app/api/bucket';

type RemoteImageProps = {
  path?: string | null;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const { imagePath, isLoading } = useDownloadImage(path ?? fallback);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Image source={{ uri: imagePath || fallback }} {...imageProps} />
  );
};

export default RemoteImage;