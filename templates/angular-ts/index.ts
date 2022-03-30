import { api, data, http } from '@serverless/cloud';

http.on(404, 'index.html')

// Create GET route and return users
api.get('/api/users', async (req, res) => {
  // Get users from Serverless Data
  let result = (await data.get('user:*', true)) as any;

  // Return the results
  res.send(
    result.items.map(({ value }: { value: any }) => ({
      id: value.id,
      name: value.name,
    }))
  );
});
