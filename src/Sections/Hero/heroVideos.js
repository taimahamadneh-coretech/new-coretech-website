const CLOUD = 'https://res.cloudinary.com/dslt4vswp/video/upload';

// Cloudinary public IDs (version/name, no extension)
const IDS = [
  'v1768467098/hero1_znyrrt',
  'v1768467098/hero2_tnsznf',
  'v1768467098/hero3_wbo25o',
];

const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 768px)').matches;

const width = isMobile ? 960 : 1920;

export const heroVideos = IDS.map((id) => ({
  // f_auto:video → WebM/AV1/MP4 per browser, q_auto → smart compression,
  // w_ → right size for the screen, ac_none → no audio track
  src: `${CLOUD}/f_auto:video,q_auto,w_${width},ac_none/${id}.mp4`,
  // first frame as an image, shown instantly while the video loads
  poster: `${CLOUD}/so_0,f_auto,q_auto,w_${width}/${id}.jpg`,
}));