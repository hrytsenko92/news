import axios from 'axios';

type RequestType = string;

export const apiLoader = async (request: RequestType) => {
    try {
      const { data, status } = await axios.get(
        request,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log('response status is: ', status); // delete
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
