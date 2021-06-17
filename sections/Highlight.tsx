import FullSizeHighlight from '@/components/highlight/FullSizeHighlight';
import MediumSizeHighlight from '@/components/highlight/MediumSizeHighlight';
import SmallSizeHighlight from '@/components/highlight/SmallSizeHighlight';
import { HighlightNoTextTypes, HighlightTypes } from '@/types/highlight';
import styled from 'styled-components';

const Highlight = ({
  fullSizeData,
  mediumSizeHighlight,
  smallSizeHighlight,
}: {
  fullSizeData: HighlightTypes;
  mediumSizeHighlight: HighlightNoTextTypes;
  smallSizeHighlight: HighlightNoTextTypes;
}) => {
  return (
    <>
      <FullSizeHighlight fullSizeData={fullSizeData} />
      <MediumSizeHighlight mediumSizeHighlight={mediumSizeHighlight} />
      <SmallSizeHighlight smallSizeHighlight={smallSizeHighlight} />
    </>
  );
};

export default Highlight;
