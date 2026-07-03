import type { JobStatus } from '../types';

export const getStatusColor = (status: JobStatus) => {
  let boxStyle: string = 'black';
  let fontStyle: string = 'white';

  switch (status) {
    case 'Open':
      fontStyle = '#f0fdf4';
      boxStyle = '#0F612D';
      return { boxStyle, fontStyle };
    case 'Closed':
      fontStyle = '#fef2f2';
      boxStyle = '#b91c1c';
      return { boxStyle, fontStyle };
    case 'Draft':
      fontStyle = '#eff6ff';
      boxStyle = '#1d4ed8';
      return { boxStyle, fontStyle };
    default:
      return { boxStyle, fontStyle };
  }
};

export const formatJobType = (type: string) => {
  if (type === 'Full_time') return 'Full-time';
  if (type === 'Part_time') return 'Part-time';
  return type;
};

export async function delayForDemo<T>(promise: Promise<T>): Promise<T> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
