import FullSizeHighlight from '@/components/highlight/FullSizeHighlight';
import { HighlightTypes } from '@/types/highlight';
import styled from 'styled-components';

const Highlight = ({ fullSizeData }: { fullSizeData: HighlightTypes }) => {
  console.log(fullSizeData);
  return <FullSizeHighlight fullSizeData={fullSizeData} />;
};

export default Highlight;
