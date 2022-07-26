import { api, data } from "@serverless/cloud";

afterAll(async () => {
  await data.remove("users:tester");
  await data.remove("users:user");
});

describe('authentication', () => {
  let userToken;
  test('/signup - should create user and receive proper data', async () => {
    const { body, status } = await api.post("/signup").invoke(
      { password: '12345678', username: 'user' }
    );

    userToken = body.token;

    expect(status).toBe(200);
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('username');
    expect(body).not.toHaveProperty('hash');
    expect(body).not.toHaveProperty('password');
  })

  test('/removeMe - should remove user', async () => {
    const res = await api.post('/removeMe').invoke({}, {
      headers: { 'Authorization': userToken }
    });

    expect(res.status).toBe(200);
    expect(res.body).toBe('Good bye!');
  })

  test.each([
    { password: '', username: '', status1: 400, status2: 401 },
    { password: '12345678', username: '', status1: 400, status2: 401 },
    { password: '1234567', username: 'weak', status1: 400, status2: 401 },
    { password: '12345678', username: 'tester', status1: 200, status2: 200 },
  ])('should be right statuses for signup, login, me', async ({
    password, username, status1, status2
  }) => {
    let res = await api.post("/signup").invoke({
      password, username
    });

    expect(res.status).toBe(status1);

    res = await api.post("/login").invoke({
      password, username
    });

    expect(res.status).toBe(status1);

    res = await api.get("/me").invoke({}, {
      headers: { ...res.body?.token && { Authorization: res.body.token } }
    });

    expect(res.status).toBe(status2);
  })
})
