import React from 'react';
// @ts-ignore
import { ReactTitle } from 'react-meta-tags';

type MetaTitleProps = {
  title: string;
};

export const MetaTitle: React.FC<MetaTitleProps> = props => {
  const { title } = props;
  const fullTitle = `${title} - Posts App`;
  return <ReactTitle title={fullTitle} />;
};
