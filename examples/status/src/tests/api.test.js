'use strict';

const { api, params } = require('@serverless/cloud'); // eslint-disable-line

test('Service CRUD', async () => {
  const service = {
    serviceStatus: 'Operational',
    serviceName: 'Serverless Framework Dashboard',
    serviceDescription: 'This is the Serverless Framework Dashboard',
  };
  const { body: createdService } = await api
    .put(`/services?adminPassword=${params.ADMIN_PASSWORD}`)
    .invoke(service);

  expect(createdService.serviceStatus).toEqual(service.serviceStatus);
  expect(createdService.serviceName).toEqual(service.serviceName);
  expect(createdService.serviceDescription).toEqual(service.serviceDescription);
  expect(createdService.serviceId).toBeDefined();
  expect(createdService.serviceCreatedAt).toBeDefined();
  expect(createdService.serviceUpdatedAt).toBeDefined();

  await api
    .delete(`/services/${createdService.serviceId}?adminPassword=${params.ADMIN_PASSWORD}`)
    .invoke();
});
