/* eslint-disable import/no-unresolved */
import { sleep, check } from 'k6';
import http from 'k6/http';

const getRandomNum = () => Math.floor(Math.random() * 10000000 + 1);

export const options = {
  stages: [
    { duration: '10s', target: 1500 },
    { duration: '45s', target: 1500 },
    { duration: '10s', target: 0 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
      },
    },
  },
};

export default function main() {
  let response;

  // eslint-disable-next-line prefer-const
  response = http.get(`http://localhost:3000/${getRandomNum}`);
  check(response, {
    // eslint-disable-next-line no-shadow
    'status equals 200': (response) => response.status.toString() === '200',
  });

  sleep(1);
}
