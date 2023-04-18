import { createHash } from 'crypto';
import fetch from 'node-fetch';

const apiKey = '5bca88bca6c74941af1a74c459833c52';
const enterpriseNumber = '0203201340';
const requestId = '4b8e79a0-bd54-11eb-8529-0242ac130003';

const apiEndpoint = `https://ws.cbso.nbb.be/authentic/legalEntity/${enterpriseNumber}/references`;

const fetchOptions = {
  method: 'GET',
  headers: {
    'NBB-CBSO-Subscription-Key': apiKey,
    'X-Request-Id': requestId,
    'Accept': 'application/json', 
  },
  timeout: 120, 
};

fetch(apiEndpoint, fetchOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error(error));

function generateUUID() {
  const hash = createHash('sha256');
  hash.update(Math.random().toString());
  const uuid = hash.digest('hex');
  return uuid;
}

export{}