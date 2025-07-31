import styled from 'styled-components';

// Define theme interface for TypeScript
interface Theme {
  colorSchema: {
    backgroundBaseLevel1: string;
    textBase: string;
    backgroundHighlightLevel4: string;
    backgroundHighlight: string;
    backgroundHighlightLevel2: string;
    backgroundHighlightLevel3: string;
  };
}

export const CalendarContainer = styled.div<{ theme: Theme }>`
  position: relative;
  width: 100%;

  .react-calendar {
    width: 100%;
    border: none;
    background: ${({ theme }) => theme.colorSchema.backgroundBaseLevel1};
    font-family: inherit;
    line-height: 1.4;
  }

  .react-calendar__tile {
    padding: 0.75rem 0.5rem;
    border-radius: 6px;
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.colorSchema.textBase};

    &:hover {
      background-color: ${({ theme }) => theme.colorSchema.backgroundHighlightLevel4};
      color: ${({ theme }) => theme.colorSchema.backgroundHighlight};
    }
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colorSchema.backgroundHighlightLevel2};
    color: ${({ theme }) => theme.colorSchema.backgroundHighlight};
    font-weight: 500;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background: ${({ theme }) => theme.colorSchema.backgroundHighlight} !important;
    color: white !important;
    font-weight: 600;
  }

  .react-calendar__tile--rangeStart {
    border-top-left-radius: 6px !important;
    border-bottom-left-radius: 6px !important;
  }

  .react-calendar__tile--rangeEnd {
    border-top-right-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
  }

  .react-calendar__tile--range {
    background: ${({ theme }) => theme.colorSchema.backgroundHighlightLevel3};
    color: white;
  }

  .react-calendar__navigation button {
    color: ${({ theme }) => theme.colorSchema.textBase};
    font-weight: 600;

    &:hover {
      background: ${({ theme }) => theme.colorSchema.backgroundHighlightLevel2};
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.4;
  }
`; 