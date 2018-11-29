// creating dummy database
const incidentsData = [
  {
    id: 1,
    type: 'Redflag',
    createdOn: '11/03/2018',
    createdBy: 1,
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
    createdBy: 2,
    location: '46, Itoko Road, Lagos',
    status: '',
    images: ['image3', 'image4'],
    videos: ['video3', 'video4'],
    title: 'Corrupted Judge',
    comment: '',
  },
  {
    id: 3,
    type: 'Intervention',
    createdOn: '10/24/2018',
    createdBy: 1,
    location: '23, Samuel Lewis Road, Lagos',
    status: '',
    images: ['image6', 'image8'],
    videos: ['video6', 'video10'],
    title: 'Bad road',
    comment: 'the road is so damaged that...',
  },
];

const usersData = [
  {
    id: 1,
    firstName: 'Thierno Souleymane',
    lastName: 'Diallo',
    otherName: '',
    email: 'souleymane@gmail.com',
    password: 'password',
    phoneNumber: '2269873612',
    userName: 'thierno',
    registered: '12/18/2018',
    isAdmin: true
  },
  {
    id: 2,
    firstName: 'Nkwanko',
    lastName: 'Kanu',
    otherName: '',
    email: 'kwanko@gmail.com',
    password: 'pkwanko',
    phoneNumber: '2269873612',
    userName: 'nkwanko',
    registered: '11/15/2018',
    isAdmin: false
  },
  {
    id: 3,
    firstName: 'Mary ',
    lastName: 'Umo',
    otherName: 'Amad',
    email: 'mary@gmail.com',
    password: 'psmary',
    phoneNumber: '2349873612',
    userName: 'mary',
    registered: '10/18/2018',
    isAdmin: false
  }
];

export { incidentsData, usersData };
