import { createFetch } from '@vueuse/core';

const useMyFetch = createFetch({
  baseUrl: '/',
  options: {
    async beforeFetch({ url, options /* cancel */ }) {
      console.log(url, options);

      // const myToken = await getMyToken();
      // options.headers.Authorization = `Bearer ${myToken}`;

      // if (!myToken) {
      //   cancel();
      // }

      // options.headers = {
      //   ...options.headers,
      //   Authorization: `Bearer ${myToken}`,
      // };

      return { options };
    },
  },
});

const { onFetchResponse, onFetchError } = useMyFetch('api/url');

onFetchResponse((response) => {
  console.log(response.status);
});

onFetchError((error) => {
  console.error(error.message);
});
