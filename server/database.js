// creating dummy database
const incidentsData = [
  {
    id: 1,
    type: 'Redflag',
    createdOn: '11/03/2018',
    createdBy: 'thierno souleymane Diallo',
    location: '23, Ikorodu Road, Lagos',
    status: '',
    images: ['image1', 'image2'],
    videos: ['video1', 'video2'],
    title: 'police bribery',
    comment: 'They are asking me 3 bucks',
  },
  {
    id: 2,
    type: 'Redflag',
    createdOn: '11/10/2018',
    createdBy: 'Mickel Moore',
    location: '23, Itoko Road, Lagos',
    status: '',
    images: ['image3', 'image4'],
    videos: ['video3', 'video4'],
    title: 'Corrupted Judge',
    comment: '',
  },
  {
    id: 3,
    type: 'Intervention',
    createdOn: '11/10/2018',
    createdBy: 'Esso Awoko',
    location: '23, Itoko Road, Lagos',
    status: '',
    images: ['image6', 'image8'],
    videos: ['video6', 'video10'],
    title: 'Bad road',
    comment: 'the road is so damaged that...',
  },
];

export default incidentsData;
